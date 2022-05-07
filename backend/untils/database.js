const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;
let db;
const MongoConnect=(callback)=>{
    MongoClient.connect('mongodb://localhost:27017/Ecomerce',{
        useNewurlParser: true,

        // useCreateIndex: true,

        // useUnifiedTopology: true,

        // useFindAndModify: true
    })
    .then((client)=>{
        db=client.db();
    }).catch((error)=>{
        throw new Error(error);
    });
};
const getDb=()=>{
    if(db){
        return db
    }
    throw new Error('no database found')
}
exports.MongoConnect=MongoConnect;
exports.getDb=getDb;