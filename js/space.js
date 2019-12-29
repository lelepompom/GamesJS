var gameWidth;
var gameHeight;
var gameScoreEl;
var ovniEl;
var ovniStep;
var ovniIntervalID;
var missileEl;
var missileStep;
var missileShootIntervalID;

function launchOvni() {
    var ovniLeft = parseInt(ovniEl.style.left);
    if ((ovniLeft + ovniStep) > (gameWidth - parseInt(ovniEl.style.width)) || ovniLeft < 0) {
        ovniStep = - ovniStep;
    }
    ovniLeft += ovniStep;
    ovniEl.style.left = `${ovniLeft}px`;
}

function moveMissile(event) {
    var leftPosition;
    switch (event.key) {
        case 'ArrowRight':
            leftPosition = parseInt(missileEl.style.left) + missileStep;
            missileEl.style.left = leftPosition < gameWidth ? `${leftPosition}px` : `${gameWidth}px`;
        break;
        case 'ArrowLeft':            
            leftPosition = parseInt(missileEl.style.left) - missileStep;
            missileEl.style.left = leftPosition > 0 ? `${leftPosition}px` : `${0}px`;
        break;
        default:
            if (parseInt(missileEl.style.bottom) <= 10) {
                missileShootIntervalID = setInterval(shootMissile, 10);
            }
        break;
    }
}
        
function shootMissile() {
    var missileBottom = parseInt(missileEl.style.bottom) + missileStep;
    missileEl.style.bottom = `${missileBottom}px`;
    if (missileBottom > gameHeight) {
        gameScoreEl.innerHTML = parseInt(gameScoreEl.innerHTML) - 50;
        resetMissile();
    }
    if (hasCrashed()){
        gameScoreEl.innerHTML = parseInt(gameScoreEl.innerHTML) + 100;
        clearInterval(ovniIntervalID);
        ovniEl.src = ovniEl.src.replace('ovni', 'crash');
        resetOvni();
        resetMissile();
    }
}

function resetOvni() {
    setTimeout(() => { 
        ovniEl.src = ovniEl.src.replace('crash', 'ovni');
        ovniIntervalID = setInterval(launchOvni, 10);
    }, 500);
}

function resetMissile() {
    clearInterval(missileShootIntervalID);
    missileEl.style.bottom = `${10}px`;
    initMissileMovementEvent();
}

function hasCrashed() {
    var missileTop = parseInt(missileEl.style.bottom) + parseInt(missileEl.style.height);
    var missileLeft = parseInt(missileEl.style.left);
    var missileRight = parseInt(missileEl.style.left) + parseInt(missileEl.style.width);
    var ovniBottom = parseInt(gameHeight) - parseInt(ovniEl.style.top) - parseInt(ovniEl.style.height);
    var ovniLeft = parseInt(ovniEl.style.left);
    var ovniRight = parseInt(ovniEl.style.left) + parseInt(ovniEl.style.width);

    if (missileTop > ovniBottom && ((missileRight > ovniLeft && missileRight < ovniRight) || (missileLeft > ovniLeft && missileLeft < ovniRight))) {
        return true;
    } else {
        return false;
    }
}

function isMobile() {
    return window.innerWidth < 768 ? true : false;
}

function initMissileMovementEvent() {
    if (isMobile()) {
        document.ontouchstart = moveMissile;
    } else {
        document.onkeydown = moveMissile;
    }
}

function setUpGame() {
    gameWidth = $('.tab-pane')[0].offsetWidth;
    gameHeight = $('.tab-pane')[0].offsetHeight;
    gameScoreEl = $('#score')[0];
    gameScoreEl.innerHTML = 0;
}

function setUpOvni() {
    ovniEl = document.getElementById('ovni');
    ovniStep = 3;
    if (ovniIntervalID) {
        clearInterval(ovniIntervalID);
    }
    ovniIntervalID = setInterval(launchOvni, 10);
}

function setUpMissile() {    
    missileEl = document.getElementById('missile');
    missileStep = 10;
    initMissileMovementEvent();
}

$().ready(() => {
    setUpGame();
    setUpOvni();
    setUpMissile();
});
