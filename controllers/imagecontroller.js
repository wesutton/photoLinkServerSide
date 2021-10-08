let express = require('express');
const Image = require('../db').import('../models/image')
let router = express.Router();
let validateSession = require('../middleware/validate-session');

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
        owner: req.user.id
    }
    Image.create(imagePost)
    .then(image => res.status(200).json(image))
    .catch(err => res.status(500).json({ error: err}))
});

router.get("/", (req,res) => {
    Image.findAll()
    .then(images => res.status(200).json(images))
    .catch(err => res.status(500).json({error: err}))
});

router.get("/myposts", validateSession, (req,res) => {
    let userid = req.user.id
    Image.findAll({
        where: {owner: userid}
    })
    .then(images => res.status(200).json(images))
    .catch(err => res.status(500).json({error: err}))
});

router.put('/update/:entryId', validateSession, function(req, res) {
    const updateImagePost = {
        title: req.body.image.title,
        imageUrl: req.body.image.imageUrl,
        owner: req.user.id

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