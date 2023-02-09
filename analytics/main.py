from uvicorn import run
from fastapi import FastAPI
from modules.logs.loggers import Logger
from config.settings import APIREST_PORT, APIREST_HOST
from modules.apirest.apirest_manager import ApiRestManager
from dotenv import load_dotenv
from os import getenv

load_dotenv(".env")


def app() -> FastAPI:
    Logger.setup_logger()
    return ApiRestManager.setup()

if __name__ == "__main__":  
    run("main:app", port=int(APIREST_PORT),host=APIREST_HOST, reload=True, factory=True)
 