/**
 * Count Hills And Valleys In An Array
 * Intuition: Simplify the problem by first compressing the array to remove consecutive duplicate numbers, ensuring all adjacent elements are distinct. Then, iterate through this compressed array to identify hills and valleys based on direct comparisons with immediate neighbors.
 * Approach: 1. Initialize a new array (say, `processedNumbers`) with the first element of the input `nums`. 2. Iterate through `nums` from the second element, adding `nums[currentIndex]` to `processedNumbers` only if it's different from the last element added to `processedNumbers`. This effectively removes consecutive duplicates. 3. Initialize a counter `totalFeatures` to zero. 4. Iterate through `processedNumbers` from the second element to the second-to-last element (as endpoints cannot be hills or valleys). 5. For each `processedNumbers[loopIndex]`, compare it with its left neighbor (`processedNumbers[loopIndex - 1]`) and right neighbor (`processedNumbers[loopIndex + 1]`). 6. If `processedNumbers[loopIndex]` is strictly greater than both its neighbors (a hill) OR strictly less than both its neighbors (a valley), increment `totalFeatures`. 7. Return `totalFeatures`.
 * Dry Run: nums = [2,4,1,1,1,3,5]
 * 1. Initialize `processedNumbers = [2]`.
 * 2. Iterate `nums`:
 *    - `currentIndex = 1`: `nums[1]=4`, `processedNumbers.at(-1)=2`. `4 !== 2`. `processedNumbers = [2,4]`.
 *    - `currentIndex = 2`: `nums[2]=1`, `processedNumbers.at(-1)=4`. `1 !== 4`. `processedNumbers = [2,4,1]`.
 *    - `currentIndex = 3`: `nums[3]=1`, `processedNumbers.at(-1)=1`. `1 === 1`. Skip. `processedNumbers = [2,4,1]`.
 *    - `currentIndex = 4`: `nums[4]=1`, `processedNumbers.at(-1)=1`. `1 === 1`. Skip. `processedNumbers = [2,4,1]`.
 *    - `currentIndex = 5`: `nums[5]=3`, `processedNumbers.at(-1)=1`. `3 !== 1`. `processedNumbers = [2,4,1,3]`.
 *    - `currentIndex = 6`: `nums[6]=5`, `processedNumbers.at(-1)=3`. `5 !== 3`. `processedNumbers = [2,4,1,3,5]`.
 *    `processedNumbers` is now `[2,4,1,3,5]`.
 * 3. Initialize `totalFeatures = 0`.
 * 4. Iterate `processedNumbers` from `loopIndex = 1` to `processedNumbers.length - 2` (i.e., `loopIndex` from 1 to 3):
 *    - `loopIndex = 1`: `currentValue = processedNumbers[1]=4`. `leftSide = processedNumbers[0]=2`. `rightSide = processedNumbers[2]=1`.
 *      `(4 > 2 && 4 > 1)` is TRUE. `totalFeatures = 1`.
 *    - `loopIndex = 2`: `currentValue = processedNumbers[2]=1`. `leftSide = processedNumbers[1]=4`. `rightSide = processedNumbers[3]=3`.
 *      `(1 < 4 && 1 < 3)` is TRUE. `totalFeatures = 2`.
 *    - `loopIndex = 3`: `currentValue = processedNumbers[3]=3`. `leftSide = processedNumbers[2]=1`. `rightSide = processedNumbers[4]=5`.
 *      `(3 > 1 && 3 > 5)` is FALSE. `(3 < 1 && 3 < 5)` is FALSE. `totalFeatures` remains 2.
 * 5. Loop finishes. Return `totalFeatures = 2`.
 * Time Complexity: O(N)
 * Space Complexity: O(M)
 */
var countHillValley = function (nums) {
  if (nums.length < 3) {
    return 0;
  }

  const processedNumbers = [nums[0]];
  for (
    let currentNumberIndex = 1;
    currentNumberIndex < nums.length;
    currentNumberIndex++
  ) {
    if (nums[currentNumberIndex] !== nums[currentNumberIndex - 1]) {
      processedNumbers.push(nums[currentNumberIndex]);
    }
  }

  let totalFeatures = 0;
  if (processedNumbers.length < 3) {
    return 0;
  }

  for (
    let processedIndex = 1;
    processedIndex < processedNumbers.length - 1;
    processedIndex++
  ) {
    const valueAtIndex = processedNumbers[processedIndex];
    const valueBefore = processedNumbers[processedIndex - 1];
    const valueAfter = processedNumbers[processedIndex + 1];

    const isHill = valueAtIndex > valueBefore && valueAtIndex > valueAfter;
    const isValley = valueAtIndex < valueBefore && valueAtIndex < valueAfter;

    if (isHill || isValley) {
      totalFeatures++;
    }
  }

  return totalFeatures;
};
