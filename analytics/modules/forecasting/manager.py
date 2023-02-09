from interfaces.manager import Manager
from modules.logs.loggers import Logger
from modules.forecasting.extractor import ForecastingExtractor
from modules.forecasting.trainer import ForecastingTrainer
from modules.forecasting.loader import ForecastingLoader
from tensorflow import random
from fastapi.responses import JSONResponse
from json import dumps


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

        Logger.put_log(f"::::.....:::: Time Forecasting ::::.....::::")
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
        
        random.set_seed(7)
        Logger.put_log("* Performing Data extraction")
        json_content = cls._execution_parameters.get("json_content")
        cluster_id = json_content[0].get("idHexagono").get("$oid")
        data = ForecastingExtractor.extract_training_data(json_content)

        best_parameters = ForecastingTrainer.search_grid(data)

        look_back = best_parameters.get("look_back")
        units = best_parameters.get("units")
        batch_size = best_parameters.get("batch_size")
        training_size = best_parameters.get("training_size")
        epochs = 100
        
        Logger.put_log("* Setting neuronal network")
        ForecastingTrainer.setup_lstm_neuronal_network(units, look_back)

        Logger.put_log("* Preprocesing data")
        training_data = ForecastingTrainer.preprocessing(data, look_back, training_size)

        Logger.put_log("* Performing training process")
        fitting_result = ForecastingTrainer.fit_model(training_data, epochs, batch_size)
        
        if fitting_result.get("status") == "success":
            Logger.put_log(f"Scores {fitting_result.get('scores')}")
            Logger.put_log(f"RMSE {fitting_result.get('rmse')}")
            Logger.put_log(f"Next_input_vector {type(fitting_result.get('next_input_vector'))}")

            # ::::::......::: Load data in a Firebase bucket :::......::::::
            Logger.put_log("* Loading training model in bucket")

            models= {
                "model": ForecastingTrainer.get_model(),
                "scaler":  ForecastingTrainer.get_scaler()
            }
            save_models_result = ForecastingLoader.save_models_in_bucket(cluster_id, models)
            save_model_status = save_models_result.get("model").get("status")
            save_scaler_status = save_models_result.get("scaler").get("status")
            
            if  save_model_status == "success" and save_scaler_status == "success":
                Logger.put_log("** Model was saved sucessfully")
                result = {
                    "status": "success",
                    "model_remote_path": save_models_result.get("model").get("remote_path"),
                    "scaler_remote_path": save_models_result.get("scaler").get("remote_path"),
                    "next_input_vector": fitting_result.get("next_input_vector").tolist()
                }
            else:
                Logger.put_log(f"** Error saving models")
                Logger.put_log(dumps(save_models_result, indent=4))
                result = save_models_result
    
        else:
            result = fitting_result

        return JSONResponse(result)
