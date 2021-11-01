module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('review', {
      
        comment: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },

        date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: new Date()
        },

        owner: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        
        
    })
    return Review;
}