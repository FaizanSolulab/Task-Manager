const express = require('express')
const router = express.Router();

const {
    getTasks,
    createTask,
    getATask,
    deleteTask,
    editTask,
} = require('../controllers/tasks.controller');

router.route('/').get(getTasks).post(createTask)
router.route('/:id').get(getATask).patch(editTask).delete(deleteTask)

module.exports = router;