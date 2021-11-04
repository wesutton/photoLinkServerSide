module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cloudinary_id: {
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