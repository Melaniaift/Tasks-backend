// data validation language
const Joi = require('joi');

//library for mongodb management
const mongoose = require('mongoose');

// building the web server
const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

const allowedStatuses = ['new', 'progress', 'testing', 'done'];

// connection to the db
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
        enum: ['new', 'progress', 'testing', 'done'],
        lowercase: true,
        default: 'new',
        required: true
    },
    description: {
        type: String
    }
});

const Task = mongoose.model('Task', taskSchema)

// getting all tasks
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
})

// getting a task
app.get('/api/tasks/:id', async (req, res) => {
    const task = await Task.find({ _id: req.params.id });

    if (!task) {
        return res.status(404).send('The task with the given ID was not found')
    }
    res.send(task)
})

// create a task
app.post('/api/tasks', async (req, res) => {

    const { error } = validateTask(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const task = new Task({
        name: req.body.name,
        description: req.body.description
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

    res.send(task);
})

// update a task name and description
app.put('/api/tasks/:id', async (req, res) => {
    const { error } = validateTask(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const task = await Task.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            description: req.body.description
        }
    }, { new: true });
    res.send(task);
});

// update a task status
app.put('/api/tasks/:id/status', async (req, res) => {
    const { error } = validateStatus(req.body.status);

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const task = await Task.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            status: req.body.status
        }
    }, { new: true });
    res.send(task);
});

// delete task
// return null if the id is not found
app.delete('/api/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.send(task);
})

// validating task name and status
function validateTask(task) {
    let schema = Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3)
    })

    return schema.validate(task);
}

function validateStatus(taskStatus) {
    let status = Joi.string().valid(...allowedStatuses).required();
    return status.validate(taskStatus);
}

// listen on a port, default is 3000 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));