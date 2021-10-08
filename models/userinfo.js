module.exports = (sequelize, DataTypes) => {
    const Info = sequelize.define('userinfo', {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        about: {
            type: DataTypes.STRING,
            allowNull: true
        },

        links:{
            type: DataTypes.STRING,
            allowNull: true
        },

        owner: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
        
    })
    return Info;
}