var express = require('express');
var router = express.Router();
var pg = require('pg');

if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/todo-list';
}

router.post('/', function(req, res) {
    var task = {
        task_content: req.body.task_content
    };

    console.log("task: ", task);

    pg.connect(connectionString, function(err, client, done) {
        client.query("INSERT INTO tasks (task_content) VALUES ($1) RETURNING id",
            [task.task_content],
            function (err, result) {
                done();

                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    task.id = result.rows[0].id;
                    res.send(task);
                }
            });
    });
});

router.get('/', function(req, res) {
    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM tasks ORDER BY id DESC');

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // close connection
        query.on('end', function() {
            done();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

router.put('/:id', function(req, res) {
    var taskID = req.params.id;

    pg.connect(connectionString, function(err, client, done) {
        client.query("UPDATE tasks SET completed_date = now() WHERE id = $1",
            [taskID],
            function (err, result) {
                done();

                if(err) {
                    console.log("Error updating data: ", err);
                    res.send(false);
                } else {
                    res.send(true);
                }
            });
    });
});

router.delete('/:id', function(req, res) {
    var taskID = req.params.id;

    pg.connect(connectionString, function(err, client, done) {
        client.query("DELETE FROM tasks WHERE id = $1",
            [taskID],
            function (err, result) {
                done();

                if(err) {
                    console.log("Error deleting data: ", err);
                    res.send(false);
                } else {
                    res.send(true);
                }
            });
    });
});



module.exports = router;