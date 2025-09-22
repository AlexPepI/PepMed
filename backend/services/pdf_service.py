from datetime import date
from sqlalchemy import select
from sqlalchemy.orm import selectinload 

from app.models import Visit, Visitor ,VisitorMedicineLink  
from jinja2 import Environment, BaseLoader, StrictUndefined
from weasyprint import HTML
import os

MEDIA_ROOT = os.path.abspath(os.environ.get("MEDIA_ROOT", "pdf_export"))
DEFAULT_HTML_NAME = os.environ.get("DEFAULT_HTML_NAME", "greek.html")
DEFAULT_HTML = os.path.join(MEDIA_ROOT, DEFAULT_HTML_NAME)

class NotFoundError(Exception): ...
class PdfRenderError(Exception): ...

def _bmi(weight_kg: int | None, height_cm: int | None) -> str | None:
    if not weight_kg or not height_cm: return None
    h_m = height_cm / 100
    return f"{round(weight_kg / (h_m ** 2), 1)}"

def _packyears(cig_per_day: int | None, years_smoking: int | None) -> int | None:
    if not cig_per_day or not years_smoking: return None
    return int(round((cig_per_day / 20) * years_smoking))

def build_visit_payload(session, visit_id: int) -> dict:
    q = (
    select(Visit)
    .options(
        selectinload(Visit.visitor).selectinload(Visitor.diseases),
        selectinload(Visit.visitor)
            .selectinload(Visitor.medicines_links)
            .selectinload(VisitorMedicineLink.medicine),  # ← no string
        selectinload(Visit.medicines),
        selectinload(Visit.symptoms),
    )
    .where(Visit.id == visit_id)
)
    visit = session.execute(q).scalar_one_or_none()
    if not visit:
        raise NotFoundError(f"Visit not found: {visit_id}")
    v = visit.visitor

    visitor_meds = [l.medicine.name for l in getattr(v, "medicines_links", []) if l.medicine]
    visit_meds   = [m.name for m in getattr(visit, "medicines", [])]
    symptoms     = [s.name for s in getattr(visit, "symptoms", [])]
    diseases     = [d.name for d in getattr(v, "diseases", [])]

    return {
        "clinic": {"name":"Ιωάννης Πεπόνης", "address": "Χαριλάου Τρικούπη 2, Ιωάννινα", "phone": "6985567022", "email": "ioannispepo@gmail.com"},  
        "report": {"date": visit.created_at.date().isoformat() if visit.created_at else date.today().isoformat()},
        "visitor": {
            "name": v.name,
            "surname": v.surname,
            "amka": v.amka if v.amka else "-",
            "gender": (
                "Άνδρας" if getattr(v.gender, "value", v.gender) == "male"
                else "Γυναίκα" if getattr(v.gender, "value", v.gender) == "female"
                else "Άλλο"
            ) if v.gender else "-",
            "birth_date": v.birth_date.isoformat() if v.birth_date else "-",
            "phone": v.phone_number if v.phone_number else "-",
            "email": v.email if v.email else "-",
            "height_cm": v.height,
            "weight_kg": v.weight,
            "bmi": _bmi(v.weight, v.height),
            "smoker": (
                "Καπνιστής" if getattr(v.smoker, "value", v.smoker) == "smoker"
                else "Μη καπνιστής" if getattr(v.smoker, "value", v.smoker) == "non_smoker"
                else "Πρώην καπνιστής"
            ) if v.smoker else "-",
            "packyears": _packyears(v.cig_per_day, v.years_smoking) or "-",
            "diseases_list": ", ".join(diseases) or "-",
            "medicines_list": ", ".join(visitor_meds) or "-",
            "history_notes": v.history,
        },
        "visit": {
            "date_time": visit.created_at.isoformat(timespec="minutes") if visit.created_at else "-",
            "reason": visit.reason,
            "symptoms_list": ", ".join(symptoms) or "-",
            "examination": visit.examination,
            "lab_workup": visit.control if visit.control else "-",  
            "diagnosis": visit.diagnosis,
            "recommendations": visit.comments,  
            "medicines_list": ", ".join(visit_meds) or "-",
        },
    }

def generate_pdf_for_visit(session, visit_id: int) -> tuple[bytes, str]:
    if not os.path.isfile(DEFAULT_HTML):
        raise NotFoundError(f"HTML not found: {os.path.basename(DEFAULT_HTML)}")

    try:
        with open(DEFAULT_HTML, "r", encoding="utf-8", errors="ignore") as f:
            html_src = f.read()

        data = build_visit_payload(session, visit_id)
        env = Environment(loader=BaseLoader(), autoescape=False, undefined=StrictUndefined)
        rendered_html = env.from_string(html_src).render(**data)
        pdf_bytes = HTML(string=rendered_html, base_url=MEDIA_ROOT).write_pdf()
    except Exception as e:
        raise PdfRenderError(f"Failed to render PDF: {e}")

    return pdf_bytes, f"visit_{visit_id}.pdf"

