const mongoose = require ('mongoose')

mongoose.connect("mongode://mongo_db/testdb")
    .then(db => console.log('db is connected to', db.connection.hosts))
    .catch(err =>console.error(err))