const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: "./.env" })


const app = express()
const port = process.env.PORT

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // New

// Parse application/json
app.use(express.json()); // New

// MySQL Code goes here

// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`))

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})
// http://localhost/phpmyadmin


// Get all beers
app.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('Connected as ID: ' + connection.threadId)
        connection.query("SELECT * from beers", (err, rows) => {
            connection.release() // return the connection to pool

            // return rows or err
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log('Status: \n', rows)
        })
    })
})

// Get a beer
app.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query('SELECT * FROM beers WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log('Status: \n', rows)
        })
    })
});

// Delete a beer
app.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query('DELETE FROM beers WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`Beer with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }

            console.log('Status: \n', rows)
        })
    })
});

// Add beer
app.post('/', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err

        const params = req.body
        connection.query('INSERT INTO beers SET ?', params, (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`Beer has been added.`)
            } else {
                console.log(err)
            }

            console.log('Beer has been added. Status: \n', rows)

        })
    })
})

// Update a record / beer
app.put('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        // const params = req.body

        const { id, name, tagline, description, image } = req.body

        connection.query('UPDATE beers SET name = ?, tagline = ?, description = ?, image = ? WHERE id = ?', [name, tagline, description, image, id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Database updated!`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
});