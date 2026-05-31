/**
 * Count Equal And Divisible Pairs In An Array
 * Intuition: To efficiently count pairs (i, j) where nums[i] == nums[j] and (i * j) % k == 0, we can process the array elements one by one. For each element at its current index, we check if it has appeared before. If so, we iterate through its previously recorded indices to form pairs and verify the divisibility condition.
 * Approach: 1. Initialize a counter, `pairCount`, to store the total number of valid pairs. 2. Create a `Map`, `valueIndexMap`, to store numbers as keys and arrays of their respective indices as values. 3. Iterate through the input array `nums` using a `for` loop with an index `currentPosition` from 0 to `nums.length - 1`. 4. For each element `valueAtCurrentPosition` at `currentPosition`: a. Check if `valueIndexMap` already contains `valueAtCurrentPosition`. b. If it does, retrieve the `storedIndices` array associated with `valueAtCurrentPosition`. Then, iterate through each `priorIndex` in `storedIndices` using a `for...of` loop. If `(priorIndex * currentPosition) % k === 0`, increment `pairCount`. After checking all previous indices, append `currentPosition` to `storedIndices`. c. If `valueIndexMap` does not contain `valueAtCurrentPosition`, initialize a new array `[currentPosition]` and set it as the value for `valueAtCurrentPosition` in the map. 5. After iterating through all elements, return `pairCount`.
 * Dry Run: nums = [3, 1, 2, 2, 2, 1], k = 2
 * Initial: pairCount = 0, valueIndexMap = Map{}
 *
 * currentPosition = 0, valueAtCurrentPosition = 3:
 *   valueIndexMap does not have 3.
 *   valueIndexMap.set(3, [0]) -> Map{3: [0]}
 *
 * currentPosition = 1, valueAtCurrentPosition = 1:
 *   valueIndexMap does not have 1.
 *   valueIndexMap.set(1, [1]) -> Map{3: [0], 1: [1]}
 *
 * currentPosition = 2, valueAtCurrentPosition = 2:
 *   valueIndexMap does not have 2.
 *   valueIndexMap.set(2, [2]) -> Map{3: [0], 1: [1], 2: [2]}
 *
 * currentPosition = 3, valueAtCurrentPosition = 2:
 *   valueIndexMap has 2. storedIndices = [2].
 *   priorIndex = 2: (2 * 3) % 2 = 6 % 2 = 0. pairCount becomes 1.
 *   storedIndices.push(3) -> [2, 3]. valueIndexMap updates: Map{... 2: [2, 3]}
 *
 * currentPosition = 4, valueAtCurrentPosition = 2:
 *   valueIndexMap has 2. storedIndices = [2, 3].
 *   priorIndex = 2: (2 * 4) % 2 = 8 % 2 = 0. pairCount becomes 2.
 *   priorIndex = 3: (3 * 4) % 2 = 12 % 2 = 0. pairCount becomes 3.
 *   storedIndices.push(4) -> [2, 3, 4]. valueIndexMap updates: Map{... 2: [2, 3, 4]}
 *
 * currentPosition = 5, valueAtCurrentPosition = 1:
 *   valueIndexMap has 1. storedIndices = [1].
 *   priorIndex = 1: (1 * 5) % 2 = 5 % 2 = 1. Condition not met.
 *   storedIndices.push(5) -> [1, 5]. valueIndexMap updates: Map{... 1: [1, 5]}
 *
 * End of loop.
 * Return pairCount = 3.
 *
 * Time Complexity: O(N * M)
 * Space Complexity: O(N)
 */
var countPairs = function (nums, k) {
  let pairCount = 0;
  const valueIndexMap = new Map();
  const arrayLength = nums.length;

  for (
    let currentPosition = 0;
    currentPosition < arrayLength;
    currentPosition++
  ) {
    const valueAtCurrentPosition = nums[currentPosition];

    if (valueIndexMap.has(valueAtCurrentPosition)) {
      const storedIndices = valueIndexMap.get(valueAtCurrentPosition);

      for (const priorIndex of storedIndices) {
        if ((priorIndex * currentPosition) % k === 0) {
          pairCount++;
        }
      }
      storedIndices.push(currentPosition);
    } else {
      valueIndexMap.set(valueAtCurrentPosition, [currentPosition]);
    }
  }

  return pairCount;
};
