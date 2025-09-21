import enum
from datetime import date,datetime
from typing import Optional,List
from pydantic import BaseModel,EmailStr
from .medicine import *
from .disease import *
from .visit import VisitResponseForVisitor

class GenderEnum(enum.Enum):
    male = "male"
    female ="female"
    other ="other"

class SmokerEnum(enum.Enum):
    smoker = "smoker"
    non_smoker="non_smoker"
    ex_smoker="ex_smoker"

class VisitorBase(BaseModel):
    name : str
    surname : str
    birth_date : date
    gender : GenderEnum
    amka : Optional[str] = None
    weight : int
    height : float
    smoker : SmokerEnum
    years_smoking:Optional[int] = None
    cig_per_day:Optional[int] = None

class VisitorCreate(VisitorBase):
    email : Optional[EmailStr] = None
    phone_number : Optional[str] = None
    history : Optional[str] = None


class VisitorMedicineLink(BaseModel):
    medicine:MedicineResponse
    until:Optional[date]

class VisitorResponse(VisitorBase):
    id:int
    email : Optional[EmailStr]
    phone_number : Optional[str]
    history : Optional[str]
    medicines_links : Optional[List[VisitorMedicineLink]]
    diseases : Optional[List[DiseaseResponse]]


class VisitorResponseWithVisits(VisitorResponse):
    visits : Optional[List[VisitResponseForVisitor]]


class VisitorHomepage(BaseModel):
    id : int
    name : str
    surname : str
    amka : Optional[str] 
    latest_visit : Optional[datetime] = None

    class Config:
        from_attributes = True

class VisitorResponseHomepage(BaseModel):
    visitors: List[VisitorHomepage]
    next_cursor:Optional[int]
    has_more:bool