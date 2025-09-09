from datetime import date
from typing import Optional
from pydantic import BaseModel

class MedicineBase(BaseModel):
    name : str

class MedicineId(BaseModel):
    id:int

class MedicineCreate(MedicineBase):
    pass

class MedicineResponse(MedicineBase):
    id : int

class MedicineUsage(BaseModel):
    id : int
    until : Optional[date] = None