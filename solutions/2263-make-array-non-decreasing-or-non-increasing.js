/**
* Make Array Non Decreasing Or Non Increasing
* Intuition: This problem can be solved by dynamic programming. We need to find the minimum operations for two cases: making the array non-decreasing, and making it non-increasing. The non-increasing case can be transformed into a non-decreasing problem by reversing the input array. For the non-decreasing case, we iterate through the array elements, and for each element, we consider transforming it to one of the unique sorted values from the original array. The DP state for an element at index `i` transformed to a value `V` relies on the minimum costs of transforming the previous element `i-1` to any value `V'` such that `V' <= V`.
* Approach: 1. Extract all unique values from `nums`, sort them, and store them in `possibleTargetValues`. These will be the only values we consider transforming `nums[i]` into. 2. Define a helper function `calculateMinOperations` that takes an array (`originalNums` for non-decreasing, or `reversedNums` for non-increasing) and `possibleTargetValues`. 3. Inside `calculateMinOperations`, initialize a `dpMap` to store the minimum cost to make the prefix of the input array non-decreasing, with the current element transformed to a value less than or equal to a given `targetValue`. For the first element, costs are simply the absolute difference. 4. Iterate through the input array. For each `currentElementValue`, iterate through `possibleTargetValues`. Maintain a `currentPrefixMinimumResult` that tracks the minimum cost found so far for the current `currentElementValue`, ensuring the non-decreasing constraint. Update `updatedDynamicProgrammingMap` with `currentPrefixMinimumResult`. 5. After processing all `possibleTargetValues` for `currentElementValue`, update `dpMap` with `updatedDynamicProgrammingMap`. 6. The final minimum cost for the non-decreasing scenario is `dpMap.get(Math.max(...possibleTargetValues))`. 7. Call `calculateMinOperations` twice: once with `nums` for non-decreasing, and once with `[...nums].reverse()` for non-increasing. Return the minimum of these two results.
* Dry Run: nums = [2, 1, 3]
  possibleTargetValues = [1, 2, 3]
  dpMap: {1: 0, 2: 0, 3: 0} (initial for element before nums[0])
        
  currentElementValue = 2
  updatedDynamicProgrammingMap: {}
  currentPrefixMinimumResult = Infinity
  levelIterator = 1: prevCost = dpMap.get(1)=0, absDiff = |2-1|=1. currentPrefixMinimumResult = min(Infinity, 0+1) = 1. updatedDynamicProgrammingMap.set(1, 1).
  levelIterator = 2: prevCost = dpMap.get(2)=0, absDiff = |2-2|=0. currentPrefixMinimumResult = min(1, 0+0) = 0. updatedDynamicProgrammingMap.set(2, 0).
  levelIterator = 3: prevCost = dpMap.get(3)=0, absDiff = |2-3|=1. currentPrefixMinimumResult = min(0, 0+1) = 0. updatedDynamicProgrammingMap.set(3, 0).
  dpMap becomes {1: 1, 2: 0, 3: 0}
        
  currentElementValue = 1
  updatedDynamicProgrammingMap: {}
  currentPrefixMinimumResult = Infinity
  levelIterator = 1: prevCost = dpMap.get(1)=1, absDiff = |1-1|=0. currentPrefixMinimumResult = min(Infinity, 1+0) = 1. updatedDynamicProgrammingMap.set(1, 1).
  levelIterator = 2: prevCost = dpMap.get(2)=0, absDiff = |1-2|=1. currentPrefixMinimumResult = min(1, 0+1) = 1. updatedDynamicProgrammingMap.set(2, 1).
  levelIterator = 3: prevCost = dpMap.get(3)=0, absDiff = |1-3|=2. currentPrefixMinimumResult = min(1, 0+2) = 1. updatedDynamicProgrammingMap.set(3, 1).
  dpMap becomes {1: 1, 2: 1, 3: 1}
        
  currentElementValue = 3
  updatedDynamicProgrammingMap: {}
  currentPrefixMinimumResult = Infinity
  levelIterator = 1: prevCost = dpMap.get(1)=1, absDiff = |3-1|=2. currentPrefixMinimumResult = min(Infinity, 1+2) = 3. updatedDynamicProgrammingMap.set(1, 3).
  levelIterator = 2: prevCost = dpMap.get(2)=1, absDiff = |3-2|=1. currentPrefixMinimumResult = min(3, 1+1) = 2. updatedDynamicProgrammingMap.set(2, 2).
  levelIterator = 3: prevCost = dpMap.get(3)=1, absDiff = |3-3|=0. currentPrefixMinimumResult = min(2, 1+0) = 1. updatedDynamicProgrammingMap.set(3, 1).
  dpMap becomes {1: 3, 2: 2, 3: 1}
  nonDecreasingCost = dpMap.get(3) = 1
        
  Calculate non-increasing cost (arr = [3, 1, 2])
  dpMap: {1: 0, 2: 0, 3: 0}
        
  currentElementValue = 3
  updatedDynamicProgrammingMap: {}
  currentPrefixMinimumResult = Infinity
  levelIterator = 1: prevCost = dpMap.get(1)=0, absDiff = |3-1|=2. currentPrefixMinimumResult = min(Infinity, 0+2) = 2. updatedDynamicProgrammingMap.set(1, 2).
  levelIterator = 2: prevCost = dpMap.get(2)=0, absDiff = |3-2|=1. currentPrefixMinimumResult = min(2, 0+1) = 1. updatedDynamicProgrammingMap.set(2, 1).
  levelIterator = 3: prevCost = dpMap.get(3)=0, absDiff = |3-3|=0. currentPrefixMinimumResult = min(1, 0+0) = 0. updatedDynamicProgrammingMap.set(3, 0).
  dpMap becomes {1: 2, 2: 1, 3: 0}
        
  currentElementValue = 1
  updatedDynamicProgrammingMap: {}
  currentPrefixMinimumResult = Infinity
  levelIterator = 1: prevCost = dpMap.get(1)=2, absDiff = |1-1|=0. currentPrefixMinimumResult = min(Infinity, 2+0) = 2. updatedDynamicProgrammingMap.set(1, 2).
  levelIterator = 2: prevCost = dpMap.get(2)=1, absDiff = |1-2|=1. currentPrefixMinimumResult = min(2, 1+1) = 2. updatedDynamicProgrammingMap.set(2, 2).
  levelIterator = 3: prevCost = dpMap.get(3)=0, absDiff = |1-3|=2. currentPrefixMinimumResult = min(2, 0+2) = 2. updatedDynamicProgrammingMap.set(3, 2).
  dpMap becomes {1: 2, 2: 2, 3: 2}
        
  currentElementValue = 2
  updatedDynamicProgrammingMap: {}
  currentPrefixMinimumResult = Infinity
  levelIterator = 1: prevCost = dpMap.get(1)=2, absDiff = |2-1|=1. currentPrefixMinimumResult = min(Infinity, 2+1) = 3. updatedDynamicProgrammingMap.set(1, 3).
  levelIterator = 2: prevCost = dpMap.get(2)=2, absDiff = |2-2|=0. currentPrefixMinimumResult = min(3, 2+0) = 2. updatedDynamicProgrammingMap.set(2, 2).
  levelIterator = 3: prevCost = dpMap.get(3)=2, absDiff = |2-3|=1. currentPrefixMinimumResult = min(2, 2+1) = 2. updatedDynamicProgrammingMap.set(3, 2).
  dpMap becomes {1: 3, 2: 2, 3: 2}
  nonIncreasingCost = dpMap.get(3) = 2
  Overall minimum = min(1, 2) = 1
* Time Complexity: O(N * M)
* Space Complexity: O(M)
*/
var convertArray = function (nums) {
  const possibleTargetValues = [...new Set(nums)].sort(
    (valueA, valueB) => valueA - valueB,
  );
  const reversedInputNums = [...nums].reverse();

  function calculateMinOperations(arr, targetLevels) {
    const dynamicProgrammingMap = new Map();
    for (const levelIterator of targetLevels) {
      dynamicProgrammingMap.set(levelIterator, 0);
    }

    for (const currentElementValue of arr) {
      let currentPrefixMinimumResult = Infinity;
      const updatedDynamicProgrammingMap = new Map();

      for (const levelValueIterator of targetLevels) {
        currentPrefixMinimumResult = Math.min(
          currentPrefixMinimumResult,
          dynamicProgrammingMap.get(levelValueIterator) +
            Math.abs(currentElementValue - levelValueIterator),
        );
        updatedDynamicProgrammingMap.set(
          levelValueIterator,
          currentPrefixMinimumResult,
        );
      }

      for (const [levelKey, valueForMapItem] of updatedDynamicProgrammingMap) {
        dynamicProgrammingMap.set(levelKey, valueForMapItem);
      }
    }

    return dynamicProgrammingMap.get(Math.max(...targetLevels));
  }

  const nonDecreasingCost = calculateMinOperations(nums, possibleTargetValues);
  const nonIncreasingCost = calculateMinOperations(
    reversedInputNums,
    possibleTargetValues,
  );

  return Math.min(nonDecreasingCost, nonIncreasingCost);
};
