let express = require('express');
const Image = require('../db').import('../models/image')
const cloudinary = require('../utils/cloudinary');
const upload = require("../utils/multer");
let router = express.Router();
let validateSession = require('../middleware/validate-session');


router.post('/post', validateSession, upload.single('image'), async(req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        let image = new Image({
            name: req.body.name,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
            owner: req.user.id,
            userId: req.user.id
        });

        await image.save();
        res.json(image);

    }catch(err){
        console.log(err)
    }
})


router.get('/practice', validateSession, function(req, res){
    res.send('this is a practice route');
});


router.get("/", (req,res) => {
    const query = {
        include: "user"
    }
    Image.findAll(query)
    .then(images => res.status(200).json(images))
    .catch(err => res.status(500).json({error: err}))
});


router.get("/myposts", validateSession, function(req, res){
    const query = {
     where: {
         userId: req.user.id
    },  
     include: "user"
    };
  
    Image.findAll(query)
      .then((images)=> res.status(200).json(images))
      .catch((err) => res.status(500).json({error: err}));
  });

router.put("/edit/:id", upload.single("image"), async (req, res) => {
    try {
        let image = await Image.findByPk(req.params.id);

        await cloudinary.uploader.destroy(image.cloudinary_id);
        let result
        if(req.file){
            result = await cloudinary.uploader.upload(req.file.path);
        }
        const data = {
            name: req.body.name || image.name,
            avatar: result?.secure_url || image.avatar,
            cloudinary_id: result?.public_id || image.cloudinary_id,
        };
        image = await Image.update(data, {where: {id: req.params.id}}, {new: true});
        res.json(image);
    }catch (err) {
        console.log(err);
    }
})

router.get("/:id", validateSession, async (req, res) => {
    try {
        let image = await Image.findByPk(req.params.id);
        res.json(image);
    }catch (err) {
        res.status(500).json({error: err})
    }
})


router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
        let image = await Image.findByPk(req.params.id);
        await cloudinary.uploader.destroy(image.cloudinary_id);
        await image.destroy();
        res.json(image);
    }catch (err){
        console.log(err)
    }
})


module.exports = router;