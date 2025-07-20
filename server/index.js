const express = require("express");
const pool = require("./db");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json()); // allows to access req.body

// GET all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// GET a single todo by ID
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// CREATE a new todo
app.post("/todos", async (req, res) => {
  try {
    const { text, completed, priority, due_date } = req.body;
    // res.json(req.body);

    const newTodo = await pool.query(
      `INSERT INTO todos (text, completed, priority, due_date) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [text, completed ?? false, priority, due_date]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// UPDATE a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed, priority, due_date } = req.body;
    // res.json(req.body);
    await pool.query(
      `UPDATE todos 
       SET text = $1, completed = $2, priority = $3, due_date = $4 
       WHERE id = $5`,
      [text, completed, priority, due_date, id]
    );
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
