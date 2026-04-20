/**
 * Check if Strings Can be Made Equal With Operations II
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var checkStrings = function (s1, s2) {
  const s1EvenContainer = [];
  const s1OddContainer = [];
  const s2EvenContainer = [];
  const s2OddContainer = [];

  const stringLength = s1.length;
  let indexCounter = 0;

  while (indexCounter < stringLength) {
    if (indexCounter % 2 === 0) {
      s1EvenContainer.push(s1[indexCounter]);
      s2EvenContainer.push(s2[indexCounter]);
    } else {
      s1OddContainer.push(s1[indexCounter]);
      s2OddContainer.push(s2[indexCounter]);
    }
    indexCounter++;
  }

  const sortedS1Even = s1EvenContainer.sort().join("");
  const sortedS2Even = s2EvenContainer.sort().join("");
  const sortedS1Odd = s1OddContainer.sort().join("");
  const sortedS2Odd = s2OddContainer.sort().join("");

  return sortedS1Even === sortedS2Even && sortedS1Odd === sortedS2Odd;
};
