from app import models
from fastapi import HTTPException,status
from sqlalchemy.orm import Session,selectinload


def check_if_visitor_exists(db:Session,id:int) -> models.Visitor:
    visitor = db.query(models.Visitor).filter(models.Visitor.id == id).first()
    if not visitor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Visitor with id: {id}, was not found!"
        )
    return visitor

def create_db_visitor(db: Session, visitor_in) -> models.Visitor:
    visitor = models.Visitor(**visitor_in.model_dump())
    db.add(visitor)
    return visitor

def get_visitor_by_id(db: Session,id:int) -> models.Visitor:
    visitor = db.query(models.Visitor).options(
        selectinload(models.Visitor.medicines_links).
        selectinload(models.VisitorMedicineLink.medicine),
        selectinload(models.Visitor.diseases),
        selectinload(models.Visitor.visits)
    ).filter(models.Visitor.id == id).first()
    if not visitor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Visitor with id: {id}, was not found!"
        )
    return visitor