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
  startTimeLabel.value = getDisplayTime(loopStart);
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
  stopLoop();
  restartLoop();
  loopIntervalId = setInterval(restartLoop, loopDurationInSeconds * MILLISECONDS_PER_SECOND);
}

function stopLoop() {
  clearInterval(loopIntervalId);
  clearInterval(progressIntervalId);
  progressBar.style.width = "0%";
}

function restartLoop() {
  player.seekTo(loopStart, true);
  clearInterval(progressIntervalId);
  progressBar.style.width = "0%";
  progressIntervalId = setInterval(updateProgressBar, loopDurationInSeconds / 4 * MILLISECONDS_PER_SECOND); // assume 4 beats per measure
}

function updateProgressBar() {
  let currentTime = player.getCurrentTime();
  // TODO: Adjust so that it completes to 100 at end of loop
  let percentage = (currentTime - loopStart) / loopDurationInSeconds * 100
  progressBar.style.width = percentage + "%";
}

function getDisplayTime(sec){
  let date = new Date(sec * 1000);
  return date.getMinutes() + ":" + date.getSeconds().toString().padStart(2, "0") + "." + date.getMilliseconds().toString().padStart(3, "0");
}