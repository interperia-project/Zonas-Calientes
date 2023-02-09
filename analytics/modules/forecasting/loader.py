from modules.logs.loggers import Logger
from modules.repository.firebase_client import FireBaseClient
from keras.models import Sequential
from tempfile import TemporaryDirectory
from config.settings import FIREBASE_CONFIGS
from joblib import dump


class ForecastingLoader:
    
    @classmethod
    def save_models_in_bucket(cls, cluster_id:str, models: dict) -> dict:
        firebase_manager = FireBaseClient("interperia")
        Logger.put_log("* Loading data in firebase storage service")
        results = {}
        for name, model_object in models.items():
            with TemporaryDirectory() as tempdir:
                remote_path = f"{FIREBASE_CONFIGS.get('models_save_folder')}/{name}_id_{cluster_id}.h5"
                temp_path = f"{tempdir}/{name}_id_{cluster_id}.h5"
                if isinstance(model_object, Sequential):
                    model_object.save(temp_path)
                else:
                    dump(model_object, temp_path)
            results [name]= firebase_manager.save_in_bucket(temp_path, remote_path)
        return results
