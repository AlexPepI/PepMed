from fastapi import APIRouter,HTTPException,status, UploadFile, File, Depends
from fastapi.responses import FileResponse
from typing import Optional
from sqlalchemy.orm import Session
import os
from uuid import uuid4
from app.database import get_db
from app import models
from fastapi.responses import Response
from services.pdf_service import generate_pdf, NotFoundError, PdfRenderError

router = APIRouter(
    prefix="/files",
    tags=["Visit's Files"]
)

MEDIA_ROOT = os.getenv("MEDIA_ROOT", "media")
@router.get("/html-to-pdf", response_class=Response)
def html_to_pdf() -> Response:
    try:
        pdf_bytes, pdf_name = generate_pdf()  # no input
    except NotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except PdfRenderError as e:
        raise HTTPException(status_code=400, detail=str(e))

    headers = {
        "Content-Disposition": f'attachment; filename="{pdf_name}"',
        "Cache-Control": "no-store",
    }
    return Response(content=pdf_bytes, media_type="application/pdf", headers=headers)

@router.post("/",status_code=status.HTTP_201_CREATED)
async def add_files_to_visit(
    visit_id:int,
    db:Session = Depends(get_db),
    files: Optional[list[UploadFile]] = File(None)
):
    try:
        if(files):
            saved = []

            for f in files:
                ext = os.path.splitext(f.filename)[1]
                key = f"visits/{visit_id}/{uuid4().hex}{ext}"
                abs_path = os.path.join(MEDIA_ROOT, key)
                os.makedirs(os.path.dirname(abs_path), exist_ok=True)
                contents = await f.read()  
                with open(abs_path, "wb") as out:
                    out.write(contents)
                saved.append(key)
                vf = models.VisitFile(
                    visit_id=visit_id,
                    storage_key=key,
                    original_name=f.filename
                )
                db.add(vf)
            db.commit()
            return {"saved_paths": saved}    

    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))

@router.get("/{file_id}")
def get_file(file_id: int, db: Session = Depends(get_db)):
    vf = db.query(models.VisitFile).get(file_id)
    if not vf:
        raise HTTPException(404, "File not found")

    abs_path = os.path.join(MEDIA_ROOT, vf.storage_key)
    if not os.path.isfile(abs_path):
        raise HTTPException(404, "File missing on disk")
    
    return FileResponse(
        abs_path,
        media_type="application/pdf",
        filename=vf.original_name,   
    )

@router.delete("/{file_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_file(file_id:int,db:Session = Depends(get_db)):
    vf = db.query(models.VisitFile).filter(models.VisitFile.id == file_id).first()
    if not vf:
        raise HTTPException(status_code=404, detail="File not found")

    abs_path = os.path.normpath(os.path.join(MEDIA_ROOT, vf.storage_key))
    try:
        if os.path.exists(abs_path):
            os.remove(abs_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete file from disk: {e}")
    db.delete(vf)
    db.commit() 