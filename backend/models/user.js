const Getdb=require('../untils/database').getDb;
const mongodb=require('mongodb');

class User{
    constructor(name,email,password,cart){
        this.name=name;
        this.email=email;
        this.password=password;
        // console.log('cart.',cart)
        this.cart=cart;
    }


    signup(){
    
        const db=Getdb();
        return db
        .collection('users')
        .insertOne(this)
        .then(user=>{
            return user;
        })
    }
    static login(email){
        const db=Getdb();
        console.log('em.',email)
        return db.collection('users').findOne({email:email})
        // .then(user=>{
        //     // console.log(user);
        //     // return user;
        // // })
    }
    static fetchcart=()=>{
        const db=Getdb();
        // return db.collection('users')
    }
    static findbyid(id){
        const db=Getdb();
        console.log(id);
        return db.collection('users').findOne({_id:new mongodb.ObjectId(id)})
        .then(user=>{
            return user;
        })
    }
    addcart(userid,productid){
        const id=productid.trim();
        const cartindex=this.cart.items.findIndex(cp=>{
            return cp.productid.toString()===productid.toString();
        })
        
       let newquantity=1, updatecart=[...this.cart.items];

        if(cartindex>=0){
            newquantity=this.cart.items[cartindex].newquantity+1;
            updatecart[cartindex].newquantity=newquantity
        }else{
            updatecart.push({
            productid:new mongodb.ObjectId(productid),
            newquantity:newquantity,
        })
        }
        // let newquantity=1;
        updatecart={items:updatecart};

        const db=Getdb();
        return db.collection('users').updateOne(
            {_id:new mongodb.ObjectId(userid)},
            {$set:{cart:updatecart}},
        );
    }

    Cart(){
        console.log('get-cart',this.cart);
    const db=Getdb();
    const productid=this.cart.items.map(product=>{
         return product.productid;
     })   
     console.log('prod.',productid);
     return db.collection('products')
     .find({_id:{$in:productid}})
     .toArray()
     .then((products)=>{
         return products.map(product=>{
             return {...product,
            quantity:this.cart.items.find(cart=>{
                 return cart.productid.toString()===product._id.toString();
             }).newquantity}
         })
     })
    }

    deletecart(productid,id){
        const db=Getdb();
        const updateitems=this.cart.items.filter(item=>{
            return item.productid.toString() !==new mongodb.ObjectId(productid).toString();
        })
        console.log(updateitems)
        return db.collection('users')
        .updateOne(
            {_id:new mongodb.ObjectId(id)},
            {$set:{cart:{items:updateitems}}}
        )
        .then(update=>{
            return update.acknowledged;
        })
    }
    addorder(id){
        const db=Getdb();
        return this.Cart()
        .then(items=>{
            console.log(items)
        const data={
            userid:new mongodb.ObjectId(id),
            products:items,
            name:this.name,
        }
        return db.collection('orders')
        .insertOne(data)
        .then(()=>{
            console.log('upd',id);
            this.cart={items:[]}
            return db.collection('users')
            .updateOne(
                {_id:new mongodb.ObjectId(id)},
                {$set:{cart:{items:[]}}}
            ) 
            .then(update=>{
                return update.acknowledged
            })
        })
        })
    }
    static getorder(id){
        console.log('id',id);
        const db=Getdb();
        let userid=id.trim();
        userid=new mongodb.ObjectId(userid);
        console.log(userid)
        return db.collection('orders')
        .find({userid:userid})
        .toArray();
    }

};
module.exports=User;