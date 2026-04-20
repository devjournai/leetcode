/**
 * Guess Number Higher Or Lower
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
*/
var guessNumber = function (n) {
  let minimumPossible = 1;
  let maximumPossible = n;

  while (minimumPossible <= maximumPossible) {
    const trialNumber = Math.floor(minimumPossible + (maximumPossible - minimumPossible) / 2);
    const feedback = guess(trialNumber);

    if (feedback === 0) {
      return trialNumber;
    } else if (feedback === -1) {
      maximumPossible = trialNumber - 1;
    } else {
      minimumPossible = trialNumber + 1;
    }
  }
};