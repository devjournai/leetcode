/**
 * Maximum Performance Of A Team
 * Intuition: Performance is (sum of speeds) * (min efficiency). Sort engineers by efficiency descending so the current engineer is the team's min efficiency; keep the k largest speeds with a min-heap.
 * Approach: 1. Pair (efficiency, speed) and sort by efficiency high to low. 2. For each engineer, add speed to a min-heap and to the speed sum. 3. If more than k people, drop the smallest speed. 4. Update max of speedSum * currentEfficiency. 5. Return that max modulo 1e9+7.
 * Dry Run: n=6, speed=[2,10,3,1,5,8], efficiency=[5,4,3,9,7,2], k=2.
 *   - Sorted by efficiency: (9,1), (7,5), (5,2), (4,10), ...
 *   - After (4,10) keep speeds 5 and 10, sum=15, minEff=4, performance=60. Return 60.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxPerformance = function (n, speed, efficiency, k) {
  const engineersCombinedData = Array.from({ length: n }, (_, arrayIndex) => [
    efficiency[arrayIndex],
    speed[arrayIndex],
  ]).sort((firstElement, secondElement) => secondElement[0] - firstElement[0]);

  const minSpeedHeap = [];
  let currentSumOfSpeeds = 0n;
  let highestPerformance = 0n;
  const moduloValue = 1000000007n;

  const addValueToHeap = (inputValue) => {
    minSpeedHeap.push(inputValue);
    let currentPosition = minSpeedHeap.length - 1;
    while (currentPosition > 0) {
      const parentPosition = Math.floor((currentPosition - 1) / 2);
      if (minSpeedHeap[parentPosition] <= minSpeedHeap[currentPosition]) break;
      const temporaryValue = minSpeedHeap[currentPosition];
      minSpeedHeap[currentPosition] = minSpeedHeap[parentPosition];
      minSpeedHeap[parentPosition] = temporaryValue;
      currentPosition = parentPosition;
    }
  };

  const extractMinimumValue = () => {
    if (minSpeedHeap.length === 0) return undefined;
    const minimumElement = minSpeedHeap[0];
    const lastElement = minSpeedHeap.pop();
    if (minSpeedHeap.length === 0) return minimumElement;

    minSpeedHeap[0] = lastElement;
    let currentIndexForRemoval = 0;
    while (true) {
      const leftChildPosition = 2 * currentIndexForRemoval + 1;
      const rightChildPosition = 2 * currentIndexForRemoval + 2;
      let smallestChildLocator = currentIndexForRemoval;

      if (
        leftChildPosition < minSpeedHeap.length &&
        minSpeedHeap[leftChildPosition] < minSpeedHeap[smallestChildLocator]
      ) {
        smallestChildLocator = leftChildPosition;
      }
      if (
        rightChildPosition < minSpeedHeap.length &&
        minSpeedHeap[rightChildPosition] < minSpeedHeap[smallestChildLocator]
      ) {
        smallestChildLocator = rightChildPosition;
      }

      if (smallestChildLocator === currentIndexForRemoval) break;

      const tempSwapValue = minSpeedHeap[currentIndexForRemoval];
      minSpeedHeap[currentIndexForRemoval] = minSpeedHeap[smallestChildLocator];
      minSpeedHeap[smallestChildLocator] = tempSwapValue;
      currentIndexForRemoval = smallestChildLocator;
    }
    return minimumElement;
  };

  for (let engineerIndex = 0; engineerIndex < n; engineerIndex++) {
    const currentEngineerItem = engineersCombinedData[engineerIndex];
    const currentEfficiencyValue = currentEngineerItem[0];
    const currentSpeedValue = currentEngineerItem[1];

    addValueToHeap(currentSpeedValue);
    currentSumOfSpeeds += BigInt(currentSpeedValue);

    while (minSpeedHeap.length > k) {
      const removedMin = extractMinimumValue();
      currentSumOfSpeeds -= BigInt(removedMin);
    }

    const currentPerformanceCalculation =
      currentSumOfSpeeds * BigInt(currentEfficiencyValue);
    if (currentPerformanceCalculation > highestPerformance) {
      highestPerformance = currentPerformanceCalculation;
    }
  }

  return Number(highestPerformance % moduloValue);
};
