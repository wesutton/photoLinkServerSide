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
module.exports = sequelize;