require("dotenv").config();
let express = require('express');
let app = express();
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize')
let mypage = require('./controllers/imagecontroller');
let user = require('./controllers/usercontroller');
let myinfo = require('./controllers/userinfocontroller');
let reviews = require('./controllers/reviewscontroller');
require('./models/image')
require('./models/user')
require('./models/userinfo')
require('./models/review')


const sequelize = require('./db');



sequelize.sync();

app.use(require('./middleware/headers'))

app.use(express.json());

const adminBro = new AdminBro ({
    databases: [],
    rootPath: '/admin'
})

const router = AdminBroExpress.buildRouter (adminBro)
app.use(adminBro.options.rootPath, router)
app.use('/user', user);
app.use('/mypage', mypage);
app.use('/myinfo', myinfo);
app.use('/reviews', reviews);





app.listen(3000, function() {
    console.log('app is listening on 3000');
})
