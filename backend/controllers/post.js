const express = require('express')
const router = express.Router();

const { PostsModel } = require('../models/postModel')

router.get('/', (req, res) => {
PostsModel.find((err, docs) => {
if(!err) res.send(docs)
else console.log(err)
})
});

router.post('/', (req, res) => {
const newReccord = new PostsModel({
    name: req.body.name,
    mail: req.body.mail,
    password: req.body.password
});
newReccord.save((err, docs) => {
    if(!err) res.send(docs);
    else console.log(err)

})
})

module.exports = router;
