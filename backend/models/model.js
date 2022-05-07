const Getdb=require('../untils/database').getDb;
const mongodb=require('mongodb')
class Model{
    constructor(title,description,price){
        this.title=title;
        this.description=description;
        this.price=price;
        // this.image=image
    }
    save(){
        const db=Getdb();
       return db.collection('products')
        .insertOne(this)
        .then(result=>{
            console.log('res',result)
        })
        .catch(err=>{
            console.log(err);
        })
        ;
    }
    static fetchall(){
        const db=Getdb();
        return db.collection('products')
        .find()
        .toArray()
        .then((product)=>{
            console.log(product);
            return product;
        })
        .catch()
    }
    static fetchsingle(id){
        const db=Getdb();
        return db.collection('products')
        .find({ _id:new mongodb.ObjectId(id)})
        .next()
        .then(product=>{
            console.log(product);
            return product;
        })
    }
    updateproduct(id){
        const db=Getdb();
        return db.collection('products')
        .updateOne({_id:new mongodb.ObjectId(id)},{$set:this})     
    }
    static deleteproduct(prodid){
        const db=Getdb();
        return db.collection('products')
        .deleteOne({_id:new mongodb.ObjectId(prodid)})
        .then(delet=>{
            console.log('deleted.',delet);
        }) 
    }
}
module.exports=Model