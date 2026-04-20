/**
 * Koko Eating Bananas
 * Time Complexity: O(N * log(M))
 * Space Complexity: O(1)
 */
var minEatingSpeed = function (piles, h) {
  const calculateHoursRequired = (currentSpeed) => {
    let accumulatedHours = 0;
    for (let pileContent of piles) {
      accumulatedHours += Math.ceil(pileContent / currentSpeed);
    }
    return accumulatedHours;
  };

  let lowestPossibleSpeed = 1;
  let highestPossibleSpeed = 0;
  for (let currentPileAmount of piles) {
    if (currentPileAmount > highestPossibleSpeed) {
      highestPossibleSpeed = currentPileAmount;
    }
  }

  let resultMinimumSpeed = highestPossibleSpeed;

  while (lowestPossibleSpeed <= highestPossibleSpeed) {
    const candidateSpeed = Math.floor(
      (lowestPossibleSpeed + highestPossibleSpeed) / 2,
    );

    if (calculateHoursRequired(candidateSpeed) <= h) {
      resultMinimumSpeed = candidateSpeed;
      highestPossibleSpeed = candidateSpeed - 1;
    } else {
      lowestPossibleSpeed = candidateSpeed + 1;
    }
  }

  return resultMinimumSpeed;
};
