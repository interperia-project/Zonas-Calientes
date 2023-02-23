from json import dumps

from fastapi.responses import JSONResponse
from interfaces.manager import Manager
from tensorflow import random

from modules.logs.loggers import Logger
from modules.forecasting.extractor import ForecastingExtractor
from modules.forecasting.loader import ForecastingLoader
from modules.forecasting.trainer import ForecastingTrainer
from pandas import read_csv


class TimeForecastingManager(Manager):

    _execution_parameters = None

    @classmethod
    def perform_process(cls, execution_parameters: dict) -> dict:
        """
        Perform process methods takes the name of the function to be executen from a dictionaty,
        check if is implemented in the class, and then run it

        :param execution_parameters: dictionary that containg the fucntion to be executed and
        the execution parameters
        :type execution_parameters: dict
        :return: dictionary with the execution results
        :rtype: dict
        """
        cls._execution_parameters = execution_parameters
        process_function = execution_parameters.get("process_function")
        assert hasattr(cls, process_function), "Process not defined"
        return getattr(cls, process_function)()

    @classmethod
    def build_predictive_model(cls) -> dict:
        """
        This method use the data of a given cluster to build the predictive model files
        and store them in a S3/Firebase bucket
        :param json_content: data with security incident counts by hour, and grouped by day
        :type json_content: dict
        :return: Path of the bucket where the predictive model files were stored
        :rtype: dict
        """

        Logger.log("::::.....:::: Building a predictive model::::.....::::")
        
        random.set_seed(7)
        Logger.log("* Performing Data extraction")
        json_content = cls._execution_parameters.get("json_content")
        cluster_id = json_content[0].get("idHexagono").get("$oid")
        data = read_csv("/Users/andersonlopera/Desktop/LSTM/airline-passengers.csv", usecols=[1]) # ForecastingExtractor.extract_training_data(json_content)
        
        response = []
        
        for i in range(len(data.axes[1])+2):
            best_parameters = {'look_back': 3, 'units': 100, 'batch_size': 4, 'training_size': 0.7} # ForecastingTrainer.search_grid(data[[f"interval_{i}"]])

            look_back = best_parameters.get("look_back")
            units = best_parameters.get("units")
            batch_size = best_parameters.get("batch_size")
            training_size = best_parameters.get("training_size")
            epochs = 100

            Logger.log("* Setting neuronal network")
            ForecastingTrainer.setup_lstm_neuronal_network(units, look_back)

            Logger.log("* Preprocesing data")
            training_data = ForecastingTrainer.preprocessing(data, look_back, training_size)

            Logger.log("* Performing training process")
            fitting_result = ForecastingTrainer.fit_model(training_data, epochs, batch_size)

            if fitting_result.get("status"):
                Logger.log(f"Scores {fitting_result.get('scores')}")
                Logger.log(f"RMSE {fitting_result.get('rmse')}")
                Logger.log(f"Next_input_vector {fitting_result.get('next_input_vector')}")

                # ::::::......::: Load data in a Firebase bucket :::......::::::
                Logger.log("* Loading training model in bucket")

                models = {
                    "model": ForecastingTrainer.get_model(),
                    "scaler": ForecastingTrainer.get_scaler(),
                }

                save_models_result = ForecastingLoader.save_models_in_bucket(cluster_id, models, f"interval_{i}")
                save_model_status = save_models_result.get("model").get("status")
                save_scaler_status = save_models_result.get("scaler").get("status")

                if save_model_status and save_scaler_status:
                    Logger.log("** Model was saved sucessfully")
                    result = {
                        "status": True,
                        "idHexagono": cluster_id,
                        "model_remote_path": save_models_result.get("model").get("remote_path"),
                        "scaler_remote_path": save_models_result.get("scaler").get("remote_path"),
                        "next_input_vector": fitting_result.get("next_input_vector").tolist(),
                    }
                    response.append(result)
                else:
                    Logger.log("** Error saving models")
                    Logger.log(dumps(save_models_result, indent=4))
                    result = save_models_result

            else:
                response.append(fitting_result)

        return JSONResponse(response)


    @classmethod
    def perform_prediction(cls):
        """This method is used to get the prediction of the following point in the time series.
        the json content in the variable 'execution_parameters" must contain the last predicted sample, and the paths
        in firebase bucket where the scalers and models (by time interval) are stored
        :return: Next point in the time series and the last sample in the time series
        :rtype: dict
        """
        Logger.log("::::.....:::: Performing prediction ::::.....::::")
        json_content = cls._execution_parameters.get("json_content")
        
        for parameter in json_content:
            print(parameter.get("scaler_remote_path"))
            ForecastingExtractor.get_model_from_firebase(parameter.get("scaler_remote_path"))
            ForecastingExtractor.get_model_from_firebase(parameter.get("model_remote_path"))

        
 
        
        
        
        
            
