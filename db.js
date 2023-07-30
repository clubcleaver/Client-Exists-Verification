require('dotenv').config()
const {Sequelize, DataTypes} = require('sequelize')

// Connection
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const sequelize = new Sequelize(process.env.DB_URL)



// SCHEMA
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const Client = sequelize.define('Client', {
    clientId: DataTypes.UUID,
    firstName: DataTypes.STRING,
    dob: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    download: DataTypes.BLOB('long')
});

const User = sequelize.define('User', {
    userId: DataTypes.UUID,
    username: DataTypes.STRING,
    password: DataTypes.STRING
})

// connection to Database
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const dbConnect = async () => {
    await sequelize.authenticate()
    .then(() => {
        console.log('Connected to Database')

    })
    .catch((e) => {
        console.log('Could Not Connect to Database', e)
    })
}

module.exports = {
    Client,
    User,
    sequelize,
    dbConnect
}