from pydantic import BaseModel

class SymptomBase(BaseModel):
    name : str 

class SymptomId(BaseModel):
    id:int

class SymptomCreate(SymptomBase):
    pass

class SymptomResponse(SymptomCreate):
    id : int