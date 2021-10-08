require("dotenv").config();
let express = require('express');
let app = express();
let mypage = require('./controllers/imagecontroller');
let user = require('./controllers/usercontroller');
let myinfo = require('./controllers/userinfocontroller');
const sequelize = require('./db');

// app.use('/test', function(req, res){
//     res.send('this is a test route');
// })
sequelize.sync();

app.use(express.json());

app.use('/user', user);
app.use('/mypage', mypage);
app.use('/myinfo', myinfo);

app.listen(3000, function() {
    console.log('app is listening on 3000');
})
