from tempfile import NamedTemporaryFile

from joblib import dump

from config.settings import FIREBASE_CONFIGS
from modules.repository.firebase_client import FireBaseClient


class ForecastingLoader:
    @classmethod
    def save_models_in_bucket(cls, cluster_id: str, models: dict, interval: str) -> dict:
        """This function can be used to save in firebase bucket (or other), a file  with the training model
        and with the scaler object
        :param cluster_id: name of the cluster id given in the json content
        :type cluster_id: str
        :param models: distionary with the traing model and the scaller in the following format:
                {
                    "model": training_model_object,
                    "scaler: scaler_objet
                }
        :type models: dict
        :param interval: This parameter indicate which time interval of the dataframe is being save
        :type interval: str
        :return: operation status
        :rtype: dict
        """
        firebase_manager = FireBaseClient("interperia")
        base_folder = f"{FIREBASE_CONFIGS.get('interperia').get('saving_folder')}"
        results = {}

        for name, model_object in models.items():
            sufix = ".h5" if name == "model" else ".plk"
            remote_path = f"{base_folder}/{cluster_id}/{name}_{interval}{sufix}"

            with NamedTemporaryFile(suffix=sufix, delete=False) as tempfile:
                if name == "model":
                    model_object.save(tempfile.name)
                else:
                    dump(model_object, tempfile.name)
                tempfile.seek(0)
                results[name] = firebase_manager.save_in_bucket(tempfile, remote_path)
        return results
