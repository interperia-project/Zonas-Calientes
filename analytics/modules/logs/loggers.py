from logging.config import dictConfig
from logging import getLogger, INFO
from config.settings import LOGGING_SETTINGS
import json

class Logger:
    """Use this class to log message according with the priority lelve
    """
    _logger = None

    @classmethod
    def setup_logger(cls, log_name: str = "general_logger"):
        dictConfig(LOGGING_SETTINGS)
        cls._logger = getLogger(log_name)

    @classmethod
    def _parse_msg(cls, msg):
        if isinstance(msg, dict):
            return json.dumps(msg, indent=4)
        return msg
    
    @classmethod
    def log(cls, msg, level: int = INFO):
        msg = cls._parse_msg(msg)
        cls._logger.log(level, msg)
        
    @classmethod
    def debug(cls, msg):
        msg = cls._parse_msg(msg)
        cls._logger.debug(msg)
        
    @classmethod
    def info(cls, msg):
        msg = cls._parse_msg(msg)
        cls._logger.info(msg)
        
    @classmethod
    def warning(cls, msg):
        msg = cls._parse_msg(msg)
        cls._logger.warning(msg)
        
    @classmethod
    def error(cls, msg):
        msg = cls._parse_msg(msg)
        cls._logger.error(msg)
        
    @classmethod
    def critical(cls, msg):
        msg = cls._parse_msg(msg)
        cls._logger.critical(msg)
