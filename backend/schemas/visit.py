from datetime import datetime
from typing import Optional,List
from pydantic import BaseModel
from schemas.medicine import MedicineResponse
from schemas.symptom import SymptomResponse

class VisitBase(BaseModel):
    diagnosis: str
    comments : str
    reason : str
    examination : str
    control : str | None
    
    class Config:
        orm_mode = True

class VisitFileBase(BaseModel):
    id: int
    storage_key: str
    original_name: str
    created_at: datetime

    class Config:
        orm_mode = True

class VisitResponseForVisitor(BaseModel):
    id:int
    diagnosis:str
    created_at:datetime

class VisitCreate(VisitBase):
    reason : str
    examination : str
    control : str | None

class VisitResponse(VisitBase):
    id:int
    created_at: datetime
    files: list[VisitFileBase] = []
    medicines: Optional[List[MedicineResponse]]
    symptoms : Optional[List[SymptomResponse]]
    