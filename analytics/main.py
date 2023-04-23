from dotenv import load_dotenv
from fastapi import FastAPI
from uvicorn import run

from config.settings import APIREST_HOST, APIREST_PORT
from modules.apirest.apirest_manager import ApiRestManager
from modules.logs.loggers import Logger

load_dotenv(".env")


def app() -> FastAPI:
    Logger.setup_logger()
    return ApiRestManager.setup()

if __name__ == "__main__":
    run("main:app", port=int(APIREST_PORT),host=APIREST_HOST, reload=True, factory=True, workers=4)
