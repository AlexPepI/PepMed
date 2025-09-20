from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session
from app.database import get_db
from schemas.visit import VisitCreate,VisitResponse
from services.visit import create_visit,update_visit,RelatedObjectNotFound,VisitNotFound
from schemas.symptom import SymptomId
from schemas.medicine import MedicineId
from crud.visit import get_details_for_visit_id
import os
from app import models

router = APIRouter(
    prefix="/visit",
    tags=["Client's Visit"]
)
MEDIA_ROOT = os.getenv("MEDIA_ROOT", "media")

@router.get("/{visit_id}",response_model=VisitResponse)
def get_details_for_specific_visit(visit_id = int, db:Session = Depends(get_db) ):
    return get_details_for_visit_id(visit_id,db)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=VisitResponse)
def create_new_visit_for_visitor(
    visitor_id: int,
    new_visit: VisitCreate,
    symptoms: list[SymptomId],
    medicines: list[MedicineId],
    db: Session = Depends(get_db)
):
    try:
        visit = create_visit(db, visitor_id, new_visit, symptoms, medicines)

        from services.pdf_service import generate_pdf_for_visit
        pdf_bytes, pdf_name = generate_pdf_for_visit(db, visit.id)

        visit_folder = os.path.join(MEDIA_ROOT, f"visits/{visit.id}")
        os.makedirs(visit_folder, exist_ok=True)
        pdf_path = os.path.join(visit_folder, pdf_name)

        with open(pdf_path, "wb") as f:
            f.write(pdf_bytes)

        vf = models.VisitFile(
            visit_id=visit.id,
            storage_key=f"visits/{visit.id}/{pdf_name}",
            original_name=pdf_name
        )
        db.add(vf)
        db.commit()

        return visit
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    
@router.put('/{id}',response_model=VisitResponse)
def update_visit_data(id:int,visit:VisitCreate,symptoms:list[SymptomId],medicines:list[MedicineId],db:Session = Depends(get_db)):
    try:
        symptoms_ids = [d.id for d in symptoms] if symptoms is not None else None
        medicines_ids = [d.id for d in medicines] if medicines is not None else None
        updated = update_visit(db,id,visit,symptoms_ids,medicines_ids)
        return updated
    except VisitNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Visit not found")
    except RelatedObjectNotFound as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    
