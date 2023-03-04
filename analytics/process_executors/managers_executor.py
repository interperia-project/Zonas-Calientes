from importlib import import_module
from config.settings import MANAGERS

class Executor:
    @classmethod
    def execute_process(cls, manager_name: str, execution_parameters):
        try:
            processor_module = import_module(MANAGERS.get(manager_name))
            return getattr(processor_module,manager_name).perform_process(execution_parameters)
        except Exception as e:
            return {"status": False, "message": f"Exception Happend -> {e}"}