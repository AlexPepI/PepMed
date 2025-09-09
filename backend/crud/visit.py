from app import models
from fastapi import HTTPException,status
from sqlalchemy.orm import Session

def create_db_visit(db: Session, visit_in) -> models.Visit:
    visit = models.Visit(**visit_in.model_dump())
    db.add(visit)
    return visit



def get_details_for_visit_id(id,db:Session) :
    visit = db.query(models.Visit).filter(models.Visit.id == id).first()
    if not visit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Visitor with id: {id}, was not found!"
        )
    files = [
        f
        for f in db.query(models.VisitFile).filter(models.VisitFile.visit_id == id).all()
    ]    
    setattr(visit, "files", files)

    return visit
    
