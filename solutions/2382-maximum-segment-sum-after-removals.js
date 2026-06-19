/**
 * Maximum Segment Sum After Removals
 * Intuition: The problem involves tracking contiguous sums (segments) and their maximum after removals. Processing removals directly is difficult as segments split. Processing queries in reverse, where elements are "added back", allows us to use a Disjoint Set Union (DSU) data structure to efficiently merge segments and keep track of their sums and sizes.
 * Approach: 1. Initialize an array `finalResults` to store the maximum segment sum for each removal query. 2. Use a DSU structure with `parentTracker`, `segmentSizesContainer`, and `segmentTotalSums` arrays. `parentTracker[i] = -1` indicates `nums[i]` is currently "removed". 3. Iterate `currentOperationIndex` from `n-1` down to `0` (processing removals in reverse, which means elements are "restored"). 4. For each `currentOperationIndex`, store the `maximumAchievedSum` (from previous reverse steps) into `finalResults[currentOperationIndex]`. 5. "Restore" the element `nums[removalOperations[currentOperationIndex]]` by initializing its DSU entry (self-parent, size 1, sum `nums[currentElementIndex]`). 6. Check its left and right neighbors. If a neighbor is already "restored" (its `parentTracker` is not `-1`), perform a union operation to merge the current element's segment with the neighbor's segment. Update the `segmentTotalSums` and `segmentSizesContainer` accordingly, using union-by-size optimization for the right merge. 7. After all potential merges, update `maximumAchievedSum` with the new maximum segment sum found (potentially the sum of the segment `currentElementIndex` now belongs to). 8. Return `finalResults`.
 * Dry Run:
 * nums = [1,2,5,6,1], removeQueries = [0,3,2,4,1]
 * n = 5
 * Initial:
 * finalResults = [_,_,_,_,_]
 * parentTracker = [-1,-1,-1,-1,-1]
 * segmentSizesContainer = [0,0,0,0,0]
 * segmentTotalSums = [0,0,0,0,0]
 * maximumAchievedSum = 0
 *
 * currentOperationIndex = 4 (removalOperations[4] = 1, nums[1] = 2)
 *   finalResults[4] = 0
 *   currentElementIndex = 1
 *   parentTracker[1]=1, segmentSizesContainer[1]=1, segmentTotalSums[1]=2
 *   No active left/right neighbors.
 *   maximumAchievedSum = Math.max(0, segmentTotalSums[locateRoot(parentTracker, 1)]) = Math.max(0, 2) = 2
 *
 * currentOperationIndex = 3 (removalOperations[3] = 4, nums[4] = 1)
 *   finalResults[3] = 2
 *   currentElementIndex = 4
 *   parentTracker[4]=4, segmentSizesContainer[4]=1, segmentTotalSums[4]=1
 *   No active left/right neighbors.
 *   maximumAchievedSum = Math.max(2, segmentTotalSums[locateRoot(parentTracker, 4)]) = Math.max(2, 1) = 2
 *
 * currentOperationIndex = 2 (removalOperations[2] = 2, nums[2] = 5)
 *   finalResults[2] = 2
 *   currentElementIndex = 2
 *   parentTracker[2]=2, segmentSizesContainer[2]=1, segmentTotalSums[2]=5
 *   No active left/right neighbors.
 *   maximumAchievedSum = Math.max(2, segmentTotalSums[locateRoot(parentTracker, 2)]) = Math.max(2, 5) = 5
 *
 * currentOperationIndex = 1 (removalOperations[1] = 3, nums[3] = 6)
 *   finalResults[1] = 5
 *   currentElementIndex = 3
 *   parentTracker[3]=3, segmentSizesContainer[3]=1, segmentTotalSums[3]=6
 *   Left neighbor (index 2): parentTracker[2]=2. Active.
 *     leftSegmentRoot = locateRoot(parentTracker, 2) = 2
 *     sumAfterLeftMerge = segmentTotalSums[2] + segmentTotalSums[3] = 5 + 6 = 11
 *     parentTracker[3] = 2 (index 3 joins segment of index 2)
 *     segmentSizesContainer[2] += segmentSizesContainer[3] (1+1=2)
 *     segmentTotalSums[2] = 11
 *   Right neighbor (index 4): parentTracker[4]=4. Active.
 *     rootOfCurrentElementSegment = locateRoot(parentTracker, 3) = 2
 *     rightSegmentRoot = locateRoot(parentTracker, 4) = 4
 *     2 !== 4. Merge.
 *     combinedTotalSum = segmentTotalSums[2] + segmentTotalSums[4] = 11 + 1 = 12
 *     segmentSizesContainer[2]=2, segmentSizesContainer[4]=1. union-by-size makes 4 child of 2.
 *     parentTracker[4] = 2
 *     segmentSizesContainer[2] += segmentSizesContainer[4] (2+1=3)
 *     segmentTotalSums[2] = 12
 *   maximumAchievedSum = Math.max(5, segmentTotalSums[locateRoot(parentTracker, 3)]) = Math.max(5, segmentTotalSums[2]) = Math.max(5, 12) = 12
 *
 * currentOperationIndex = 0 (removalOperations[0] = 0, nums[0] = 1)
 *   finalResults[0] = 12
 *   currentElementIndex = 0
 *   parentTracker[0]=0, segmentSizesContainer[0]=1, segmentTotalSums[0]=1
 *   No active left neighbor.
 *   Right neighbor (index 1): parentTracker[1]=1. Active.
 *     rootOfCurrentElementSegment = locateRoot(parentTracker, 0) = 0
 *     rightSegmentRoot = locateRoot(parentTracker, 1) = 1
 *     0 !== 1. Merge.
 *     combinedTotalSum = segmentTotalSums[0] + segmentTotalSums[1] = 1 + 2 = 3
 *     segmentSizesContainer[0]=1, segmentSizesContainer[1]=1. Assume union makes 1 child of 0.
 *     parentTracker[1] = 0
 *     segmentSizesContainer[0] += segmentSizesContainer[1] (1+1=2)
 *     segmentTotalSums[0] = 3
 *   maximumAchievedSum = Math.max(12, segmentTotalSums[locateRoot(parentTracker, 0)]) = Math.max(12, segmentTotalSums[0]) = Math.max(12, 3) = 12
 *
 * Return finalResults = [12, 5, 2, 2, 0] (matches example output)
 * Time Complexity: O(N * α(N))
 * Space Complexity: O(N)
 */
