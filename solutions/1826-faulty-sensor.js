/**
 * Faulty Sensor
 * Intuition: One sensor dropped a value so its suffix is shifted by one. After the first mismatch, check which stream equals the other’s tail; if both explanations work, the answer is ambiguous (-1).
 * Approach: 1. Find `mismatchIndex`. 2. If none, return -1. 3. Test whether sensor1[i]==sensor2[i+1] for the tail (`s1PotentialDefect`) and the swapped test for sensor2. 4. Return 1 or 2 if exactly one fits, else -1.
 * Dry Run: sensor1 = [2,3,4,5], sensor2 = [2,1,3,4].
 *   - Mismatch at 1. sensor1 matches sensor2’s tail 3,4 → sensor 2 dropped. Return 2.
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
