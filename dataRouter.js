const express = require('express')
const router = express.Router()
const { Client, User, sequelize } = require('./db.js')


// get Data
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.get('/:id', (req, res) => {
    
    res.send({status: "success", message: "This is an API"})
})

// Create Data
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.post('/', (req, res) => {
    res.send('Create entry')
})

// Edit Data
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.patch('/', (req, res) => {
    res.send('Update entry')
})

// Delete Data
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.delete('/', (req, res) => {
    res.send('Delete entry')
})

module.exports = router