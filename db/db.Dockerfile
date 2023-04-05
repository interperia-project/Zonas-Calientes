FROM mongo

# Define working directory
WORKDIR /db

#Copy dataset in dump folder (dump folder must be located in the same path that this docker dile)
COPY ./dump /dump

#Restore the dataset define in the environmnet variable DB_NAME(docker compose) and in the host define in the environment variable DB_HOST
CMD mongorestore --host $DB_HOST  --db $DB_NAME /dump/$DB_NAME
