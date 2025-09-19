import os
from jinja2 import Environment, BaseLoader, StrictUndefined
from weasyprint import HTML

MEDIA_ROOT = os.path.abspath(os.environ.get("MEDIA_ROOT", "media"))
DEFAULT_HTML_NAME = os.environ.get("DEFAULT_HTML_NAME", "test.html")
DEFAULT_HTML = os.path.join(MEDIA_ROOT, DEFAULT_HTML_NAME)

class NotFoundError(Exception): ...
class PdfRenderError(Exception): ...

DUMMY_DATA = {
    "clinic": {
        "name": "Ιωάννης Πεπόνης",
        "address": "Χαριλάου Τρικούπη 2, Ιωάννινα",
        "phone": "26510 - 38684",
        "email": "ioannispepo@gmail.com",
    },
    "report": {
        "date": "2025-09-19",
    },
    "visitor": {
        "name": "John",
        "surname": "Doe",
        "amka": "12345678901",
        "gender": "Male",
        "birth_date": "1988-05-12",
        "age": 37,
        "phone": "+30 690 000 0000",
        "email": "john.doe@example.com",
        "height_cm": 180,
        "weight_kg": 78,
        "bmi": "24.1",
        "smoker": "Yes",
        "years_smoking": 5,
        "cigarettes_per_day": 6,
        "diseases_list": "Hypertension",
        "medicines_list": "Lisinopril 10mg daily",
        "history_notes": "No surgeries. Seasonal allergies.",
    },
    "visit": {
        "date_time": "2025-09-19 10:30",
        "reason": "Routine check-up",
        "symptoms_list": "Headache, fatigue",
        "examination": "Normal cardiopulmonary exam. No edema.",
        "lab_workup": "CBC, CMP ordered.",
        "diagnosis": "Tension-type headache",
        "recommendations": "Hydration, sleep hygiene, OTC analgesic if needed.",
        "medicines_list": "Ibuprofen 200mg PRN",
    },
    "doctor": {
        "name": "Alex Papadopoulos",
    },
}

def generate_pdf() -> tuple[bytes, str]:
    if not os.path.isfile(DEFAULT_HTML):
        raise NotFoundError(f"HTML not found: {os.path.basename(DEFAULT_HTML)}")

    try:
        with open(DEFAULT_HTML, "r", encoding="utf-8", errors="ignore") as f:
            html_src = f.read()

        env = Environment(loader=BaseLoader(), autoescape=False, undefined=StrictUndefined)
        rendered_html = env.from_string(html_src).render(**DUMMY_DATA)

        pdf_bytes = HTML(string=rendered_html, base_url=MEDIA_ROOT).write_pdf()
    except Exception as e:
        raise PdfRenderError(f"Failed to render PDF: {e}")

    pdf_name = os.path.splitext(os.path.basename(DEFAULT_HTML))[0] + ".pdf"
    return pdf_bytes, pdf_name
