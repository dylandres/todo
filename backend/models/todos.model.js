import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    content: {type: String},
    checked: {type: Boolean},
}, {
    timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;