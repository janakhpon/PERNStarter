const express = require("express");
const router = express.Router();
const pool = require('../../DB')


router.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


router.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});



router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});



router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET  description = $1 WHERE todo_id=$2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [
      id
    ]);
    res.json("Todo was DELETED");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
