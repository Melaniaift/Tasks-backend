const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tasks')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB', err))

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'progress', 'testing', 'done'],
        lowercase: true,
        default: 'new'
    },
    description: {
        type: String
    }
});

const Task = mongoose.model('Task', taskSchema)

async function getTasks() {
    const tasks = await Task.find();
    console.log(tasks)
}

async function getTask(id) {
    const task = await Task.find({ _id: id });
    console.log(task)
}

async function createTask(taskName, taskDescription) {
    const task = new Task({
        name: taskName,
        description: taskDescription
    })

    // save the data in the db
    try {
        const result = await task.save();
        console.log(result)
    }
    catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

async function updateTask(id, taskName, taskDescription) {
    const task = await Task.findOneAndUpdate({ _id: id }, {
        $set: {
            name: taskName,
            description: taskDescription
        }
    }, { new: true });
    console.log(task)
}

async function updateTaskStatus(id, taskStatus) {
    const task = await Task.findOneAndUpdate({ _id: id }, {
        $set: {
            status: taskStatus
        }
    }, { new: true });
    console.log(task)
}

async function removeTask(id) {
    const task = await Task.findByIdAndDelete(id); // return null if the id is not found
}

