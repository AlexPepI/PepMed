from pydantic import BaseModel

class DiseaseBase(BaseModel):
    name : str

class DiseaseCreate(DiseaseBase):
    pass

class DiseaseResponse(DiseaseBase):
    id : int

class DiseaseId(BaseModel):
    id : int
