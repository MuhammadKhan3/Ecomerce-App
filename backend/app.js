
const express=require('express');
const cors=require('cors');
const app=express();
const Model = require('./models/model');
const MongoConnect=require('./untils/database').MongoConnect;
const routes=require('./routes/routes');
// const multer=require('multer');
const products=require('./controllers/products');
const path=require('path');
const upload = require('./middleware/uploadimage');
const User = require('./models/user');



app.use(express.urlencoded({extended:true}))
app.use(express.json())

MongoConnect(()=>{  
})
const corsOptions={
    origin: '*',
    optionsSuccessStatus: 200 ,
    methods: "GET, PUT,POST"
}
// corsOptions
app.use(cors());
app.use(express.static(path.join(__dirname,'image')));
app.use((req,res,next)=>{
    console.log(req.body.userid);
    console.log('cart.',req.body.label);

    if(req.body.label==='addcart' || req.body.label==='cart'){
        User.findbyid(req.body.userid)
        .then(user=>{
            req.user=new User(user.name,user.email,user.password,user.cart);
        })    
    }
    next();
})

app.use('/',routes)


app.listen(9000,()=>{})


