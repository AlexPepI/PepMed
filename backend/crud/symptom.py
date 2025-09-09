from fastapi import HTTPException,status
from sqlalchemy.orm import Session
from app import models

def get_symptoms_by_ids(db: Session, ids: list[int]) -> list[models.Symptom]:
    return db.query(models.Symptom).filter(models.Symptom.id.in_(ids)).all()

def get_all_symptoms(db: Session) -> models.Symptom:
    return db.query(models.Symptom).order_by(models.Symptom.id.desc()).all()

def create_new_symptom(db: Session,name:str):
    new_symptom = models.Symptom(
        name = name
    )
    db.add(new_symptom)
    db.commit()
    db.refresh(new_symptom)
    return new_symptom

def delete_symptom_by_id(db: Session,id:int):
    deleted_symptom = db.query(models.Symptom).filter(models.Symptom.id == id)
    if deleted_symptom.first() == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Symptom with id: {id}, does not exist."
        )
    deleted_symptom.delete(synchronize_session=False)
    db.commit()