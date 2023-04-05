const express = require('express')
const cors = require('cors')

const pool = require('./db')

const app = express()

app.use(cors());

app.use(express.json())

app.post('/todos', async (req, res) => {
    try {

        const { description } = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description])
        res.json(newTodo.rows)

    } catch (error) {
        console.log(error);
    }
})

app.get('/todos', async (req, res) => {
    try {

        const allTodo = await pool.query("SELECT * from todo")
        res.json(allTodo.rows)

    } catch (error) {
        console.log(error);
    }
})

app.get('/todos/:id', async (req, res) => {
    try {

        const { id } = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id])
        res.json(todo.rows)

    } catch (error) {
        console.log(error);
    }
})

app.put('/todos/:id', async (req, res) => {
    try {

        const { id } = req.params
        const { description } = req.body
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [description, id])
        res.json("todo updated")

    } catch (error) {
        console.log(error);
    }
})

app.delete('/todos/:id', async (req, res) => {
    try {

        const { id } = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id])
        res.json("todo deleted")

    } catch (error) {
        console.log(error);
    }
})

app.listen(5000, () => {
    console.log(`server is running`);
})