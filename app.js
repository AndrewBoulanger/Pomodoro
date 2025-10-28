'use strict';

let timer = 25 * 60 * 1000;
let paused = true;
let taskmode = true;

let timerfunctionId;
let OnClickListener;

const pauser = document.getElementById("pauser");
const resetter = document.getElementById("resetter");

const modeLabel = document.getElementById("mode")
const timeLabel = document.getElementById("timer");

const inputView = document.getElementById("inputView");
const timerCompleteView = document.getElementById("timerDoneView");

const alarm = document.querySelector('audio');
const mainText = document.querySelector('.mainText');

addEventListener("load", (event) => {
    timer = document.getElementById("taskTime").value * 60 * 1000;
    timeLabel.textContent = formatTimerText(timer);
})

pauser?.addEventListener('click', function(){
    if(paused)
        StartTimer();
    else
        StopTimer();
})

resetter?.addEventListener('click', function(){

    StopTimer();
    taskmode = true;
    ResetTimer();
})

function OnTimeOverClick(){

    taskmode = !taskmode;
    ResetTimer();
    StartTimer();
    removeEventListener('click', OnTimeOverClick);
    inputView.className = "visible";
    timerCompleteView.className = "invisible"
    alarm.pause();
    mainText.className = 'mainText';
}

//function for formating timer text
function formatTimerText (time)
{
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);

    return hours + ":" + OptionalZero(minutes) + ":" + OptionalZero(seconds);
}

function OptionalZero(time)
{
    return time < 10 ? "0" + time : time.toString();
}

function TimerFunction(){
    timer -= 1000;
    timeLabel.textContent = formatTimerText(timer);

    if(timer <= 0)
    {
        StopTimer();

        inputView.className = "invisible";
        timerCompleteView.className = "visible"
        OnClickListener = addEventListener('click', OnTimeOverClick);
        alarm.play();
        mainText.className = 'mainTextBlinking';
    }
}

function StopTimer()
{
    paused = true;
    pauser.textContent = "Play"
    clearInterval(timerfunctionId);
}

function StartTimer()
{
    paused = false;
    pauser.textContent = "Pause"
    timerfunctionId = setInterval(TimerFunction, 1000);
}

function ResetTimer()
{
    let timerToGet = taskmode ? "taskTime" : "breakTime";
    timer = document.getElementById(timerToGet).value * 60 * 1000
    modeLabel.textContent = taskmode ? "Task time left:" : "Break time left";
    timeLabel.textContent = formatTimerText(timer);
}