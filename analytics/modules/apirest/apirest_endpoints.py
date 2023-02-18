from fastapi import Request
from utils.utility_functions import json_message
from modules.logs.loggers import Logger
from modules.forecasting.manager import TimeForecastingManager

class AnalyticEndPoints:
    @classmethod
    async def _index_endpoint(cls):
        Logger.log("APIREST is working...")
        return json_message("APIREST is working...")

    @classmethod
    async def _build_predictive_model_endpoint(cls, request: Request) -> dict:
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
 
        execution_parameters = {
            "process_function": "build_predictive_model",
            "json_content": await request.json()
        }
        
        result = TimeForecastingManager.perform_process(execution_parameters)
        return result
    
    
    @classmethod
    async def _prediction_endpoint(cls, request: Request) -> dict:
        """_summary_

        :param request: _description_
        :type request: Request
        :return: _description_
        :rtype: dict
        """
        execution_parameters = {
            "process_function": "perform_pediction",
            "json_content": await request.json()
        }
        
        result = TimeForecastingManager.perform_process(execution_parameters)
        return result
        

    @classmethod
    async def _test_endpoint(cls, request: Request):
        message = {
            "message": "Testing apirest",
            "host": request.client.host,
            "method": request.method,
        } 
        return message

    # ::::::......:::::: Getter Methods ::::::......::::::
    @classmethod
    def get_index_endpoint(cls):
        params = {
            "path": "/", 
            "endpoint": cls._index_endpoint,
            "methods": ["GET"]}
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
            "path": "/prediction",
            "endpoint": cls._prediction_endpoint,
            "methods": ["POST"],
        }
        return params

    @classmethod
    def get_test_endpoint(cls):
        params = {
            "path": "/test_endpoint",
            "endpoint": cls._test_endpoint,
            "methods": ["GET"],
        }
        return params
