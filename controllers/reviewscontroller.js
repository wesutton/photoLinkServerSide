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
        userId: req.user.id,
        imageId: req.body.review.imageId
       
    }
    Review.create(addReview)
    .then(review => res.status(200).json(review))
    .catch(err => res.status(500).json({ error: err}))
});

router.post("/", validateSession, async (req, res, err)=> {
    const review = req.body.review;
    await Review.create(review);
    res.json(review)
    res.status(500).json({error: err})
}) 


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
     include: "image"
    };
  
    Review.findAll(query)
      .then((reviews)=> res.status(200).json(reviews))
      .catch((err) => res.status(500).json({error: err}));
  });



  router.get("/:imageId", async (req, res) => {
      const imageId = req.params.imageId;
      const reviews = await Review.findAll({where: {imageId: imageId}, include: "user"} );
      res.json(reviews);
  })

  router.get("/myreview/:id", validateSession, async (req, res) => {
    try {
        let review = await Review.findByPk(req.params.id);
        res.json(review);
    }catch (err) {
        res.status(500).json({error: err})
    }
})

router.get("/myreviews/:reviewId", async (req, res) => {
    const id = req.params.id;
    const reviews = await Review.findByPk({where: {id: id}, include: "user"} );
    res.json(reviews);
})

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