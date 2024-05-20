const mongoose = require('mongoose');

const connectMDB = async () => {
    mongoose.connect('mongodb+srv://SigdelRoyal:Pioneer123@cluster0.wviijxw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log( 'Connected to MongoDB' ))
    .catch(err => console.error( 'Could not connect to MongoDB' , err));
};

module.exports = connectMDB;