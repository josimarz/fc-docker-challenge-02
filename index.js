const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'admin',
    password: 'fT0gB4oO4bT3uH3y',
    database: 'fullcycle'
}

function bootstrap() {
    const connection = mysql.createConnection(config)
    connection.connect()

    const names = [
        'Roronoa Zoro',
        'Nico Robin',
        'Son Goku',
        'He-Man',
        'Ikki de Fenix'
    ]
    const values = names.map((name) => `("${name}")`).join(',')

    connection.query(`INSERT INTO people (name) values ${values}`, (error) => {
        if (error) {
            throw error
        }
    })
    connection.end()
}

function getPeople() {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config)
        connection.connect()
        
        connection.query('SELECT id, name FROM people', (error, results) => {
            if (error) {
                reject(error)
                return
            }
            resolve(results)
        })
        connection.end()
    })
}

app.get('/', async (req, res) => {
    const people = await getPeople();
    res.write('<h1>Full Cycle Rocks!</h1>');
    res.write(`
        <table>
            <thead>
                <th>id</th>
                <th>name</th>
            </thead>
            <tdoby>
    `)
    for (const person of people) {
        res.write(`
            <tr>
                <td>${person.id}</td>
                <td>${person.name}</td>
            </tr>
        `)
    }
    res.write(`
        </tbody>
        </table>
    `)
    res.end()
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

bootstrap()