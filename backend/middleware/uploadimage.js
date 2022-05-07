const multer=require('multer');
const diskstorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'image');
        console.log('hi.')
    },
    filename:(req,file,cb)=>{
        // const name=Date.now()+'-'+Math.round(Math.random()*100000);
        cb(null,file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' || file.mimetype==='image/gif'){
        cb(null,true);
    }else{
        cb(null,false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}
const upload=multer({storage:diskstorage,fileFilter:fileFilter});

module.exports=upload;