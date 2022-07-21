from fastapi import APIRouter, Request
from models import Location

class AnaliticEndPoints:
    @classmethod
    def setup (cls):
        cls._router = APIRouter()
        cls._router.add_api_route("/", cls._index_endpoint, methods=["GET"])
        cls._router.add_api_route("/test", cls._test_endpoint, methods=["GET"])
        cls._router.add_api_route("/perform_forecasting", cls._perform_forecasting, methods=["POST"])

    @classmethod
    def get_router(cls):
        return cls._router

    @classmethod
    async def _index_endpoint(cls):
        return AnaliticEndPoints.json_message("The APIRest is working...")

    @classmethod
    async def _test_endpoint(cls, request: Request):
        message = {"message": "Testing apirest", "host":request.client.host, "method": request.method}
        return message

    @classmethod
    async def _perform_forecasting(cls, location: Location):
        return AnaliticEndPoints.json_message("This is not ready yet...")
    

    @staticmethod
    def json_message(msn:str):
        return {"Message": f"{msn}"}