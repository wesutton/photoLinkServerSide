const User = require("./user");
const Image = require("./image");
const UserInfo = require('./userinfo');
const Review = require('./review')

User.hasMany(Image);
Image.belongsTo(User);

User.hasOne(UserInfo);
UserInfo.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Image.hasMany(Review);
Review.belongsTo(Image);

module.exports = {
    User,
    Image,
    UserInfo,
    Review
};