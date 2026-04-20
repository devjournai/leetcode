/**
 * Sort An Array
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var sortArray = function (nums) {
  if (nums.length <= 1) {
    return nums;
  }

  const recurseAndSort = (dataSequence, firstIdx, lastIdx) => {
    if (firstIdx >= lastIdx) {
      return;
    }

    const dividingPoint = Math.floor((firstIdx + lastIdx) / 2);

    recurseAndSort(dataSequence, firstIdx, dividingPoint);

    recurseAndSort(dataSequence, dividingPoint + 1, lastIdx);

    const combineSortedHalves = (
      originalArray,
      leftStartPoint,
      leftEndPoint,
      rightStartPoint,
      rightEndPoint,
    ) => {
      const leftSegmentLength = leftEndPoint - leftStartPoint + 1;
      const rightSegmentLength = rightEndPoint - rightStartPoint + 1;

      const tempLeftStorage = new Array(leftSegmentLength);
      const tempRightStorage = new Array(rightSegmentLength);

      for (
        let copyIndexLeft = 0;
        copyIndexLeft < leftSegmentLength;
        copyIndexLeft++
      ) {
        tempLeftStorage[copyIndexLeft] =
          originalArray[leftStartPoint + copyIndexLeft];
      }

      for (
        let copyIndexRight = 0;
        copyIndexRight < rightSegmentLength;
        copyIndexRight++
      ) {
        tempRightStorage[copyIndexRight] =
          originalArray[rightStartPoint + copyIndexRight];
      }

      let ptrLeftHalf = 0;
      let ptrRightHalf = 0;
      let ptrMainArray = leftStartPoint;

      while (
        ptrLeftHalf < leftSegmentLength &&
        ptrRightHalf < rightSegmentLength
      ) {
        if (tempLeftStorage[ptrLeftHalf] <= tempRightStorage[ptrRightHalf]) {
          originalArray[ptrMainArray] = tempLeftStorage[ptrLeftHalf];
          ptrLeftHalf++;
        } else {
          originalArray[ptrMainArray] = tempRightStorage[ptrRightHalf];
          ptrRightHalf++;
        }
        ptrMainArray++;
      }

      while (ptrLeftHalf < leftSegmentLength) {
        originalArray[ptrMainArray] = tempLeftStorage[ptrLeftHalf];
        ptrLeftHalf++;
        ptrMainArray++;
      }

      while (ptrRightHalf < rightSegmentLength) {
        originalArray[ptrMainArray] = tempRightStorage[ptrRightHalf];
        ptrRightHalf++;
        ptrMainArray++;
      }
    };

    combineSortedHalves(
      dataSequence,
      firstIdx,
      dividingPoint,
      dividingPoint + 1,
      lastIdx,
    );
  };

  const totalElementsCount = nums.length;
  recurseAndSort(nums, 0, totalElementsCount - 1);

  return nums;
};
