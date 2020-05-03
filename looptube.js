document.getElementById('markStart').addEventListener('click', function() { markStart() });
document.getElementById('decrementStart').addEventListener('click', function() { decrementStart() });
document.getElementById('incrementStart').addEventListener('click', function() { incrementStart() });
document.getElementById('markEnd').addEventListener('click', function() { markEnd() });
document.getElementById('decrementEnd').addEventListener('click', function() { decrementEnd() });
document.getElementById('incrementEnd').addEventListener('click', function() { incrementEnd() });
document.getElementById('startLoop').addEventListener('click', function() { startLoop() });
document.getElementById('stopLoop').addEventListener('click', function() { stopLoop() });

var progressBar = document.getElementById('progressBar');
var startTimeLabel = document.getElementById('startTimeLabel');
var endTimeLabel = document.getElementById('endTimeLabel');

const MILLISECONDS_PER_SECOND = 1000;
const MIN_LOOP_DURATION_IN_SECONDS = 1;
const INCREMENT = .10;

var progressIntervalId;
var loopIntervalId;
var loopStart = 0;
var loopEnd = 0;
var loopDurationInSeconds = 0;
var player;

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
  startTimeLabel.value = loopStart.toFixed(4);
  startLoop();
}

function decrementStart() {
  loopStart = loopStart - INCREMENT;
  startTimeLabel.value = loopStart.toFixed(4);
  startLoop();
}

function incrementStart() {
  loopStart = loopStart + INCREMENT;
  startTimeLabel.value = loopStart.toFixed(4);
  startLoop();
}

function markEnd() {
  loopEnd = player.getCurrentTime();
  endTimeLabel.value = loopEnd.toFixed(4);
  startLoop();
}

function decrementEnd() {
  loopEnd = loopEnd - INCREMENT;
  endTimeLabel.value = loopEnd.toFixed(4);
  startLoop();
}

function incrementEnd() {
  loopEnd = loopEnd + INCREMENT;
  endTimeLabel.value = loopEnd.toFixed(4);
  startLoop();
}

function startLoop() {
  loopDurationInSeconds = loopEnd - loopStart;
  if (loopDurationInSeconds < MIN_LOOP_DURATION_IN_SECONDS) return;
  stopLoop();
  seekToLoopStart();
  progressIntervalId = setInterval(updateProgressBar, MIN_LOOP_DURATION_IN_SECONDS / 10 * MILLISECONDS_PER_SECOND)
  loopIntervalId = setInterval(seekToLoopStart, loopDurationInSeconds * MILLISECONDS_PER_SECOND);
}

function stopLoop() {
  progressBar.style.width = "0%";
  clearInterval(progressIntervalId);
  clearInterval(loopIntervalId);
}

function updateProgressBar() {
  let currentTime = player.getCurrentTime();
  // TODO: WRONG
  let percentage = (currentTime / loopEnd) * loopDurationInSeconds * 100
  progressBar.style.width = percentage.toFixed(4) + "%";
}

function seekToLoopStart() {
  player.seekTo(loopStart, true);
}