from modules.forecasting import queries
from pandas import DataFrame, date_range, to_datetime, DatetimeIndex
from modules.logs.loggers import Logger
from modules.repository.db_manager import DBManager
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
        
    
    @classmethod
    def extract_location_data(cls, cluster_location: dict, radius: int | float) -> DataFrame:
        """This method is used to extract the coordinates and dates around the cluster
        location and within a defined radius.

        :param cluster_location: longitud and latitud of a cluster in the following format:
                                 cluster_location = {
                                 "lng":float(longitude),
                                 "lat":float(latitude)
                                }
        :type cluster_location: dict
        :param radius: Radius delimiting the region of analysis [meters]
        :type radius: int | float
        """
        # TODO: Consider to use a singleton patter no get a db_manager connection
        # TODO: Define where the dispose_engine method will be used
        
        db_manager = DBManager("mysql_db_local")
        params = {
            "radius": radius,
            "lng": cluster_location.get("lng", 0),
            "lat": cluster_location.get("lat", 0),
        }
        query = queries.get_locations_by_cluster.format(**params)
        df = db_manager.select_as_df(query)
        return df