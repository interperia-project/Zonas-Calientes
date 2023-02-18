from pandas import DataFrame, date_range, to_datetime, DatetimeIndex
from datetime import date



class ForecastingExtractor:
    
    @classmethod
    def extract_training_data(cls, json_content:dict) -> DataFrame:
        df = DataFrame(json_content)
        df = df.join(DataFrame(df['cantidad'].tolist()).add_prefix('interval_'))
        df = df.set_index(to_datetime(df["dia"],format="%d/%m/%Y"))
        df.index = DatetimeIndex(df.index)
        df= df.reindex(date_range(df.index.min(), date.today()), fill_value=0)
        return df.drop(["cantidad", "idHexagono", "dia"], axis=1)
        