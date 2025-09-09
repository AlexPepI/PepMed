from fastapi import HTTPException,status
from sqlalchemy.orm import Session
from app import models


def get_medicines_by_ids(db: Session, ids: list[int]) -> list[models.Medicine]:
    return db.query(models.Medicine).filter(models.Medicine.id.in_(ids)).all()

def get_all_medicines(db: Session) -> models.Medicine:
    return db.query(models.Medicine).order_by(models.Medicine.id.desc()).all()

def create_new_medicine(db: Session,name:str):
    new_medicine = models.Medicine(
        name = name
    )
    db.add(new_medicine)
    db.commit()
    db.refresh(new_medicine)
    return new_medicine

def delete_medicine_by_id(db: Session,id:int):
    deleted_medicine = db.query(models.Medicine).filter(models.Medicine.id == id)
    if deleted_medicine.first() == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Medicine with id: {id}, does not exist"
        )
    deleted_medicine.delete(synchronize_session=False)
    db.commit()