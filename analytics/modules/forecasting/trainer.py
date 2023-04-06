from keras.models import Sequential
from keras.layers import Dense, LSTM
from keras.callbacks import EarlyStopping
from pandas import DataFrame
from numpy import reshape, array, sqrt
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from modules.logs.loggers import Logger
from numpy import arange, append


class ForecastingTrainer:
    _model = None
    _scaler = None

    @classmethod
    def setup_lstm_neuronal_network(
        cls,
        units: int,
        look_back: int,
        activation: str = "tanh",
        loss: str = "mean_squared_error",
        metrics: list = ["mse", "mae"],
    ):
        cls._model = Sequential()
        cls._model.add(LSTM(units, input_shape=(1, look_back), activation=activation))
        cls._model.add(Dense(2))
        cls._model.compile(loss=loss, optimizer="adam", metrics=metrics)
        
    @classmethod
    def preprocessing(cls, data: DataFrame,look_back: int, training_len: float) -> dict:
        """Function used to preprocess the raw data. return a dataset for training and
        another for testing
        :param data: dataframe with the data
        :type data: DataFrame
        :param look_back: analysis windows size (sample size)
        :type look_back: int
        :param training_len: fraction of the data to be used on the training stage
        :type training_len: float
        :return: dictionary with the preprocessed data (training and test) in the
        following format:
        {
            "training_dataset": {"x": train_data_in_x-axis, "y": train_data_in_y-axis},
            "test_dataset": {"x": test_data_in_x-axis, "y":test_data_in_y-axis}
        }
        :rtype: dict
        """
        # convert daframe in a numpy array
        df = data.values.astype("float32")

        # normalize the dataset
        cls._scaler = MinMaxScaler(feature_range=(0, 1))
        df = cls._scaler.fit_transform(df)

        # split into train and test sets
        train_size = int(len(data) * training_len)
        train, test = df[0:train_size, :], df[train_size : len(df), :]

        # reshape into X=t and Y=t+1
        train_x, train_y = cls._convert_to_matrix(train, look_back)
        test_x, test_y = cls._convert_to_matrix(test, look_back)

        # reshape input to be [samples, time steps, features]
        train_x = reshape(train_x, (train_x.shape[0], 1, train_x.shape[1]))
        test_x = reshape(test_x, (test_x.shape[0], 1, test_x.shape[1]))

        return {
            "training_dataset": {"x":train_x, "y":train_y}, 
            "test_dataset": {"x":test_x, "y":test_y}
        }

    @classmethod
    def fit_model(cls, data: dict, epochs: int, batch_size: int, verbose=0, patience=10) -> dict:
        try:
            cls._model.fit(
                data.get("training_dataset").get("x"),
                data.get("training_dataset").get("y"),
                epochs=epochs,
                batch_size=batch_size,
                validation_data=(data.get("test_dataset").get("x"), data.get("test_dataset").get("y")),
                callbacks=[EarlyStopping(monitor="val_loss", patience=patience)],
                verbose=verbose,
                shuffle=False
            )

            train_predict = cls._model.predict(data.get("training_dataset").get("x"), verbose=verbose)
            test_predict = cls._model.predict(data.get("test_dataset").get("x"), verbose=verbose)
            
            
            # invert predictions
            training_results = {
                "prediction": cls._scaler.inverse_transform(train_predict),
                "original_data": cls._scaler.inverse_transform([data.get("training_dataset").get("y")])
            }
            
            # invert predictions
            testing_results  = {
                "prediction": cls._scaler.inverse_transform(test_predict),
                "original_data": cls._scaler.inverse_transform([data.get("test_dataset").get("y")])
            }

            # Vector that will be used to perform the next prediction
            next_input_vector = append(data.get("test_dataset").get("x")[-1].reshape(-1),test_predict[-1])
            
            Logger.log(f"Input vector + prediction {next_input_vector}")
            
            # Getting scores from model evaluation
            scores = cls._model.evaluate(
                data.get("test_dataset").get("x"), 
                data.get("test_dataset").get("y"),
                batch_size = batch_size,
                verbose=verbose
            )

            # Getting performance metrics
            training_rmse = cls._get_rsme(training_results)
            test_rmse = cls._get_rsme(testing_results)
            
            result = {
                "status": True,
                "scores": scores,
                "training_results": training_results,
                "test_results": testing_results,
                "rmse": {"training": training_rmse,"test": test_rmse},
                "next_input_vector": next_input_vector[1:]
            }
            return result

        except Exception as e:
            result = {"status": False, "message": e}
            return result
        
    
    @classmethod
    def get_models(cls) ->dict:
        return {"model": cls._model,"scaler": cls._scaler}
    
    @classmethod
    def _get_rsme(cls, data: dict) -> dict:
        original_data = data.get("original_data")
        prediction = data.get("prediction")
        return sqrt(mean_squared_error(original_data[0], prediction[:,0]))
    
    @staticmethod
    def _convert_to_matrix(dataset, look_back=1):
        data_x, data_y = [], []
        for i in range(len(dataset)-look_back-1):
            a = dataset[i:(i+look_back), 0]
            data_x.append(a)
            data_y.append(dataset[i + look_back, 0])
        return array(data_x), array(data_y)
    
    
    @classmethod
    def search_grid(cls, data: DataFrame) -> dict:

        training_size = 0.7
        epochs = 100
        batch_size_array = [16, 32]
        look_back_array = arange(7,31, 7)
        units_array = arange(80, 101, 10)

        # TODO Improve performance metrics
        Logger.log("Searching the best parameters ...")

        scores = []
        parameters = {}
        iteration = 0

        for look_back in look_back_array:
            for units in units_array:
                for batch_size in batch_size_array:
                    
                    Logger.log("* Setting neuronal network")
                    ForecastingTrainer.setup_lstm_neuronal_network(units, look_back)

                    Logger.log("* Preprocesing data")
                    training_data = ForecastingTrainer.preprocessing(data, look_back, training_size)

                    Logger.log("* Performing training process")
                    results = ForecastingTrainer.fit_model(training_data, epochs, batch_size)
                    
                    scores.append(results.get("scores")[1])
                    parameters[iteration] = {
                        "look_back": look_back,
                        "units": units,
                        "batch_size": batch_size,
                        "training_size": training_size
                    }
                    Logger.log(f"i: {iteration}, parameters: {parameters.get(iteration)}")
                    Logger.log(f"MSE: {results.get('scores')[1]}")
                    Logger.log(f"RMSE: {results.get('rmse')}")
                    iteration += 1
        
        best_parameters = parameters.get(scores.index(min(scores)))
        Logger.log(f"Best parameters {best_parameters}")
        
        return best_parameters
        