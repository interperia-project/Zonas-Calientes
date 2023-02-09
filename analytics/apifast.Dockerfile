FROM python:3.10

## Creating working directory
WORKDIR /analytics

#COPY . /python_codes
COPY *.py *.py
COPY requirements.txt requirements.txt
## Install dependencies
RUN pip install -r requirements.txt

#COPY all codes on image
COPY . .

CMD ["python", "main.py"]