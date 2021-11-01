const Sequelize = require('sequelize');
const sequelize = new Sequelize('redbadge-database', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connected to redbadge-database');
    },
    function(err){
        console.log(err);
    }
);

User = sequelize.import("./models/user");
Image = sequelize.import("./models/image");
UserInfo = sequelize.import('./models/userinfo');
Review = sequelize.import('./models/review')

User.hasMany(Image);
Image.belongsTo(User);

User.hasOne(UserInfo);
UserInfo.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Image.hasMany(Review);
Review.belongsTo(Image); // work in progress

module.exports = sequelize;