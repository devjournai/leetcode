/**
 * Minimum Swaps To Group All 1s Together Ii
 * Intuition: To group all '1's in a circular array, they must occupy a contiguous window whose length equals the total count of '1's. The problem then reduces to finding a window of this specific size that contains the minimum number of '0's. Each '0' in this optimal window represents a swap needed with a '1' from outside to achieve the grouped state.
 * Approach: 1. Calculate the total count of '1's in the input array, let this be `totalOnesCount`. This value will also define the size of our sliding window. 2. Initialize `currentWindowZeroCount` by iterating through the first `totalOnesCount` elements of the array and counting the '0's. 3. Set `minSwapsResult` to this `currentWindowZeroCount`. 4. Slide a window of size `totalOnesCount` across the circular array. For each step, conceptually remove the element leaving the window from the left and add the element entering the window from the right. Update `currentWindowZeroCount` accordingly (decrement if the leaving element was '0', increment if the entering element is '0'). 5. At each step, update `minSwapsResult` with the minimum of its current value and `currentWindowZeroCount`. 6. The modulo operator is used to handle the circularity when accessing array elements.
 * Dry Run: nums = [0,1,0,1,1,0,0]
 *   arrayLength = 7
 *   totalOnesCount = 3 (from 0,1,0,1,1,0,0)
 *
 *   1. Initialize first window (size 3):
 *      nums[0]=0, nums[1]=1, nums[2]=0
 *      currentWindowZeroCount = 2
 *      minSwapsResult = 2
 *
 *   2. Slide window (loop from windowSlideIterator = 1 to 6):
 *      - windowSlideIterator = 1:
 *        leavingElementIndex = (1-1)%7 = 0. nums[0]=0. currentWindowZeroCount decrements to 1.
 *        enteringElementIndex = (1+3-1)%7 = 3. nums[3]=1. currentWindowZeroCount remains 1.
 *        minSwapsResult = min(2, 1) = 1.
 *        (Window: [1,0,1] from nums[1,2,3])
 *
 *      - windowSlideIterator = 2:
 *        leavingElementIndex = (2-1)%7 = 1. nums[1]=1. currentWindowZeroCount remains 1.
 *        enteringElementIndex = (2+3-1)%7 = 4. nums[4]=1. currentWindowZeroCount remains 1.
 *        minSwapsResult = min(1, 1) = 1.
 *        (Window: [0,1,1] from nums[2,3,4])
 *
 *      - windowSlideIterator = 3:
 *        leavingElementIndex = (3-1)%7 = 2. nums[2]=0. currentWindowZeroCount decrements to 0.
 *        enteringElementIndex = (3+3-1)%7 = 5. nums[5]=0. currentWindowZeroCount increments to 1.
 *        minSwapsResult = min(1, 1) = 1.
 *        (Window: [1,1,0] from nums[3,4,5])
 *
 *      - windowSlideIterator = 4:
 *        leavingElementIndex = (4-1)%7 = 3. nums[3]=1. currentWindowZeroCount remains 1.
 *        enteringElementIndex = (4+3-1)%7 = 6. nums[6]=0. currentWindowZeroCount increments to 2.
 *        minSwapsResult = min(1, 2) = 1.
 *        (Window: [1,0,0] from nums[4,5,6])
 *
 *      - windowSlideIterator = 5:
 *        leavingElementIndex = (5-1)%7 = 4. nums[4]=1. currentWindowZeroCount remains 2.
 *        enteringElementIndex = (5+3-1)%7 = 0. nums[0]=0. currentWindowZeroCount increments to 3.
 *        minSwapsResult = min(1, 3) = 1.
 *        (Window: [0,0,0] from nums[5,6,0])
 *
 *      - windowSlideIterator = 6:
 *        leavingElementIndex = (6-1)%7 = 5. nums[5]=0. currentWindowZeroCount decrements to 2.
 *        enteringElementIndex = (6+3-1)%7 = 1. nums[1]=1. currentWindowZeroCount remains 2.
 *        minSwapsResult = min(1, 2) = 1.
 *        (Window: [0,0,1] from nums[6,0,1])
 *
 *   3. All windows checked. Return minSwapsResult = 1.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minSwaps = function (nums) {
  const arrayLength = nums.length;

  let totalOnesCount = 0;
  for (let countIterator = 0; countIterator < arrayLength; countIterator++) {
    totalOnesCount += nums[countIterator];
  }

  if (totalOnesCount === 0 || totalOnesCount === arrayLength) {
    return 0;
  }

  let currentWindowZeroCount = 0;
  for (
    let initialWindowIterator = 0;
    initialWindowIterator < totalOnesCount;
    initialWindowIterator++
  ) {
    if (nums[initialWindowIterator] === 0) {
      currentWindowZeroCount++;
    }
  }

  let minSwapsResult = currentWindowZeroCount;

  for (
    let windowSlideIterator = 1;
    windowSlideIterator < arrayLength;
    windowSlideIterator++
  ) {
    const leavingElementIndex = windowSlideIterator - 1;
    const enteringElementIndex =
      (windowSlideIterator + totalOnesCount - 1) % arrayLength;

    const leavingElementValue = nums[leavingElementIndex];
    const enteringElementValue = nums[enteringElementIndex];

    if (leavingElementValue === 0) {
      currentWindowZeroCount--;
    }
    if (enteringElementValue === 0) {
      currentWindowZeroCount++;
    }

    minSwapsResult = Math.min(minSwapsResult, currentWindowZeroCount);
  }

  return minSwapsResult;
};
