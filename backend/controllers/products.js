var bcrypt = require('bcryptjs');
const Model=require('../models/model')
const fs=require('fs')
const User=require('../models/user');
//start the remaining 

exports.insertproduct=(req,res,next)=>{
    console.log(req.body);
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    // // const image=fs.
    let product=new Model(title,description,price);
    product.save().then(data=>{
    //     // console.log(data);
    }); 
}

exports.fetchproducts=(req,res,next)=>{
    // res.json({msg:'succesfully Fetched'});
    console.log('get-products')
    return Model
    .fetchall()
    .then(products=>{
        res.json({products:products});
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.fetchproduct=(req,res,next)=>{
    const id=req.params.id.split(":")[1];
    console.log(id);

    Model
    .fetchsingle(id)
    .then(product=>{
        res.json({product:product})
    })
}

exports.updateproduct=(req,res,next)=>{
    const id=req.params.id.split(':')[1];
    const price=req.body.price;
    const description=req.body.description;
    const title=req.body.title;
    const product=new Model(title,description,price)
    product.updateproduct(id).then(update=>{
        res.json({msg:"update succefully"})
        // if(update){
        // }
    })

}

exports.deleteproduct=(req,res,next)=>{
    const id=req.params.id.split(':')[1]
    Model.deleteproduct(id).then(delet=>{
        console.log(delet)
        res.json({msg:'succefully deleted'});
    });
}

exports.login=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    console.log(email,password);
    User.login(email).then(user=>{
        bcrypt.compare(password,user.password)
        .then(compare=>{
            if(compare){
                res.json({msg:'succefully Login',userid:user._id})
            }
        })
        console.log(user);
    })
}

exports.insertuser=(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const passowrd=req.body.password;
        bcrypt.hash(passowrd, 10).then(hash=>{
            const user=new User(name,email,hash,{items:[]});
            user.signup().then(user=>{
                res.json({msg:'succefully created',userid:user.insertedId})
                // console.log('pro.',user.insertedId)
            })
    });

}

exports.insertcart=(req,res,next)=>{
        const prodid=req.body.productid;
        const userid=req.body.userid;
        console.log(prodid,userid);
        Model.fetchsingle(prodid).then(product=>{
            return  req.user.addcart(userid,prodid); 
        })
}
exports.getcart=(req,res,next)=>{ 

    User.findbyid(req.body.userid)
        .then(user=>{
            const users=new User(user.name,user.email,user.password,user.cart);
            users.Cart().then(product=>{
                res.json({product:product.length>0 ?product :[] })
                console.log('product',product)
            });
          })
 
}

exports.deletecart=(req,res,next)=>{
    User.findbyid(req.body.userid)
    .then(user=>{
        const users=new User(user.name,user.email,user.password,user.cart);
        users.deletecart(req.body.productid,req.body.userid).then((flag)=>{
            res.json({msg:'succefully update',flag:flag})
        });
      })
}

exports.addorder=(req,res,next)=>{
    User.findbyid(req.body.userid)
    .then(user=>{
        const users=new User(user.name,user.email,user.password,user.cart);
        users.addorder(req.body.userid)
        .then(flag=>{
            res.json({msg:'Inserted Succefully',flag:flag});
        });
      })
}

exports.getorder=(req,res,next)=>{
    User.getorder(req.body.userid).then(product=>{
        res.json({msg:'Fetch Products',products:product});
    });
}