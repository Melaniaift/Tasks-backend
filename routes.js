// data validation language
const Joi = require('joi');

// building the web server
const express = require('express');
const app = express();

const allowedStatuses = ['new', 'progress', 'testing', 'done'];

// getting all tasks
app.get('/api/tasks', (req, res) => {
    getTasks().then((tasks) => {
        res.send(tasks)
    })
})

// getting a task
app.get('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    getTask(taskId).then(task => {
        if (!task) {
            return res.status(404).send('The task with the given ID was not found')
        }
        res.send(task)
    })
})

// create a task
app.post('/api/tasks/', (req, res) => {
    const { error } = validateTask(req.body);

    if (error) {
        return res.status(400).send(result.error.details[0].message)
    }

    const taskName = req.body.name;
    const taskDescription = req.body.description;

    const task = createTask(taskName, taskDescription);
    res.send(task);
})

// update a task name and description
app.put('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { error } = validateTask(req.body);

    if (error) {
        return res.status(400).send(result.error.details[0].message)
    }

    const taskName = req.body.name;
    const taskDescription = req.body.description;

    const task = updateTask(taskId, taskName, taskDescription);
    res.send(task);
});


// update a task status
app.put('/api/tasks/:id/status', (req, res) => {
    const taskId = req.params.id;
    const { error } = validateTask(req.body);

    if (error) {
        return res.status(400).send(result.error.details[0].message)
    }

    const taskStatus = req.body.status;
    const task = updateTaskStatus(taskId, taskStatus)
    res.send(task);
});

// delete task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    res.send(removeTask(taskId));
})

// validating task name and status
function validateTask(task) {
    let schema = Joi.object({
        name: Joi.string().min(3).required(),
        status: Joi.string().valid(...allowedStatuses).required(),
    })

    return schema.validate(task);
}

// listen on a port, default is 3000 
const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port}...`));