from sqlalchemy.orm import Session
from sqlalchemy import or_
from crud.visitor import create_db_visitor
from crud.disease import get_diseases_by_ids
from crud.medicine import get_medicines_by_ids
from app import models
from schemas.medicine import MedicineUsage
from schemas.visitor import VisitorCreate

def create_visitor(
    db: Session,
    visitor_in,
    disease_list,
    medicine_usages,
) -> models.Visitor:

    visitor = create_db_visitor(db, visitor_in)

    if disease_list:
        ids = [d.id for d in disease_list]
        diseases = get_diseases_by_ids(db, ids)
        if len(diseases) != len(set(ids)):
            raise ValueError("One or more disease IDs not found")
        visitor.diseases = diseases

    if medicine_usages:
        med_ids = [m.id for m in medicine_usages]
        meds = get_medicines_by_ids(db, med_ids)
        if len(meds) != len(set(med_ids)):
            raise ValueError("One or more medicine IDs not found")
        for usage in medicine_usages:
            visitor.medicines_links.append(
                models.VisitorMedicineLink(medicine_id=usage.id, until=usage.until)
            )

    db.commit()
    db.refresh(visitor)
    return visitor

class VisitorNotFound(Exception):
    pass

class RelatedObjectNotFound(Exception):
    pass

def _update_core_fields(visitor: models.Visitor, visitor_in: VisitorCreate):
    for field, value in visitor_in.model_dump().items():
        setattr(visitor, field, value)

def _update_diseases(visitor: models.Visitor, disease_ids: list[int] | None, db: Session):
    if disease_ids is None:
        return  # leave as-is
    if disease_ids:
        disease_objs = get_diseases_by_ids(db, disease_ids)
        if len(disease_objs) != len(set(disease_ids)):
            raise RelatedObjectNotFound("One or more disease IDs not found")
        visitor.diseases = disease_objs
    else:
        visitor.diseases = []

def _update_medicine_links(visitor: models.Visitor, medicine_usages: list[MedicineUsage] | None, db: Session):
    from app.models import VisitorMedicineLink  # avoid circular at top

    if medicine_usages is None:
        return  # leave existing links
    # reset
    visitor.medicines_links.clear()

    if not medicine_usages:
        return  # explicitly cleared

    med_ids = [m.id for m in medicine_usages]
    med_objs = get_medicines_by_ids(db, med_ids)
    if len(med_objs) != len(set(med_ids)):
        raise RelatedObjectNotFound("One or more medicine IDs not found")

    for usage in medicine_usages:
        link = VisitorMedicineLink(medicine_id=usage.id, until=usage.until)
        visitor.medicines_links.append(link)

def update_visitor(
    db: Session,
    visitor_id: int,
    visitor_in: VisitorCreate,
    disease_ids: list[int] | None = None,
    medicine_usages: list[MedicineUsage] | None = None,
) -> models.Visitor:
    visitor = db.get(models.Visitor, visitor_id)
    if not visitor:
        raise VisitorNotFound(f"Visitor with id={visitor_id} not found")

    _update_core_fields(visitor, visitor_in)
    _update_diseases(visitor, disease_ids, db)
    _update_medicine_links(visitor, medicine_usages, db)

    db.commit()
    db.refresh(visitor)
    return visitor

def paginated_fetch(
    db: Session,
    limit:int,
    cursor:int
):
    q = db.query(models.Visitor).order_by(models.Visitor.id)
    if cursor is not None:
        q = q.filter(models.Visitor.id>cursor)
    items = q.limit(limit+1).all()
    has_more = len(items)>limit
    page = items[:limit]
    next_cursor = page[-1].id if has_more else None
    return{
        "visitors" : [
            {
                "id":v.id,
                "name":v.name,
                "surname": v.surname,
                "amka":v.amka,
                "latest_visit": v.latest_visit.created_at if v.latest_visit else None
            }
            for v in page
        ],
        "next_cursor" : next_cursor,
        "has_more" : has_more 
    }

def search_visitor(
    db: Session,       
    search_term:str
):
    if not search_term.strip():
        return 
    res = db.query(models.Visitor).filter(or_(
            models.Visitor.name.ilike(f"%{search_term}%"),
            models.Visitor.surname.ilike(f"%{search_term}%"),
            models.Visitor.amka.ilike(f"%{search_term}%"),
            models.Visitor.phone_number.ilike(f"%{search_term}%")
        )).all()
    return(
        [
            {
                "id":v.id,
                "name":v.name,
                "surname":v.surname,
                "amka":v.amka,
                "latest_visit":v.latest_visit.created_at if v.latest_visit else None
            }
            for v in res
        ]
    )