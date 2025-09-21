from .database import Base
from sqlalchemy import Table,Column,ForeignKey,Integer,String,Enum,Text,Date,TIMESTAMP,text
from sqlalchemy.orm import relationship
from schemas.visitor import GenderEnum,SmokerEnum

visit_medicines = Table(
    "visit_medicines",
    Base.metadata,
    Column("visit_id",Integer, ForeignKey("visits.id",ondelete="CASCADE"), primary_key=True),
    Column("medicine_id",Integer, ForeignKey("medicines.id",ondelete="CASCADE"), primary_key=True)
)

visit_symptoms = Table(
    "visit_symptoms",
    Base.metadata,
    Column("visit_id",Integer, ForeignKey("visits.id",ondelete="CASCADE"), primary_key=True),
    Column("symptom_id",Integer,ForeignKey("symptoms.id",ondelete="CASCADE"),primary_key=True)
)

visitor_diseases = Table(
    "visitor_diseases", 
    Base.metadata,
    Column("visitor_id", Integer, ForeignKey("visitors.id", ondelete="CASCADE"), primary_key=True),
    Column("disease_id", Integer, ForeignKey("diseases.id", ondelete="CASCADE"), primary_key=True),
)

class VisitorMedicineLink(Base):
    __tablename__ = "visitor_medicines"

    visitor_id = Column(Integer, ForeignKey("visitors.id",ondelete="CASCADE"), primary_key=True)
    medicine_id = Column(Integer, ForeignKey("medicines.id",ondelete="CASCADE"), primary_key=True)
    until       = Column(Date, nullable=True)

    visitor  = relationship("Visitor", back_populates="medicines_links")
    medicine = relationship("Medicine", back_populates="visitor_links")

class Visit(Base):
    __tablename__ = "visits"

    id = Column(Integer,primary_key=True,index=True)
    diagnosis = Column(String(100),nullable=False)
    comments = Column(Text,nullable=False)
    reason = Column(String(100),nullable=False)
    examination = Column(Text,nullable=False)
    control = Column(Text,nullable=True)
    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()")
    )
    visitor_id = Column(Integer,ForeignKey("visitors.id",ondelete="CASCADE"),nullable=False)
    
    visitor = relationship("Visitor",back_populates="visits")
    medicines  = relationship(
        "Medicine",
        secondary=visit_medicines,
        back_populates="visits"
    )
    symptoms = relationship(
        "Symptom",
        secondary=visit_symptoms,
        back_populates= "visits"
    )
    files = relationship(
        "VisitFile",
        back_populates="visit",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

class Visitor(Base):
    __tablename__ = 'visitors'

    id = Column(Integer,primary_key=True,index=True)
    name = Column(String(25),nullable=False)
    surname = Column(String(25),nullable=False)
    birth_date = Column(Date,nullable=False)
    gender = Column(Enum(GenderEnum),nullable=False)
    amka = Column(String(20),nullable=True,unique=True)
    weight = Column(Integer,nullable=False)
    height = Column(Integer,nullable=False)
    smoker = Column(Enum(SmokerEnum),nullable=False)
    email = Column(String(60),nullable=True)
    phone_number=Column(String(25),nullable=True)
    history = Column(Text,nullable=True)
    years_smoking = Column(Integer,nullable=True)
    cig_per_day = Column(Integer,nullable=True)
    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()")
    )
    visits = relationship(
        "Visit",
        back_populates="visitor",
        order_by=Visit.created_at.desc(),
        cascade="all, delete-orphan"
    )
    medicines_links = relationship(
        "VisitorMedicineLink",
        back_populates="visitor",
        cascade="all, delete-orphan"
    )
    diseases  = relationship(
        "Disease",
        secondary=visitor_diseases,
        back_populates="visitors",
    )
    latest_visit = relationship(
        "Visit",
        uselist=False,  
        order_by=Visit.created_at.desc(),  
        lazy="selectin",                         
        viewonly=True           
    )

class VisitFile(Base):
    __tablename__ = "visit_files"
    id = Column(Integer, primary_key=True)
    visit_id = Column(Integer, ForeignKey("visits.id", ondelete="CASCADE"), index=True, nullable=False)
    storage_key = Column(String(512), nullable=False, index=True)
    original_name = Column(String(255), nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    visit = relationship("Visit", back_populates="files")

class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(Integer,primary_key=True,index=True)
    name = Column(String(35),nullable=False)
    
    visitor_links = relationship(
        "VisitorMedicineLink",
        back_populates="medicine",
        cascade="all, delete-orphan"
    )
    visits  = relationship(
        "Visit",
        secondary=visit_medicines,
        back_populates="medicines",
    )

class Symptom(Base):
    __tablename__ = "symptoms"

    id = Column(Integer,primary_key=True,index=True)
    name = Column(String(35),nullable=False)

    visits = relationship(
        "Visit",
        secondary=visit_symptoms,
        back_populates="symptoms"
    )

class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer,primary_key=True,index=True)
    name = Column(String(35),nullable=False)

    visitors = relationship(
        "Visitor",
        secondary=visitor_diseases,
        back_populates="diseases",
    )