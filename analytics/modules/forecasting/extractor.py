from pandas import DataFrame, date_range, to_datetime, DatetimeIndex
from datetime import date
from tempfile import NamedTemporaryFile
from modules.repository.firebase_client import FireBaseClient



class ForecastingExtractor:
    
    @classmethod
    def extract_training_data(cls, json_content:dict) -> DataFrame:
        df = DataFrame(json_content)
        df = df.join(DataFrame(df['cantidad'].tolist()).add_prefix('interval_'))
        df = df.set_index(to_datetime(df["dia"],format="%d/%m/%Y"))
        df.index = DatetimeIndex(df.index)
        df= df.reindex(date_range(df.index.min(), date.today()), fill_value=0)
        return df.drop(["cantidad", "idHexagono", "dia"], axis=1)
    
    @staticmethod
    def get_models_from_firebase(remote_path:str, model_type:str):
        
        with NamedTemporaryFile(suffix=".h5", delete=False) as temp_file:
            result = FireBaseClient.download_file(remote_path, temp_file.name)
            
            if result != "success":
                return "Download error"
            
            if model_type ==  "training_model":
                from keras.models import load_model
                return load_model(temp_file.name)

        