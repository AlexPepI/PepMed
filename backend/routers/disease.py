from fastapi import APIRouter,status,Depends  
from sqlalchemy.orm import Session
from app.database import get_db
from schemas.disease import *
from crud.disease import *
from typing import List

router = APIRouter(
    prefix="/disease",
    tags=["Diseases"]
)

@router.get("/all",response_model=List[DiseaseResponse])
def get_all_disease_types(db:Session = Depends(get_db)):
    return get_all_diseases(db)

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=DiseaseResponse)
def add_new_disease_type_to_your_database(new_disease:DiseaseCreate,db:Session = Depends(get_db)):
    return create_new_disease(db,new_disease.name)

@router.delete("/",status_code=status.HTTP_204_NO_CONTENT)
def delete_medicine_type(deleted_disease:DiseaseId,db:Session = Depends(get_db)):
    delete_disease_by_id(db,deleted_disease.id)