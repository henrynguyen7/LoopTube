let markStartButton = document.getElementById('markStart');
let decrementStartButton = document.getElementById('decrementStart');
let incrementStartButton = document.getElementById('incrementStart');

let markEndButton = document.getElementById('markEnd');
let decrementEndButton = document.getElementById('decrementEnd');
let incrementEndButton = document.getElementById('incrementEnd');

let startLoopButton = document.getElementById('startLoop');
let stopLoopButton = document.getElementById('stopLoop');

let progressBar = document.getElementById('progressBar');
let startTimeLabel = document.getElementById('startTimeLabel');
let endTimeLabel = document.getElementById('endTimeLabel');

markStartButton.addEventListener('click', function() { markStart() });
decrementStartButton.addEventListener('click', function() { decrementStart() });
incrementStartButton.addEventListener('click', function() { incrementStart() });

markEndButton.addEventListener('click', function() { markEnd() });
decrementEndButton.addEventListener('click', function() { decrementEnd() });
incrementEndButton.addEventListener('click', function() { incrementEnd() });

startLoopButton.addEventListener('click', function() { startLoop() });
stopLoopButton.addEventListener('click', function() { stopLoop() });

const MILLISECONDS_PER_SECOND = 1000;
const MIN_LOOP_DURATION_IN_SECONDS = 1;
const INCREMENT = .10;

let progressTimeoutIds = [];
let loopIntervalId;
let loopStart = 0;
let loopEnd = 0;
let loopDurationInSeconds = 0;
let player;

function onYouTubeIframeAPIReady() {
  let videoId = new URLSearchParams(window.location.search).get('v');
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoId,
  });
}

function markStart() {
  loopStart = player.getCurrentTime();
  startTimeLabel.value = getDisplayTime(loopStart);
  markEndButton.disabled = false;
  decrementStartButton.disabled = false;
  incrementStartButton.disabled = false;
  startLoop();
}

function decrementStart() {
  loopStart = loopStart - INCREMENT;
  startTimeLabel.value = getDisplayTime(loopStart);
  startLoop();
}

function incrementStart() {
  loopStart = loopStart + INCREMENT;
  startTimeLabel.value = getDisplayTime(loopStart);
  startLoop();
}

function markEnd() {
  loopEnd = player.getCurrentTime();
  endTimeLabel.value = getDisplayTime(loopEnd);
  decrementEndButton.disabled = false;
  incrementEndButton.disabled = false;
  startLoop();
}

function decrementEnd() {
  loopEnd = loopEnd - INCREMENT;
  endTimeLabel.value = getDisplayTime(loopEnd);
  startLoop();
}

function incrementEnd() {
  loopEnd = loopEnd + INCREMENT;
  endTimeLabel.value = getDisplayTime(loopEnd);
  startLoop();
}

function startLoop() {
  loopDurationInSeconds = loopEnd - loopStart;
  if (loopDurationInSeconds < MIN_LOOP_DURATION_IN_SECONDS) return;
  stopLoopButton.disabled = false;
  stopLoop();
  restartLoop();
  loopIntervalId = setInterval(restartLoop, loopDurationInSeconds * MILLISECONDS_PER_SECOND);
}

function stopLoop() {
  startLoopButton.disabled = false;
  stopLoopButton.disabled = true;
  clearInterval(loopIntervalId);
  clearTimeouts(progressTimeoutIds);
  progressBar.style.width = "0%";
}

function restartLoop() {
  stopLoopButton.disabled = false;
  player.seekTo(loopStart, true);
  clearTimeouts(progressTimeoutIds)
  updateProgressBar(25);  
  let quarterNoteDuration = loopDurationInSeconds / 4;
  progressTimeoutIds.push(setTimeout(function() { updateProgressBar(50) }, quarterNoteDuration * 1 * 1000));
  progressTimeoutIds.push(setTimeout(function() { updateProgressBar(75) }, quarterNoteDuration * 2 * 1000));
  progressTimeoutIds.push(setTimeout(function() { updateProgressBar(100) }, quarterNoteDuration * 3 * 1000));
}

function updateProgressBar(percentage) {
  progressBar.style.width = percentage + "%";
}

function clearTimeouts(timeoutIds) {
  for (var i = 0; i < timeoutIds.length; i++) {
    clearTimeout(timeoutIds[i]);
  }
}

function getDisplayTime(sec){
  let date = new Date(sec * 1000);
  return date.getMinutes() + ":" + date.getSeconds().toString().padStart(2, "0") + "." + date.getMilliseconds().toString().padStart(3, "0");
}