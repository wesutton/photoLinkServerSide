let express = require('express');
const Review = require('../db').import('../models/review')
let router = express.Router();
let validateSession = require('../middleware/validate-session');

router.get('/practice', validateSession, function(req, res){
    res.send('this is a practice route');
});

router.post('/post', validateSession, (req, res) => {
    const addReview = {
        comment: req.body.review.comment, 
        date: req.body.review.date,
        owner: req.user.id,
        userId: req.user.id
       
    }
    Review.create(addReview)
    .then(review => res.status(200).json(review))
    .catch(err => res.status(500).json({ error: err}))
});

router.get("/", (req,res) => {
    const query = {
        include: "user"
    }
    Review.findAll(query)
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({error: err}))
});

router.get("/myreview", validateSession, function(req, res){
    const query = {
     where: {
         userId: req.user.id
    },  
     include: "user",
    };
  
    Review.findAll(query)
      .then((reviews)=> res.status(200).json(reviews))
      .catch((err) => res.status(500).json({error: err}));
  });

router.put('/update/:entryId', validateSession, function(req, res) {
    const updateReview = {
        comment: req.body.review.comment, 
        date: req.body.review.date,
        owner: req.user.id,
        userId: req.user.id

    };

    const query = { where: {id: req.params.entryId, owner: req.user.id}};

    Review.update(updateReview, query)
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({error: err}))
})

router.delete("/delete/:id", validateSession, function(req, res) {
    const query = { where: {id: req.params.id, owner: req.user.id}};

    Review.destroy(query)
    .then(() => res.status(200).json({ message: "Review has been deleted"}))
    .catch((err) => res.status(500).json({ error: err}));
})


module.exports = router;