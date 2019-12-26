$().ready(() => {
    $('.tab-pane').load('../hello-world.html');

    $('#v-pills-hello-world-tab').click(() => {
        $('.tab-pane').load('../hello-world.html');
    });

    $('#v-pills-space-tab').click(() => {
        $('.tab-pane').load('../space.html');
    });

    $('#v-pills-memory-tab').click(() => {
        $('.tab-pane').load('../memory.html');
    });

    $('#v-pills-snake-tab').click(() => {
        $('.tab-pane').load('../snake.html');
    });

    $('#v-pills-tic-tac-toe-tab').click(() => {
        $('.tab-pane').load('../tic-tac-toe.html');
    });

});