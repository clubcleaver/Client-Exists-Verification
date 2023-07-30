const express = require('express')
const router = express.Router()
const { Client, User, sequelize } = require('./db.js')

// Create User
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.post('/create', async (req, res) => {
    const { userName, password, name, iacID } = req.body
    // console.log(iacID.toString())
    console.log(req.body)
    // authID = iacID.trim()
    if (iacID == 'IACFutureAdminRight') {
        const createdUser = await User.create({
            username: userName.trim().toLowerCase().toString(),
            password: password.trim().toLowerCase().toString(),
        })
        .catch((e) => {
            res.send({success: false, message: 'Unable to Create User, Contact Admin'})
        })
        res.send({success: true, message: 'Created User Succesfully'})
    } else {
        res.send({success: false, message: 'IAC ID Incorrect !!!, Contact Admin'})
    }
})

router.post('/auth', (req, res) => {
    const { userName, password} = req.body
})

module.exports = router