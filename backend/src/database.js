const mongoose = require ('mongoose')

mongoose.connect("mongodb://mongo_db/mydatabase")
    .then(db => console.log('db is connected to: ', db.connection.hosts))
    .catch(err =>console.error(err))