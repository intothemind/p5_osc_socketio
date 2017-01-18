function drawCalibration() {
  
  background(bgBlue);
  // Definieren des Rand-Puffers
  var padding = width/30;
  
  // Verstecken der Slider
  /*
  alphaSlider.hide();
  betaSlider.hide();
  thetaSlider.hide();
  */

  var horseshoe = muse.get('/muse/elements/horseshoe');

  var badSignal = 3;
  var leftEar = horseshoe.leftEar || badSignal;
  var rightEar = horseshoe.rightEar || badSignal;
  var leftFront = horseshoe.leftFront || badSignal;
  var rightFront = horseshoe.rightFront || badSignal;

  leftEar = constrain(leftEar, 1, 3);
  rightEar = constrain(rightEar, 1, 3);
  leftFront = constrain(leftFront, 1, 3);
  rightFront = constrain(rightFront, 1, 3);

  var images = getImages(leftEar, leftFront, rightFront, rightEar);

  // Titel
  push();
  translate(width/2, height/6);
  textAlign(CENTER, CENTER);
  textSize(padding*1.3);
  textFont(font_coneria);
  text("Jacque's Mind", 0, 0);
  textSize(padding/1.6);
  textFont(font_sans);
  text ('Calibration', 0, 50);
  pop();

  // Horseshoe-Image
  push();
  translate(width/2, height/2+20);
  imageMode(CENTER);
  image(hsBase, 0, 0, (height/3)*1.1, height/3);
  
  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    image(img, 0, 0, (height/3)*1.1, height/3);
  }
  pop();

  // Nachricht
  var readyToGo = (leftEar + rightEar + rightFront + leftFront) <= 4;
  var msg = 'Muse besser ausrichten.';
  if (readyToGo) {
    msg = 'Es kann losgehen!';
  }
  
  push();
  translate(width/2, (height/6)*5);
  textAlign(CENTER, CENTER);
  textSize(padding/2);
  textFont(font_sans);
  noStroke();
  fill('black');
  text(msg, 0, 0);
  pop();

  if (readyToGo) {
    startButton.show();
  } else {
    startButton.hide();
  }
}

function getImages(le, lf, rf, re) {
  var leftEarImg = getImage('leftEar', le);
  var leftFrontImg = getImage('leftFront', lf);
  var rightFrontImg = getImage('rightFront', rf);
  var righEarImg = getImage('rightEar', re);
  return [leftEarImg, leftFrontImg, rightFrontImg, righEarImg];
}

function getImage(id, val) {
  var valIndex = val - 1;
  return calImg[id][valIndex];
}