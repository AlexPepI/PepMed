from sqlalchemy.orm import Session
from app.database import get_db
from schemas.visitor import VisitorResponse,VisitorCreate,VisitorResponseWithVisits,VisitorHomepage,VisitorResponseHomepage
from schemas.medicine import MedicineUsage
from schemas.disease import DiseaseId
from sqlalchemy.exc import IntegrityError
from fastapi import APIRouter,HTTPException,status,Depends 
from services.visitor import create_visitor,update_visitor,paginated_fetch,search_visitor, VisitorNotFound, RelatedObjectNotFound
from crud.visitor import get_visitor_by_id
from typing import List

router = APIRouter(
    prefix="/visitor",
    tags=["Visitors"]
)

@router.get("/all",response_model=VisitorResponseHomepage)
def get_all_your_clients(limit: int = 15, cursor: int | None = None,db:Session = Depends(get_db)):
    return paginated_fetch(db,limit,cursor)

@router.get("/search",response_model = List[VisitorHomepage]) ##
def search_visitor_by_fullname_or_amka(db:Session = Depends(get_db),search_term=str):
    return search_visitor(db,search_term)

@router.get('/{id}',response_model=VisitorResponseWithVisits)
def get_specific_visitor_by_id(id:int,db:Session = Depends(get_db)):
    return get_visitor_by_id(db,id)

@router.post("/create",status_code=status.HTTP_201_CREATED,response_model=VisitorResponse)
def create_new_visitor(visitor: VisitorCreate,medicines: list[MedicineUsage],diseases: list[DiseaseId],db: Session = Depends(get_db),):
    try:
        return create_visitor(db, visitor, diseases, medicines)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except IntegrityError as ie:
        db.rollback()
        if "amka" in str(ie.orig):
            raise HTTPException(400, "Ο χρήστης με αυτό το ΑΜΚΑ υπάρχει ήδη.")
        raise HTTPException(500, "Unexpected error.")

@router.put("/{id}", response_model=VisitorResponse)
def update_visitor_data(id: int,visitor: VisitorCreate,diseases: list[DiseaseId] = [],medicines: list[MedicineUsage] = [],db: Session = Depends(get_db),):
    try:
        disease_ids = [d.id for d in diseases] if diseases is not None else None
        updated = update_visitor(db, id, visitor, disease_ids, medicines)
        return updated
    except VisitorNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Visitor not found")
    except RelatedObjectNotFound as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
