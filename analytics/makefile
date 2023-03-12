clean-project:
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +
	find . -name '*__pycache__*' -exec rm -fr {} +

uninstall-packages:
	pipenv uninstall --all

install-local:
	pip install --upgrade pip
	pip install pipenv
	pipenv install --dev
	pipenv shell

uninstall-local:
	pipenv exit
	pipenv --rm
	pip uninstall pipenv
	