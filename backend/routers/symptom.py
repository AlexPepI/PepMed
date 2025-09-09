from fastapi import APIRouter,status,Depends  
from sqlalchemy.orm import Session
from app.database import get_db
from schemas.symptom import *
from typing import List
from crud.symptom import *

router = APIRouter(
    prefix="/symptom",
    tags=["Symptoms"]
)

@router.get("/all",response_model=List[SymptomResponse])
def get_all_symptom_types(db:Session = Depends(get_db)):
    return get_all_symptoms(db)

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=SymptomResponse)
def add_new_symptom_type_to_your_database(new_symptom:SymptomCreate,db:Session = Depends(get_db)):
    return create_new_symptom(db,new_symptom.name)

@router.delete("/",status_code=status.HTTP_204_NO_CONTENT)
def delete_symptom_type(delete_symptom:SymptomId,db:Session = Depends(get_db)):
    delete_symptom_by_id(db,delete_symptom.id)
