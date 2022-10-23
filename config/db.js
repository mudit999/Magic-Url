const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`MongoDb connected: ${conn.connection.host}`);
    }catch(err){
        console.error(`Error: ${err.message}`);
    }
}

module.exports = connectDb;