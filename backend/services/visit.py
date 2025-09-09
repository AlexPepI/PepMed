from app import models
from sqlalchemy.orm import Session
from crud.visit import create_db_visit
from crud.symptom import get_symptoms_by_ids
from crud.medicine import get_medicines_by_ids
from crud.visitor import check_if_visitor_exists
from schemas.visit import *
from schemas.medicine import MedicineUsage

def create_visit(
    db: Session,
    id,
    visit_in,
    symptom_list,
    medicine_list        
):
    
    visitor = check_if_visitor_exists(db,id)
    visit = create_db_visit(db,visit_in)
    visit.visitor = visitor

    if symptom_list:
        ids = [d.id for d in symptom_list]
        symptoms = get_symptoms_by_ids(db, ids)
        if len(symptoms) != len(set(ids)):
            raise ValueError("One or more symptom IDs not found")
        visit.symptoms = symptoms

    if medicine_list:
        ids = [m.id for m in medicine_list]
        meds = get_medicines_by_ids(db, ids)
        if len(meds) != len(set(ids)):
            raise ValueError("One or more medicine IDs not found")
        visit.medicines = meds
    
    db.commit()
    db.refresh(visit)
    return visit

class VisitNotFound(Exception):
    pass

class RelatedObjectNotFound(Exception):
    pass

def _update_core_fields(visit: models.Visit, visit_in: VisitCreate):
    for field, value in visit_in.model_dump().items():
        setattr(visit, field, value)

def _update_symptoms(visit: models.Visit, symptoms_ids: list[int] | None, db: Session):
    if symptoms_ids is None:
        return  
    if symptoms_ids:
        symptoms_objs = get_symptoms_by_ids(db, symptoms_ids)
        if len(symptoms_objs) != len(set(symptoms_ids)):
            raise RelatedObjectNotFound("One or more symptom IDs not found")
        visit.symptoms = symptoms_objs
    else:
        visit.symptoms = []

def _update_medicines(visit: models.Visit, medicines_ids: list[int] | None, db: Session):
    if medicines_ids is None:
        return  
    if medicines_ids:
        medicines_objs = get_medicines_by_ids(db, medicines_ids)
        if len(medicines_objs) != len(set(medicines_ids)):
            raise RelatedObjectNotFound("One or more medicine IDs not found")
        visit.medicines = medicines_objs
    else:
        visit.medicines = []

def update_visit(
    db: Session,
    visit_id: int,
    visit_in: VisitCreate,
    disease_ids: list[int] | None = None,
    medicine_usages: list[MedicineUsage] | None = None,
) -> models.Visitor:
    visitor = db.get(models.Visit, visit_id)
    if not visitor:
        raise VisitNotFound(f"Visitor with id={visit_id} not found")

    _update_core_fields(visitor, visit_in)
    _update_symptoms(visitor, disease_ids, db)
    _update_medicines(visitor, medicine_usages, db)

    db.commit()
    db.refresh(visitor)
    return visitor