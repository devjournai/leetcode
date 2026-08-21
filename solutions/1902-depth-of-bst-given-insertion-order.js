/**
 * Depth Of Bst Given Insertion Order
 * Intuition: A new value attaches to the later of its inorder predecessor and successor among already inserted keys. Depth is parent depth + 1. A segment tree stores present mins/maxes for pred/succ queries.
 * Approach: 1. Insert values in `order`. 2. Query predecessor/successor, pick the one with larger `valueInsertionTimes` as parent. 3. Update `nodeDepths` and the segment tree. 4. Return `currentMaximumDepth`.
 * Dry Run: order=[2,1,4,3]. 2 depth 1; 1 and 4 depth 2; 3 under 4 depth 3. Return 3.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxDepthBST = function (order) {
  const valueCount = order.length;
  const nodeDepths = new Array(valueCount + 1).fill(0);
  const valueInsertionTimes = new Array(valueCount + 1).fill(0);

  const treeNodeStorage = new Array(4 * valueCount);

  function initializeSegmentTree(
    treePosition,
    currentRangeStart,
    currentRangeEnd
  ) {
    if (currentRangeStart === currentRangeEnd) {
      treeNodeStorage[treePosition] = {
        minimumPresent: Infinity,
        maximumPresent: -Infinity,
      };
      return;
    }
    const middleRangePoint = Math.floor(
      (currentRangeStart + currentRangeEnd) / 2
    );
    initializeSegmentTree(
      2 * treePosition,
      currentRangeStart,
      middleRangePoint
    );
    initializeSegmentTree(
      2 * treePosition + 1,
      middleRangePoint + 1,
      currentRangeEnd
    );
    treeNodeStorage[treePosition] = {
      minimumPresent: Infinity,
      maximumPresent: -Infinity,
    };
  }

  function updateSegmentTreeValue(
    treePosition,
    currentRangeStart,
    currentRangeEnd,
    updateTargetValue
  ) {
    if (currentRangeStart === currentRangeEnd) {
      treeNodeStorage[treePosition].minimumPresent = updateTargetValue;
      treeNodeStorage[treePosition].maximumPresent = updateTargetValue;
      return;
    }
    const middleRangePoint = Math.floor(
      (currentRangeStart + currentRangeEnd) / 2
    );
    if (updateTargetValue <= middleRangePoint) {
      updateSegmentTreeValue(
        2 * treePosition,
        currentRangeStart,
        middleRangePoint,
        updateTargetValue
      );
    } else {
      updateSegmentTreeValue(
        2 * treePosition + 1,
        middleRangePoint + 1,
        currentRangeEnd,
        updateTargetValue
      );
    }
    treeNodeStorage[treePosition].minimumPresent = Math.min(
      treeNodeStorage[2 * treePosition].minimumPresent,
      treeNodeStorage[2 * treePosition + 1].minimumPresent
    );
    treeNodeStorage[treePosition].maximumPresent = Math.max(
      treeNodeStorage[2 * treePosition].maximumPresent,
      treeNodeStorage[2 * treePosition + 1].maximumPresent
    );
  }

  function queryPredecessorValue(
    treePosition,
    currentRangeStart,
    currentRangeEnd,
    targetValForSearch
  ) {
    if (treeNodeStorage[treePosition].maximumPresent < targetValForSearch) {
      return treeNodeStorage[treePosition].maximumPresent === -Infinity
        ? null
        : treeNodeStorage[treePosition].maximumPresent;
    }
    if (treeNodeStorage[treePosition].minimumPresent >= targetValForSearch) {
      return null;
    }
    if (currentRangeStart === currentRangeEnd) {
      return null;
    }

    const middleRangePoint = Math.floor(
      (currentRangeStart + currentRangeEnd) / 2
    );
    let rightSubtreeResult = queryPredecessorValue(
      2 * treePosition + 1,
      middleRangePoint + 1,
      currentRangeEnd,
      targetValForSearch
    );
    if (rightSubtreeResult !== null) {
      return rightSubtreeResult;
    }
    let leftSubtreeResult = queryPredecessorValue(
      2 * treePosition,
      currentRangeStart,
      middleRangePoint,
      targetValForSearch
    );
    return leftSubtreeResult;
  }

  function querySuccessorValue(
    treePosition,
    currentRangeStart,
    currentRangeEnd,
    targetValForSearch
  ) {
    if (treeNodeStorage[treePosition].minimumPresent > targetValForSearch) {
      return treeNodeStorage[treePosition].minimumPresent === Infinity
        ? null
        : treeNodeStorage[treePosition].minimumPresent;
    }
    if (treeNodeStorage[treePosition].maximumPresent <= targetValForSearch) {
      return null;
    }
    if (currentRangeStart === currentRangeEnd) {
      return null;
    }

    const middleRangePoint = Math.floor(
      (currentRangeStart + currentRangeEnd) / 2
    );
    let leftSubtreeResult = querySuccessorValue(
      2 * treePosition,
      currentRangeStart,
      middleRangePoint,
      targetValForSearch
    );
    if (leftSubtreeResult !== null) {
      return leftSubtreeResult;
    }
    let rightSubtreeResult = querySuccessorValue(
      2 * treePosition + 1,
      middleRangePoint + 1,
      currentRangeEnd,
      targetValForSearch
    );
    return rightSubtreeResult;
  }

  initializeSegmentTree(1, 1, valueCount);

  let currentMaximumDepth = 0;
  for (
    let currentOrderIndex = 0;
    currentOrderIndex < valueCount;
    currentOrderIndex++
  ) {
    const currentInsertionValue = order[currentOrderIndex];
    valueInsertionTimes[currentInsertionValue] = currentOrderIndex;

    let selectedParentCandidate = null;

    const leftSideNeighbor = queryPredecessorValue(
      1,
      1,
      valueCount,
      currentInsertionValue
    );
    const rightSideNeighbor = querySuccessorValue(
      1,
      1,
      valueCount,
      currentInsertionValue
    );

    if (leftSideNeighbor !== null && rightSideNeighbor !== null) {
      if (
        valueInsertionTimes[leftSideNeighbor] >
        valueInsertionTimes[rightSideNeighbor]
      ) {
        selectedParentCandidate = leftSideNeighbor;
      } else {
        selectedParentCandidate = rightSideNeighbor;
      }
    } else if (leftSideNeighbor !== null) {
      selectedParentCandidate = leftSideNeighbor;
    } else if (rightSideNeighbor !== null) {
      selectedParentCandidate = rightSideNeighbor;
    }

    if (selectedParentCandidate === null) {
      nodeDepths[currentInsertionValue] = 1;
    } else {
      nodeDepths[currentInsertionValue] =
        nodeDepths[selectedParentCandidate] + 1;
    }

    currentMaximumDepth = Math.max(
      currentMaximumDepth,
      nodeDepths[currentInsertionValue]
    );
    updateSegmentTreeValue(1, 1, valueCount, currentInsertionValue);
  }

  return currentMaximumDepth;
};
