//timer
var startTime;
var endTime;


var lastLap;
var lapDuration = 100; //millis

//how long does the neurofeedback go. (in milliseconds) 
var duration = 3 * 60 * 1000;

var padding = 50;

//scoring
var threshold = 0;
var maxThres = Number.MIN_VALUE;
var altitude = 0;
var thetaValues = [];
var alphaValues = [];
var betaValues = [];


function initMeasureView() {

	startTime = millis();
	lastLap = millis();
}

function drawMeasureView() {
	background(255);

	if (frameCount < 30) {
		background('black');
		return;
	}

	if (frameCount % 100 == 0) {
		console.log('frameRate: ' + frameRate());
	}

	var horse = muse.get('/muse/elements/horseshoe');
	var theta_relative = muse.get('/muse/elements/theta_relative');
	var alpha_relative = muse.get('/muse/elements/alpha_relative');
	var beta_relative = muse.get('/muse/elements/beta_relative');

	//collect data every now and then
	if (millis() - lastLap > lapDuration) {
		thetaValues.push(theta_relative.mean);
		alphaValues.push(alpha_relative.mean);
		betaValues.push(beta_relative.mean);

		lastLap = millis();
	}

	//headband status
	var badValue = 3;
	var leftEar = horse.leftEar || badValue;
	var rightEar = horse.rightEar || badValue;
	var leftFront = horse.leftFront || badValue;
	var rightFront = horse.rightFront || badValue;

	push();
	translate(padding, height - 50);
	drawHorseShoeStatus([leftEar, leftFront, rightFront, rightEar]);
	pop();

}

function cleanupRocketView() {

}

function drawHorseShoeStatus(arr) {
	rectMode(CORNER);
	ellipseMode(CENTER);

	var gap = 10;
	var w = 20;
	for (var i = 0; i < arr.length; i++) {
		var val = arr[i];
		var c = getStatusCol(val);

		var x = i * (w + gap);
		fill(c);
		noStroke();
		ellipse(x, 0, w, w);
	}
}

function getStatusCol(val) {
	switch (val) {
		case 1:
			return 'green';
			break;
		case 2:
			return 'yellow';
			break;
		case 3:
			return 'red';
			break;
		default:
			return 'red';
	}
}

function drawDebugInfo() {
	textSize(16);
	fill('black');
	text('Vel: ' + nf(rocket.vel, null, 1), 20, height - 120);
	text('Acc: ' + nf(rocket.acc, null, 1), 20, height - 100);
	text('Threshold: ' + nf(threshold, null, 2), 20, height - 80);
	text('Max Theta: ' + nf(maxTheta * 100, null, 0) + ' %', 20, height - 60);
	fill('grey');
	text(nf(mean(actualThetaBuffer) * 100, null, 0) + ' %', 150, height - 60);
	fill('black');
	text('Max Alpha: ' + nf(maxAlpha * 100, null, 0) + ' %', 20, height - 40);
	fill('grey');
	text(nf(mean(actualAlphaBuffer) * 100, null, 0) + ' %', 150, height - 40);
	fill('black');
	text('Min Beta: ' + nf(minBeta * 100, null, 0) + ' %', 20, height - 20);
	fill('grey');
	text(nf(mean(actualBetaBuffer) * 100, null, 0) + ' %', 150, height - 20);

}

function formatTime(millis) {
	var totalsecs = floor(millis / 1000);
	var mins = floor(totalsecs / 60);
	var secs = totalsecs - mins * 60;
	return nf(mins, 2, null) + ':' + nf(secs, 2, 0);
}