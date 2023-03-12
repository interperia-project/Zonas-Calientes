FROM python:3.10.4

# Creating working directory
WORKDIR /analytics

# Setting python dependencies
COPY Pipfile* ./
RUN pip install pipenv -qq
RUN pipenv install --system --deploy --ignore-pipfile

#COPY all codes on image
COPY . .

CMD ["python", "main.py"]