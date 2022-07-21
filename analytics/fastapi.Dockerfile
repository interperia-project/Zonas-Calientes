FROM python:3.10.5

## Creating working directory
WORKDIR /analytics

#COPY . /python_codes
COPY *.py *.py
COPY requirements.txt requirements.txt
## Install dependencies
RUN pip install -r requirements.txt

#Exposing ports
EXPOSE 8000

#COPY all codes on image
COPY . .

CMD ["python","main_v1.py"]