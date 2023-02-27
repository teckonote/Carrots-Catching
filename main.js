// start: 소리 재생, 요소들 배치, 타이머 재생, pause를 보이게 하기, start버튼 감추기
//sound
const bgSound = document.querySelector('.bg');
makeAudioContext(bgSound);
const carrotSound = document.querySelector('.carrot-pull');
makeAudioContext(carrotSound);
const bugSound = document.querySelector('.bug-pull');
makeAudioContext(bugSound);
const windSound = document.querySelector('.game-win');
makeAudioContext(windSound);

const start = document.querySelector('.playBtn');
const pause = document.querySelector('.pauseBtn');
let time = 120 - 1;
const timerElement = document.querySelector('.timer');
let timer;

const bugs = document.querySelectorAll('.bug');
const carrots = document.querySelectorAll('.carrot');
const contents = document.querySelector('.contents');
const background = document.querySelector('.background');
let clickedBug = false;
const score = document.querySelector('.score');
let carrotCount = bugs.length;
score.textContent = `${carrotCount}`

start.addEventListener('click', () => {
    bgSound.play();
    contents.classList.add('start');
    timer = setInterval(timerCount, 1000);
    start.classList.remove('active');
    pause.classList.add('active');
    //randomly place 
    const contentsHeight = background.offsetHeight - contents.getBoundingClientRect().y;
    bugs.forEach(e => {
        const randomTop = getRandomNumber(0, contentsHeight);
        const randomLeft = getRandomNumber(0, background.offsetWidth);
        e.style.top = `${randomTop}px`;
        e.style.left = `${randomLeft}px`;
    })
    carrots.forEach(e => {
        const randomTop = getRandomNumber(0, contentsHeight);
        const randomLeft = getRandomNumber(0, background.offsetWidth);
        e.style.top = `${randomTop}px`;
        e.style.left = `${randomLeft}px`;
    })
    //pull
    contents.addEventListener('click', event => {
        if (timePause) return;
        if (clickedBug) return;
        const target = event.target.parentElement;
        if (target.className === 'bug') {
            target.classList.add('invisible');
            bugSound.play();
            showReplyContainer();
            pause.classList.remove('active');
            clearInterval(timer);
            clickedBug = true;
        } else if (target.className === "carrot") {
            target.classList.add('invisible');
            score.textContent = `${--carrotCount}`
            carrotSound.play();
            if (carrotCount === 0) {
                windSound.play();
                pause.classList.remove('active');
                clearInterval(timer);
                showReplyContainer();
            }
        }
})
})


//pause
let cnt = 0;
const reply = document.querySelector('.reply');
let timePause = false;
pause.addEventListener('click', () => {
    if (clickedBug) return;
    if (cnt == 0) {
        showReplyContainer();
        cnt++;
        timePause = true;
    } else {
        cnt = 0;
        reply.classList.remove('open');
        bgSound.play();
        timePause = false;
    }
})

//reply button
document.querySelector(".reply__btn").onclick = function() {
    contents.classList.remove('start');
    bugs.forEach(bug => {
        bug.classList.remove('invisible');
    });
    carrots.forEach(carrot => {
        carrot.classList.remove('invisible');
    });
    time = 120 - 1;
    timerElement.innerHTML = "2:00";
    pause.classList.remove('active');
    start.classList.add('active');
    reply.classList.remove('open');
    clearInterval(timer);
    timePause = false;
    clickedBug = false;
    carrotCount = 5;
    cnt = 0;
    score.textContent = '5'
};


//show reply container
function showReplyContainer() {
    bgSound.pause();
    reply.classList.add('open');
}

function makeAudioContext(Element) {
    const audioContext = new AudioContext();
    const Track = audioContext.createMediaElementSource(Element);
    Track.connect(audioContext.destination);
}

function timerCount() {
    if (timePause) return;
    const min = parseInt(time/60);
    const sec = time%60;
    time--;
    if (0 <= sec && sec <= 9) {
        timerElement.innerHTML = `${min}:0${sec}`;
    } else {
        timerElement.innerHTML = `${min}:${sec}`;
    }
    if (time < 0) {
        timer.innerHTML = '시간 초과';
        clearInterval(timer);
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
