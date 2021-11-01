let express = require('express');
const  Info = require('../db').import('../models/userinfo')
let router = express.Router();
let validateSession = require('../middleware/validate-session');

router.post('/post', validateSession, (req, res) => {
    const InfoPost = {
        name: req.body.info.name,
        about: req.body.info.about,
        links: req.body.info.links,
        owner: req.user.id,
        userId: req.user.id
    }
    Info.create(InfoPost)
    .then(image => res.status(200).json(image))
    .catch(err => res.status(500).json({ error: err}))
});

module.exports = router;

router.get("/", (req,res) => {
    Info.findAll()
    .then(infoPosts => res.status(200).json(infoPosts))
    .catch(err => res.status(500).json({error: err}))
});

router.get("/getmyinfo", validateSession, function(req, res){
    const query = {
     where: {
         userId: req.user.id
    },  
     include: "user",
    };
  
    Info.findAll(query)
      .then((infoPosts)=> res.status(200).json(infoPosts))
      .catch((err) => res.status(500).json({error: err}));
  });

router.get("/mybio", validateSession, (req,res) => {
    let userid = req.user.id
    Info.findAll({
        where: {owner: userid}
    })
    .then(infoPosts => res.status(200).json(infoPosts))
    .catch(err => res.status(500).json({error: err}))
});

router.put('/update/:entryId', validateSession, function(req, res) {
    const updateMyInfo = {
        name: req.body.info.name,
        about: req.body.info.about,
        links: req.body.info.links,
        owner: req.user.id,
        userId: req.user.id

    };

    const query = { where: {id: req.params.entryId, owner: req.user.id}};

    Info.update(updateMyInfo, query)
    .then(infoPosts => res.status(200).json(infoPosts))
    .catch(err => res.status(500).json({error: err}))
});

router.delete("/delete/:id", validateSession, function(req, res) {
    const query = { where: {id: req.params.id, owner: req.user.id}};

    Info.destroy(query)
    .then(() => res.status(200).json({ message: "User Info Deleted"}))
    .catch((err) => res.status(500).json({ error: err}));
})

module.exports = router;