var maximumSegmentSum = function (inputNumbers, removalOperations) {
  const arrayLength = inputNumbers.length;
  const finalResults = new Array(arrayLength);
  const parentTracker = new Array(arrayLength).fill(-1);
  const segmentSizesContainer = new Array(arrayLength).fill(0);
  const segmentTotalSums = new Array(arrayLength).fill(0);
  let maximumAchievedSum = 0;

  const locateRoot = (currentParentTracker, nodeIdentifier) => {
    if (currentParentTracker[nodeIdentifier] !== nodeIdentifier) {
      currentParentTracker[nodeIdentifier] = locateRoot(
        currentParentTracker,
        currentParentTracker[nodeIdentifier],
      );
    }
    return currentParentTracker[nodeIdentifier];
  };

  for (
    let currentOperationIndex = arrayLength - 1;
    currentOperationIndex >= 0;
    --currentOperationIndex
  ) {
    finalResults[currentOperationIndex] = maximumAchievedSum;

    const currentElementIndex = removalOperations[currentOperationIndex];

    parentTracker[currentElementIndex] = currentElementIndex;
    segmentSizesContainer[currentElementIndex] = 1;
    segmentTotalSums[currentElementIndex] = inputNumbers[currentElementIndex];

    const adjacentLeftIndex = currentElementIndex - 1;
    if (adjacentLeftIndex >= 0 && parentTracker[adjacentLeftIndex] !== -1) {
      const leftSegmentRoot = locateRoot(parentTracker, adjacentLeftIndex);
      const sumAfterLeftMerge =
        segmentTotalSums[leftSegmentRoot] +
        segmentTotalSums[currentElementIndex];

      parentTracker[currentElementIndex] = leftSegmentRoot;
      segmentSizesContainer[leftSegmentRoot] +=
        segmentSizesContainer[currentElementIndex];
      segmentTotalSums[leftSegmentRoot] = sumAfterLeftMerge;
    }

    const adjacentRightIndex = currentElementIndex + 1;
    if (
      adjacentRightIndex < arrayLength &&
      parentTracker[adjacentRightIndex] !== -1
    ) {
      const rootOfCurrentElementSegment = locateRoot(
        parentTracker,
        currentElementIndex,
      );
      const rightSegmentRoot = locateRoot(parentTracker, adjacentRightIndex);

      if (rootOfCurrentElementSegment !== rightSegmentRoot) {
        const combinedTotalSum =
          segmentTotalSums[rootOfCurrentElementSegment] +
          segmentTotalSums[rightSegmentRoot];

        if (
          segmentSizesContainer[rootOfCurrentElementSegment] <
          segmentSizesContainer[rightSegmentRoot]
        ) {
          parentTracker[rootOfCurrentElementSegment] = rightSegmentRoot;
          segmentSizesContainer[rightSegmentRoot] +=
            segmentSizesContainer[rootOfCurrentElementSegment];
          segmentTotalSums[rightSegmentRoot] = combinedTotalSum;
        } else {
          parentTracker[rightSegmentRoot] = rootOfCurrentElementSegment;
          segmentSizesContainer[rootOfCurrentElementSegment] +=
            segmentSizesContainer[rightSegmentRoot];
          segmentTotalSums[rootOfCurrentElementSegment] = combinedTotalSum;
        }
      }
    }

    maximumAchievedSum = Math.max(
      maximumAchievedSum,
      segmentTotalSums[locateRoot(parentTracker, currentElementIndex)],
    );
  }

  return finalResults;
};
