# Pep Medical

> A medical records management system built with **FastAPI**, **PostgreSQL**  and **React** 

## Overview
Pep Medical is an internal application developed for a group of doctors to streamline medical record management in their infirmary. For each visitor, doctors can record multiple visits, attach structured data to each visit, and store related files (e.g., X-rays, scans, lab reports). The goal is to keep day-to-day clinical notes and documents organized and easy to retrieve.

### What it does
- Manage **visitors** (patients) and their **visits**
- Create, read, update, and delete records (full **CRUD**)
- **Upload & store files** per visit (e.g., X-rays and other medical documents)
- Keep a simple, practical workflow for small practices or infirmaries

---

## Tech Stack
- **Backend:** FastAPI + SQLAlchemy + Pydantic  
- **Database:** PostgreSQL  
- **Frontend:** React + Vite  
- **DevOps:** Docker + Docker Compose + Nginx  

---

## Quick Start

### Prerequisites
- [Docker](https://www.docker.com/) installed on your machine  

### Run the app
From the project root:

```bash
docker compose up --build
```

Then open your browser at : http://localhost

> **Development environment:**  
> This compose setup is meant for **local development**. Both the backend (Uvicorn `--reload`) and frontend (Vite with file polling) support **live code reload**. Edit files in `backend/` or `frontend/` and your changes appear without rebuilding images.


### How requests flow (dev)
- Browser → `http://localhost/` → **Nginx** → **Vite** (frontend)
- Browser → `http://localhost/api/...` → **Nginx** → **FastAPI** (backend:8000)

### Live reload
- **Frontend**: Vite dev server watches files and hot-reloads (polling enabled for Windows + Docker).
- **Backend**: Uvicorn runs with `--reload` and restarts on Python file changes.
- **Database**: PostgreSQL runs in a container; data persists for the life of the container unless you remove volumes.

## API Documentation

The backend exposes interactive API documentation via **Swagger UI**:

- [http://localhost/api/docs](http://localhost/api/docs)

You can use this interface to explore available endpoints, test requests, and review request/response models.
