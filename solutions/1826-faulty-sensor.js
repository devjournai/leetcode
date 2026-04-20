/**
 * Faulty Sensor
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var badSensor = function (sensor1, sensor2) {
  const arrayLength = sensor1.length;
  let mismatchIndex = -1;

  for (let loopCounterA = 0; loopCounterA < arrayLength; loopCounterA++) {
    if (sensor1[loopCounterA] !== sensor2[loopCounterA]) {
      mismatchIndex = loopCounterA;
      break;
    }
  }

  if (mismatchIndex === -1) {
    return -1;
  }

  let s1PotentialDefect = true;

  for (
    let loopCounterB = mismatchIndex;
    loopCounterB < arrayLength - 1;
    loopCounterB++
  ) {
    if (sensor1[loopCounterB] !== sensor2[loopCounterB + 1]) {
      s1PotentialDefect = false;
      break;
    }
  }

  let s2PotentialDefect = true;

  for (
    let loopCounterC = mismatchIndex;
    loopCounterC < arrayLength - 1;
    loopCounterC++
  ) {
    if (sensor2[loopCounterC] !== sensor1[loopCounterC + 1]) {
      s2PotentialDefect = false;
      break;
    }
  }

  if (s1PotentialDefect && !s2PotentialDefect) {
    return 1;
  }

  if (s2PotentialDefect && !s1PotentialDefect) {
    return 2;
  }

  return -1;
};
