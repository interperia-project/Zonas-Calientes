from datetime import date
from tempfile import NamedTemporaryFile

from keras.models import load_model
from joblib import load
from pandas import DataFrame, DatetimeIndex, date_range, to_datetime

from modules.repository.firebase_client import FireBaseClient


class ForecastingExtractor:
    @classmethod
    def extract_training_data(cls, json_content: dict) -> DataFrame:
        """Cast the data from json content in the POST request in a Dataframe.
        Also the dates  without data are fille with 0s (necesary for time series forecasting
        :param json_content: json file with the data to traing the model
        :type json_content: dict
        :return: Dataframe with as many columns as time intervals in the json content    
        :rtype: DataFrame testing
        """
        df = DataFrame(json_content)
        df = df.join(DataFrame(df["cantidad"].tolist()).add_prefix("interval_"))
        df = df.set_index(to_datetime(df["dia"], format="%d/%m/%Y"))
        df.index = DatetimeIndex(df.index)
        df = df.reindex(date_range(df.index.min(), date.today()), fill_value=0)
        return df.drop(["cantidad", "idHexagono", "dia"], axis=1)

    @staticmethod
    def get_model_from_firebase(remote_path:str):
        """Get the file with the training model or the scaler object from firebase
        :param remote_path: path in firebase bucket
        :type remote_path: str
        :return: object with the scaler or the training model
        :rtype: MaxMinscaler object or Sequencial object
        """

        firebase_manager = FireBaseClient("interperia")
        sufix = ".h5" if ".h5" in remote_path  else ".plk"
        
        with NamedTemporaryFile(suffix=sufix, delete=False) as temp_file:
            result = firebase_manager.download_file(remote_path, temp_file.name)
            if not result.get("status"):
                return {"status": False, "message": "Download error"}
            else:
                model_objet = load_model(temp_file.name) if sufix == ".h5" else load(temp_file.name)              
                return model_objet
        