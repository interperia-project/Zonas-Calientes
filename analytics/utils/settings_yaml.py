import pkgutil

import yaml


def load_settings(package, resource="logging.yaml"):
    """
    Loads a yaml configuration files and transforms values.
    :param package
    :param resource: Optional filename (default is settings.yaml)
    :return: Dictionary of configuration
    """
    try:
        settings = yaml.safe_load(pkgutil.get_data(package, resource))
    except yaml.YAMLError:  # pylint: disable=broad-except
        settings = yaml.safe_load(pkgutil.get_data(package, resource))  # pylint: disable=no-value-for-parameter
    return settings
