from fastapi import Request, Depends
from fastapi.responses import JSONResponse
from utils.utility_functions import json_message
from modules.forecasting.manager import TimeForecastingManager
from typing import Annotated
from modules.logs.loggers import Logger


class AnalyticEndPoints:
    
    # TODO: using the endpoints class and the add_api_router functio just intruduce and addtional complexity to the code. 
    # I recomend use a single module and yo use the app decorators

    @staticmethod
    async def get_body(request: Request):
        return await request.json()
    
    @classmethod
    async def _index_endpoint(cls):
        message = "Analitycs APIREST is working..."
        Logger.log(message)
        return json_message(message)

    @classmethod
    def _build_predictive_model_endpoint(cls, json_content: Annotated[dict, Depends(get_body)]) -> dict:
        """
        This method is used to build a predictive model with historical data from a single cluster
        The data will be sent in a post request with the following format:
        :param request: data in json format sent in a post request
        :return: dictionary with the path in a AWS/Firebase bucket containing the files with the predictive model

        Example:
            {
                data: [
                        {date: str (dd/mm/yyyy), counts: array},
                        {date: str (dd/mm/yyyy), counts: array},
                        {date: str (dd/mm/yyyy), counts: array},
                                    .
                                    .
                                    .
                        {date: str (dd/mm/yyyy), counts: array},
                ]
            }

        Counts is an array of length 24, and represents the number of incidents in a one hour interval.
        For example, the first position represent the counts for the interval 00:00 to 00:59, second position
        represent the counts for the interval from 01:00 to 01:59 and continues with the same logic up to 23:59
        """
        Logger.log("Starting trainer")
        execution_parameters = {"process_function": "build_predictive_model", "json_content": json_content}
        operation_result = TimeForecastingManager.perform_process(execution_parameters)
        return JSONResponse(operation_result)

    @classmethod
    def _prediction_endpoint(cls, json_content: Annotated[dict, Depends(get_body)]) -> dict:
        """_summary_

        :param request: _description_
        :type request: Request
        :return: _description_
        :rtype: dict
        """
        Logger.log("starting predictor")
        execution_parameters = {"process_function": "perform_prediction", "json_content": json_content}
        operation_result = TimeForecastingManager.perform_process(execution_parameters) 
        return JSONResponse(operation_result)


    # ::::::......:::::: Getter Methods ::::::......::::::
    @classmethod
    def get_index_endpoint(cls):
        params = {"path": "/", "endpoint": cls._index_endpoint, "methods": ["GET"]}
        return params

    @classmethod
    def get_build_predictive_model_endpoint(cls):
        params = {
            "path": "/build_predictive_model",
            "endpoint": cls._build_predictive_model_endpoint,
            "methods": ["POST"],
        }
        return params

    @classmethod
    def get_prediction_endpoint(cls):
        params = {
            "path": "/perform_prediction",
            "endpoint": cls._prediction_endpoint,
            "methods": ["POST"]
        }
        return params

