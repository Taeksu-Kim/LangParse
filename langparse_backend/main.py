# uvicorn main:app --port 8000 --reload 
import os
from dotenv import load_dotenv

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from typing import List

from glob import glob 

load_dotenv()

DOMAIN_NAME = os.getenv("DOMAIN_NAME")
SERVER_IP = os.getenv("SERVER_IP")
SERVER_PORT = os.getenv("SERVER_PORT")
MBTI_RESULT_SAVE_DIR = os.getenv("MBTI_RESULT_SAVE_DIR")

app = FastAPI()
router = APIRouter()

# app.include_router(router, prefix="/api")

origins = [
    DOMAIN_NAME,
    f"{SERVER_IP}:{SERVER_PORT}",
    "http://localhost:8080",
    # "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReportData(BaseModel):
    prev_result: str
    cur_result: str
    test_result: List

@router.post("/result_report")
# @app.post("/result_report")
def result_report(report_data: ReportData):
    prev_result = report_data.prev_result
    cur_result = report_data.cur_result
    test_result = report_data.test_result

    save_folder = MBTI_RESULT_SAVE_DIR

    file_list = glob(f'{save_folder}/*.txt')
    name = len(file_list)
    # file_with.py
    with open(f"{save_folder}/{name}.txt", "w") as f:
        f.write(f"{prev_result},{cur_result},{test_result}")

    return {"message": "200"}

app.include_router(router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, 
                host="0.0.0.0", 
                port=8000,
    )
    
