from fastapi import APIRouter,status,Depends  
from sqlalchemy.orm import Session
from app.database import get_db
from schemas.medicine import *
from typing import List
from crud import medicine

router = APIRouter(
    prefix="/medicine",
    tags=["Medicines"]
)

@router.get("/all",response_model=List[MedicineResponse])
def get_all_medicine_types(db:Session = Depends(get_db)):
    return medicine.get_all_medicines(db)

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=MedicineResponse)
def add_new_medicine_type_to_your_database(new_medicine:MedicineCreate, db:Session = Depends(get_db)):
        return medicine.create_new_medicine(db,new_medicine.name)

@router.delete("/",status_code=status.HTTP_204_NO_CONTENT)
def delete_medicine_type(deleted_medicine:MedicineId,db:Session = Depends(get_db)):
    medicine.delete_medicine_by_id(db,deleted_medicine.id)