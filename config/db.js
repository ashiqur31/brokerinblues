require('dotenv');
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
}, err => {
    if(err) throw err;
    console.log("Mongo Connected");
})