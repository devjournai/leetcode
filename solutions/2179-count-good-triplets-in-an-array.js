/**
 * Count Good Triplets In An Array
 * Intuition: The problem asks for triplets (x, y, z) such that their positions in `nums1` are increasing (pos1x < pos1y < pos1z) AND their positions in `nums2` are also increasing (pos2x < pos2y < pos2z). This can be efficiently solved by fixing the middle element `y` and counting valid `x`s (left part) and valid `z`s (right part) using a Fenwick tree (BIT).
 * Approach:
 * 1. Preprocessing: Create two auxiliary arrays, `positionMap1` and `positionMap2`. `positionMap1[value]` stores the 0-indexed position of `value` in `nums1`, and `positionMap2[value]` stores the 0-indexed position of `value` in `nums2`.
 * 2. Transform `nums2` based on `nums1`'s order: Create an array `mappedPositions` where `mappedPositions[positionMap1[value]] = positionMap2[value]`. This means `mappedPositions[i]` tells us the position of the value that is at index `i` in `nums1`, but in `nums2`. Now, when we iterate through `mappedPositions` from left to right, we inherently satisfy `pos1x < pos1y < pos1z`. We only need to count pairs that satisfy `pos2x < pos2y < pos2z`.
 * 3. Use Two Fenwick Trees: Initialize two Fenwick trees, `bitLeft` and `bitRight`, of size `arraySize + 1`.
 *    a. Populate `bitRight`: Initially, `bitRight` is populated with counts for all `positionMap2` values (which are the values in `mappedPositions`). This can be done by iterating `mappedPositions` from right to left and adding each element to `bitRight`.
 *    b. Iterate for `midElementIndex`: Iterate through `mappedPositions` from `0` to `arraySize - 1`. For each `midElementIndex` (representing `pos1y`):
 *       i. Remove `mappedPositions[midElementIndex]` from `bitRight`. This effectively makes `bitRight` store counts for elements `z` where `pos1z > pos1y`.
 *       ii. Query `bitLeft` for `smallerCount`: Count elements `x` such that `positionMap2[x] < mappedPositions[midElementIndex]` (i.e., `pos2x < pos2y`). This is achieved by querying `bitLeft` for the sum up to `mappedPositions[midElementIndex] - 1`. `bitLeft` stores counts of `pos2x` values for `x` where `pos1x < pos1y`.
 *       iii. Query `bitRight` for `largerCount`: Count elements `z` such that `positionMap2[z] > mappedPositions[midElementIndex]` (i.e., `pos2z > pos2y`). This is achieved by querying `bitRight` for the total sum up to `arraySize - 1` and subtracting the sum up to `mappedPositions[midElementIndex]`.
 *       iv. Update `goodTripletsCount`: Add `smallerCount * largerCount` to the total `goodTripletsCount`.
 *       v. Add to `bitLeft`: Add `mappedPositions[midElementIndex]` to `bitLeft`. This prepares `bitLeft` for the next `midElementIndex`, as the current `midElementIndex` becomes a potential `x` for future `y`s.
 * 4. Return `goodTripletsCount`.
 * Dry Run:
 * nums1 = [0,1,2], nums2 = [0,1,2]
 * arraySize = 3
 * positionMap1 = [0,1,2] (value 0 is at index 0, 1 at 1, 2 at 2)
 * positionMap2 = [0,1,2] (value 0 is at index 0, 1 at 1, 2 at 2)
 * mappedPositions = [0,1,2] (e.g., mappedPositions[positionMap1[0]] = positionMap2[0] => mappedPositions[0] = 0)
 * bitLeft = [0,0,0,0], bitRight = [0,0,0,0] (Fenwick tree indices are 1-based, size arraySize + 1)
 * goodTripletsCount = 0
 *
 * Initial `bitRight` population:
 * - rightToLeftIndex = 2: mappedPositionValue = mappedPositions[2] = 2. update(bitRight, 2, 1). bitRight effectively contains {2:1}
 * - rightToLeftIndex = 1: mappedPositionValue = mappedPositions[1] = 1. update(bitRight, 1, 1). bitRight effectively contains {1:1, 2:1}
 * - rightToLeftIndex = 0: mappedPositionValue = mappedPositions[0] = 0. update(bitRight, 0, 1). bitRight effectively contains {0:1, 1:1, 2:1}
 *
 * Main loop (`midElementIndex`):
 * - midElementIndex = 0 (value at nums1[0] is 0):
 *   - currentMappedPosition = mappedPositions[0] = 0.
 *   - update(bitRight, 0, -1). `bitRight` now contains {1:1, 2:1}.
 *   - smallerCount = query(bitLeft, 0). `query(bitLeft, 0)` means count elements < 0 in `bitLeft`. Result: 0.
 *   - largerCount = query(bitRight, 2) - query(bitRight, 0). `query(bitRight, 2)` means count elements <= 2 in `bitRight` (1+1=2). `query(bitRight, 0)` means count elements <= 0 in `bitRight` (0). Result: 2 - 0 = 2.
 *   - goodTripletsCount += 0 * 2 = 0.
 *   - update(bitLeft, 0, 1). `bitLeft` now contains {0:1}.
 *
 * - midElementIndex = 1 (value at nums1[1] is 1):
 *   - currentMappedPosition = mappedPositions[1] = 1.
 *   - update(bitRight, 1, -1). `bitRight` now contains {2:1}.
 *   - smallerCount = query(bitLeft, 1). `query(bitLeft, 1)` means count elements < 1 in `bitLeft`. `bitLeft` contains {0:1}. Result: 1.
 *   - largerCount = query(bitRight, 2) - query(bitRight, 1). `query(bitRight, 2)` means count elements <= 2 in `bitRight` (1). `query(bitRight, 1)` means count elements <= 1 in `bitRight` (0). Result: 1 - 0 = 1.
 *   - goodTripletsCount += 1 * 1 = 1. (Triplet is (0,1,2))
 *   - update(bitLeft, 1, 1). `bitLeft` now contains {0:1, 1:1}.
 *
 * - midElementIndex = 2 (value at nums1[2] is 2):
 *   - currentMappedPosition = mappedPositions[2] = 2.
 *   - update(bitRight, 2, -1). `bitRight` is now empty {}.
 *   - smallerCount = query(bitLeft, 2). `query(bitLeft, 2)` means count elements < 2 in `bitLeft`. `bitLeft` contains {0:1, 1:1}. Result: 2.
 *   - largerCount = query(bitRight, 2) - query(bitRight, 2). `query(bitRight, 2)` means count elements <= 2 in `bitRight` (0). `query(bitRight, 2)` means count elements <= 2 in `bitRight` (0). Result: 0 - 0 = 0.
 *   - goodTripletsCount += 2 * 0 = 0.
 *   - update(bitLeft, 2, 1). `bitLeft` now contains {0:1, 1:1, 2:1}.
 *
 * Final `goodTripletsCount` = 1.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var goodTriplets = function (nums1, nums2) {
  const arraySize = nums1.length;
  const positionMap1 = new Array(arraySize);
  const positionMap2 = new Array(arraySize);

  for (let currentElement = 0; currentElement < arraySize; currentElement++) {
    positionMap1[nums1[currentElement]] = currentElement;
    positionMap2[nums2[currentElement]] = currentElement;
  }

  const mappedPositions = new Array(arraySize);
  for (let originalIndex = 0; originalIndex < arraySize; originalIndex++) {
    mappedPositions[originalIndex] = positionMap2[nums1[originalIndex]];
  }

  const bitLeft = new Array(arraySize + 1).fill(0);
  const bitRight = new Array(arraySize + 1).fill(0);

  let goodTripletsCount = 0;

  for (
    let rightToLeftIndex = arraySize - 1;
    rightToLeftIndex >= 0;
    rightToLeftIndex--
  ) {
    const mappedPositionValue = mappedPositions[rightToLeftIndex];
    updateFenwickTree(bitRight, mappedPositionValue, 1);
  }

  for (
    let midElementIndex = 0;
    midElementIndex < arraySize;
    midElementIndex++
  ) {
    const currentMappedPosition = mappedPositions[midElementIndex];
    updateFenwickTree(bitRight, currentMappedPosition, -1);

    const smallerCount = queryFenwickTree(bitLeft, currentMappedPosition - 1);
    const largerCount =
      queryFenwickTree(bitRight, arraySize - 1) -
      queryFenwickTree(bitRight, currentMappedPosition);

    goodTripletsCount += smallerCount * largerCount;
    updateFenwickTree(bitLeft, currentMappedPosition, 1);
  }

  return goodTripletsCount;

  function updateFenwickTree(fenwickTree, targetIndex, changeDelta) {
    for (
      let treeTraversalIndex = targetIndex + 1;
      treeTraversalIndex <= arraySize;
      treeTraversalIndex += treeTraversalIndex & -treeTraversalIndex
    ) {
      fenwickTree[treeTraversalIndex] += changeDelta;
    }
  }

  function queryFenwickTree(fenwickTreeQuery, queryTargetIndex) {
    let currentSum = 0;
    for (
      let queryTraversalIndex = queryTargetIndex + 1;
      queryTraversalIndex > 0;
      queryTraversalIndex -= queryTraversalIndex & -queryTraversalIndex
    ) {
      currentSum += fenwickTreeQuery[queryTraversalIndex];
    }
    return currentSum;
  }
};
