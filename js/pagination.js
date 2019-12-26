$().ready(() => {
    $('.tab-pane').load('../pages/hello-world.html');

    $('#v-pills-hello-world-tab').click(() => {
        $('.tab-pane').load('../pages/hello-world.html');
    });

    $('#v-pills-space-tab').click(() => {
        $('.tab-pane').load('../pages/space.html');
    });

    $('#v-pills-memory-tab').click(() => {
        $('.tab-pane').load('../pages/memory.html');
    });

    $('#v-pills-snake-tab').click(() => {
        $('.tab-pane').load('../pages/snake.html');
    });

    $('#v-pills-tic-tac-toe-tab').click(() => {
        $('.tab-pane').load('../pages/tic-tac-toe.html');
    });

});