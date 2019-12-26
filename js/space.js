var gameWidth;
var gameHeight;
var missileEl;
var ovniEl;
var missileStep = 10;
var ovniStep = 3;
var score = 0;
var ovniIntervalID;
var shootIntervalID;

function moveOvni() {
    ovniEl = document.getElementById('ovni');
    if (!ovniEl) {
        clearInterval(ovniIntervalID);
    }
    var ovniPosition = parseInt(ovniEl.style.left);
    if ((ovniPosition + ovniStep) > (gameWidth - parseInt(ovniEl.style.width)) || ovniPosition < 0) {
        ovniStep = - ovniStep;
    }
    ovniPosition = ovniPosition + ovniStep;
    ovniEl.style.left = `${ovniPosition}px`;
}

function moveMissile(key) {
    missileEl = document.getElementById('missile');
    var leftPosition;
    switch (key.key) {
        case 'ArrowRight':
            leftPosition = parseInt(missileEl.style.left) + missileStep;
            missileEl.style.left = leftPosition < gameWidth ? `${leftPosition}px` : `${gameWidth}px`;
        break;
        case 'ArrowLeft':            
            leftPosition = parseInt(missileEl.style.left) - missileStep;
            missileEl.style.left = leftPosition > 0 ? `${leftPosition}px` : `${0}px`;
        break;
        default:
            shootIntervalID = setInterval(shoot, 10);
        break;
    }
}

function shoot() {
    var bottomPosition = parseInt(missileEl.style.bottom) + 10;
    missileEl.style.bottom = `${bottomPosition}px`;
    if (bottomPosition > gameHeight) {
        resetMissile();
    }
    if (hasCrashed()){
        score += 100;
        document.getElementById('score').innerHTML = score;
        resetMissile();
    }
}

function resetMissile() {
    clearInterval(shootIntervalID);
    missileEl.style.bottom = `${0}px`;
}

function hasCrashed() {
    var missileTop = parseInt(missileEl.style.bottom) + parseInt(missileEl.style.height);
    var missileLeft = parseInt(missileEl.style.left);
    var missileRight = parseInt(missileEl.style.left) + parseInt(missileEl.style.width);
    var ovniBottom = parseInt(gameHeight) - parseInt(ovniEl.style.top) - parseInt(ovniEl.style.height);
    var ovniLeft = parseInt(ovniEl.style.left);
    var ovniRight = parseInt(ovniEl.style.left) + parseInt(ovniEl.style.width);

    if (missileTop > ovniBottom && ((missileRight > ovniLeft && missileRight < ovniRight) || (missileLeft > ovniLeft && missileLeft > ovniRight))) {
        return true;
    } else {
        return false;
    }
}

$().ready(() => {
    gameWidth = document.querySelector('.tab-pane').offsetWidth;
    gameHeight = document.querySelector('.tab-pane').offsetHeight;
    document.onkeyup = moveMissile;
    ovniIntervalID = setInterval(moveOvni, 10);
});
