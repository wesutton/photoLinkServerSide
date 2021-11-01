let express = require('express');
const Image = require('../db').import('../models/image')
const cloudinary = require('cloudinary');
let router = express.Router();
let validateSession = require('../middleware/validate-session');

router.get('/cloudsign', validateSession, async (req, res) => {
    try{
        const ts = Math.floor(new Date().getTime() / 1000).toString()

        const sig = cloudinary.utils.api_sign_request(
            {timestamp: ts, upload_preset: 'ubw9oywd'},
            process.env.CLOUDINARY_SECRET
        )

        res.status(200).json({
            sig, ts
        })
    }catch (err) {
        res.status(500).json({
            message: 'failed to sign'
        })
    }
})

router.get('/practice', validateSession, function(req, res){
    res.send('this is a practice route');
});

router.get('/images', function(req, res){
    res.status(200).json({
        images: [{title: 'First image'}]
    });
});

router.post('/post', validateSession, (req, res) => {
    const imagePost = {
        title: req.body.image.title,
        imageUrl: req.body.image.imageUrl,
        owner: req.user.id,
        userId: req.user.id
    }
    Image.create(imagePost)
    .then(image => res.status(200).json(image))
    .catch(err => res.status(500).json({ error: err}))
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
     include: "user",
    };
  
    Image.findAll(query)
      .then((images)=> res.status(200).json(images))
      .catch((err) => res.status(500).json({error: err}));
  });
  

router.put('/update/:entryId', validateSession, function(req, res) {
    const updateImagePost = {
        title: req.body.image.title,
        imageUrl: req.body.image.imageUrl,
        owner: req.user.id,
        userId: req.user.id

    };

    const query = { where: {id: req.params.entryId, owner: req.user.id}};

    Image.update(updateImagePost, query)
    .then(images => res.status(200).json(images))
    .catch(err => res.status(500).json({error: err}))
})

router.delete("/delete/:id", validateSession, function(req, res) {
    const query = { where: {id: req.params.id, owner: req.user.id}};

    Image.destroy(query)
    .then(() => res.status(200).json({ message: "Image Post Deleted"}))
    .catch((err) => res.status(500).json({ error: err}));
})

module.exports = router;