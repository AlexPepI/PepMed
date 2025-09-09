from app import models
from fastapi import HTTPException,status
from sqlalchemy.orm import Session
from typing import List

def get_diseases_by_ids(db: Session, ids: List[int]):
    return db.query(models.Disease).filter(models.Disease.id.in_(ids)).all()

def get_all_diseases(db: Session) -> models.Disease:
    return db.query(models.Disease).order_by(models.Disease.id.desc()).all()

def create_new_disease(db: Session,name:str):
    new_disease = models.Disease(
        name = name
    )
    db.add(new_disease)
    db.commit()
    db.refresh(new_disease)
    return new_disease

def delete_disease_by_id(db: Session,id:int):
    deleted_disease = db.query(models.Disease).filter(models.Disease.id == id)
    if deleted_disease.first() == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Disease with id: {id}, does not exist"
        )
    deleted_disease.delete(synchronize_session=False)
    db.commit()