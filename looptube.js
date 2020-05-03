document.getElementById('markStart').addEventListener('click', function() { markStart() });
document.getElementById('decrementStart').addEventListener('click', function() { decrementStart() });
document.getElementById('incrementStart').addEventListener('click', function() { incrementStart() });
document.getElementById('markEnd').addEventListener('click', function() { markEnd() });
document.getElementById('decrementEnd').addEventListener('click', function() { decrementEnd() });
document.getElementById('incrementEnd').addEventListener('click', function() { incrementEnd() });
document.getElementById('startLoop').addEventListener('click', function() { startLoop() });
document.getElementById('stopLoop').addEventListener('click', function() { stopLoop() });

const MILLISECONDS_PER_SECOND = 1000;
const MIN_LOOP_DURATION_IN_SECONDS = 1;
const INCREMENT = .05;

var loopIntervalId;
var loopStart = 0;
var loopEnd = 0;
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
  startLoop();
}

function decrementStart() {
  loopStart = loopStart - INCREMENT;
  startLoop();
}

function incrementStart() {
  loopStart = loopStart + INCREMENT;
  startLoop();
}

function markEnd() {
  loopEnd = player.getCurrentTime();
  startLoop();
}

function decrementEnd() {
  loopEnd = loopEnd - INCREMENT;
  startLoop();
}

function incrementEnd() {
  loopEnd = loopEnd + INCREMENT;
  startLoop();
}

function startLoop() {
  let loopDurationInSeconds = loopEnd - loopStart;
  if (loopDurationInSeconds < MIN_LOOP_DURATION_IN_SECONDS) return;
  stopLoop();
  seekToLoopStart();
  loopIntervalId = setInterval(seekToLoopStart, loopDurationInSeconds * MILLISECONDS_PER_SECOND);
}

function stopLoop() {
  clearInterval(loopIntervalId);
}

function seekToLoopStart() {
  player.seekTo(loopStart, true);
}