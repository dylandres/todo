import express from 'express';
import Todo from '../models/todos.model.js';
import mongoose from 'mongoose';

const router = express.Router();
// /todos GET
router.route('/').get((req, res) => {
    Todo.find().then(todos => res.json(todos)).catch(err => res.status(400).json('Error: ' + err));
});

// /todos POST
router.route('/').post((req, res) => {
    const content = req.body.content;
    const checked = req.body.checked;

    const newTodo = new Todo({
        content, checked
    });

    newTodo.save().then(() => res.json('Task added!')).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').patch( async(req, res) => {
    const {id} = req.params;
    const {content, checked} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('The ID is not valid');
    }
    const todo = {content, checked,_id:id};
    await Todo.findByIdAndUpdate(id, todo, {new:true})
    res.json(todo);
});

router.route('/:id').delete( async(req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('The ID is not valid');
    }
    await Todo.findByIdAndRemove(id);
    res.json({message: "To-do deleted successfully"});
});

export default router;