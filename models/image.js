module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
        
    })
    return Image;
}