from dotenv import load_dotenv
from os import getcwd, getenv
from os.path import join, dirname
from utils.settings_yaml import load_settings
from json import loads

# Loading .env enviroment variables
load_dotenv(join(dirname(getcwd()), ".env"))


# Logger configuration
LOGGING_SETTINGS = load_settings("config")


# ::::::...... APIREST configurations ......::::::
APIREST_HOST = getenv("ANALYTICS_HOST_NAME")
APIREST_PORT = getenv("ANALYTICS_HOST_PORT")
BACKEND_PORT = getenv("BACKEND_HOST_PORT")


# ALLOWED_ORIGINS = {
#     f"http://{APIREST_HOST}",
#     f"http://{BACKEND_PORT}:8080"
#     f"http://{APIREST_HOST}:5000",
# }


APIREST_CONFIGURATIONS = {
    "allow_origins": ["*"],
    "allow_credentials": True,
    "allow_methods": ["*"],
    "allow_headers": ["*"]
}


# ::::::....... Firebase storage service connection configs ......::::::
FIREBASE_CONFIGS = {
    "interperia": {
        "access_keys": loads(getenv("FIREBASE_ACCESS_KEYS")),
        "bucket_name": "interperia-test.appspot.com",
        "saving_folder": "training_models"
        }
}

MANAGERS = {
    "TimeForecastingManager": "modules.forecasting.manager"
}