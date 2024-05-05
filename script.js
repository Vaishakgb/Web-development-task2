let timer;
let isRunning = false;
let startTime;
let lapTimes = [];

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("startStop").innerText = "Start";
        isRunning = false;
    } else {
        startTime = Date.now() - lapTimes.reduce((a, b) => a + b, 0);
        timer = setInterval(updateTime, 10);
        document.getElementById("startStop").innerText = "Stop";
        isRunning = true;
    }
}

function lapReset() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        lapTimes.push(lapTime);
        displayLap(lapTime);
    } else {
        clearInterval(timer);
        document.getElementById("display").innerText = "00:00:00";
        document.getElementById("startStop").innerText = "Start";
        lapTimes = [];
        document.getElementById("lapList").innerHTML = "";
    }
}

function updateTime() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("display").innerText = formattedTime;
}

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

function pad(value) {
    return value < 10 ? `0${value}` : value;
}

function displayLap(lapTime) {
    const lapList = document.getElementById("lapList");
    const lapItem = document.createElement("li");
    lapItem.innerText = formatTime(lapTime);
    lapList.prepend(lapItem);
}
