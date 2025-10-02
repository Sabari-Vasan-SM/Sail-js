/**
 * TodoController
 *
 * @description :: Server-side actions for handling todo requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  // Get all todos
  findAll: async function (req, res) {
    try {
      const todos = await Todo.find();
      return res.json(todos);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Create a new todo
  createTodo: async function (req, res) {
    try {
      const { title } = req.body;
      if (!title) {
        return res.badRequest({ error: "Title is required" });
      }
      const todo = await Todo.create({ title }).fetch();
      return res.json(todo);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Mark todo as done
  markDone: async function (req, res) {
    try {
      const id = req.param('id');
      const todo = await Todo.updateOne({ id }).set({ isDone: true });
      if (!todo) {
        return res.notFound({ error: "Todo not found" });
      }
      return res.json(todo);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Delete a todo
  deleteTodo: async function (req, res) {
    try {
      const id = req.param('id');
      const deleted = await Todo.destroyOne({ id });
      if (!deleted) {
        return res.notFound({ error: "Todo not found" });
      }
      return res.json({ message: "Todo deleted successfully" });
    } catch (err) {
      return res.serverError(err);
    }
  }

};
