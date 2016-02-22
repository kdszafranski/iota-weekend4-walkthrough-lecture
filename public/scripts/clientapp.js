$(document).ready(function() {

    // submit form listener
    $('#task-submit').on('click', storeTask);

    // complete task listener
    $('#task-container').on('click', '.complete-button', completeTask);

    $('#task-container').on('click', '.delete-button', deleteTask);

    loadTasks();

});

function loadTasks() {
    console.log('here');
    $.get('/task', function(data) {
        console.log(data);
        data.forEach(function(task) {
            appendTask(task);
        });
    });
}

function completeTask() {
    $el = $(this).parent();
    var id = $el.data('id');
    console.log(id);

    $.ajax({
       type: 'PUT',
        url: '/task/' + id,
        success: function(data) {
            $el.toggleClass('incomplete');
            $el.toggleClass('complete');
            $el.find('.complete-button').remove();


            console.log('from server put route: ', data);
        }
    });

}

function deleteTask() {
    $el = $(this).parent();
    var id = $el.data('id');
    console.log(id);

    $.ajax({
        type: 'DELETE',
        url: '/task/' + id,
        success: function(data) {
            $el.remove();
        }
    });
}

function appendTask(task) {
    $('#task-container').append('<div class="task-listing"></div>');
    $el = $('#task-container').children().last();
    $el.data('id',  task.id);
    $el.append('<h2>' + task.task_content + '</h2>');

    if(task.completed_date) {
        $el.toggleClass('complete');
    } else {
        $el.toggleClass('incomplete');
        $el.append('<button class="complete-button">Complete</button>');
    }

    $el.append('<button class="delete-button">Delete</button>');
}

function storeTask() {
    event.preventDefault();
    var task = {
        task_content: $('#task-content').val()
    };

    $.post('/task', task, function(data) {
        console.log('from server: ', data);
        appendTask(data);
        $('#task-content').val('');
    });

}
