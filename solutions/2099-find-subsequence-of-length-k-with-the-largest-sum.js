/**
 * Find Subsequence Of Length K With The Largest Sum
 * Intuition: The subsequence with the largest sum must be composed of the k largest numbers from the input array. To preserve the original relative order, we first identify these k largest numbers along with their initial positions, and then reorder them by their original positions.
 * Approach:
 * 1. Create a preliminary array of objects. Each object will store a number's 'value' and its 'originalPosition' (index) from the input `nums` array. This step ensures that we retain the crucial index information.
 * 2. Initialize an empty array, which will serve as a dynamically sorted container (a min-heap simulation) to hold the `k` largest elements encountered so far. This container will be kept sorted by the 'value' of its elements in ascending order.
 * 3. Iterate through the preliminary array of objects created in step 1. For each object:
 *    a. If the dynamically sorted container has fewer than `k` elements, add the current object to it, maintaining its sorted order by 'value'. This involves finding the correct insertion point using a `while` loop and then using `splice`.
 *    b. If the container already has `k` elements, compare the current object's 'value' with the 'value' of the smallest element in the container (which is at index 0 due to the ascending sort). If the current object's 'value' is greater, remove the smallest element from the container using `shift()` and then add the current object, again maintaining the sorted order by 'value' using a `while` loop for insertion point and `splice`.
 * 4. After processing all elements from the input `nums` array, the dynamically sorted container will hold exactly `k` objects, representing the `k` largest numbers and their original positions.
 * 5. Sort this container array by the 'originalPosition' of its objects in ascending order. This step reconstructs the subsequence in the correct relative order as it appeared in the `nums` array.
 * 6. Finally, iterate through this sorted container and extract only the 'value' from each object, pushing it into a new result array. This new array is the desired subsequence.
 * Dry Run:
 * nums = [2, 1, 3, 3], k = 2
 *
 * 1. Create preliminary array:
 *    indexedNumbers = [{value: 2, originalPosition: 0}, {value: 1, originalPosition: 1}, {value: 3, originalPosition: 2}, {value: 3, originalPosition: 3}]
 *
 * 2. Initialize topKValues = [] (our min-heap simulation)
 *
 * 3. Iterate through indexedNumbers:
 *    a. Processing {value: 2, originalPosition: 0}:
 *       topKValues.length (0) < k (2). Insert {value: 2, originalPosition: 0} at index 0.
 *       topKValues = [{value: 2, originalPosition: 0}]
 *    b. Processing {value: 1, originalPosition: 1}:
 *       topKValues.length (1) < k (2). Insert {value: 1, originalPosition: 1}. It's smaller than {value: 2}, so it goes at index 0.
 *       topKValues = [{value: 1, originalPosition: 1}, {value: 2, originalPosition: 0}]
 *    c. Processing {value: 3, originalPosition: 2}:
 *       topKValues.length (2) == k (2). Current value (3) > topKValues[0].value (1).
 *       Remove topKValues[0] ({value: 1, originalPosition: 1}).
 *       topKValues = [{value: 2, originalPosition: 0}]
 *       Insert {value: 3, originalPosition: 2}. It's larger than {value: 2}, so it goes at index 1.
 *       topKValues = [{value: 2, originalPosition: 0}, {value: 3, originalPosition: 2}]
 *    d. Processing {value: 3, originalPosition: 3}:
 *       topKValues.length (2) == k (2). Current value (3) > topKValues[0].value (2).
 *       Remove topKValues[0] ({value: 2, originalPosition: 0}).
 *       topKValues = [{value: 3, originalPosition: 2}]
 *       Insert {value: 3, originalPosition: 3}. It's equal to {value: 3}, so it goes after it (at index 1).
 *       topKValues = [{value: 3, originalPosition: 2}, {value: 3, originalPosition: 3}]
 *
 * 4. After iteration, topKValues = [{value: 3, originalPosition: 2}, {value: 3, originalPosition: 3}]
 *
 * 5. Sort topKValues by 'originalPosition':
 *    [{value: 3, originalPosition: 2}, {value: 3, originalPosition: 3}] (already sorted by originalPosition)
 *
 * 6. Extract values:
 *    finalResult = [3, 3]
 *
 * Time Complexity: O(N*K)
 * Space Complexity: O(N)
 */
var maxSubsequence = function (nums, k) {
  let currentLength = nums.length;
  let indexedElements = new Array(currentLength);
  let indexCounter = 0;
  while (indexCounter < currentLength) {
    indexedElements[indexCounter] = {
      value: nums[indexCounter],
      originalPosition: indexCounter,
    };
    indexCounter++;
  }

  let kLargestElements = [];
  let elementIterator = 0;
  while (elementIterator < currentLength) {
    let currentElement = indexedElements[elementIterator];
    let currentNumericValue = currentElement.value;
    let currentElementPosition = currentElement.originalPosition;

    if (kLargestElements.length < k) {
      let insertionPointFinder = 0;
      let findPositionFlag = true;
      while (
        findPositionFlag &&
        insertionPointFinder < kLargestElements.length
      ) {
        if (
          currentNumericValue < kLargestElements[insertionPointFinder].value
        ) {
          findPositionFlag = false;
        } else {
          insertionPointFinder++;
        }
      }
      kLargestElements.splice(insertionPointFinder, 0, {
        value: currentNumericValue,
        originalPosition: currentElementPosition,
      });
    } else if (currentNumericValue > kLargestElements[0].value) {
      kLargestElements.shift();
      let secondInsertionPointFinder = 0;
      let findSecondPositionFlag = true;
      while (
        findSecondPositionFlag &&
        secondInsertionPointFinder < kLargestElements.length
      ) {
        if (
          currentNumericValue <
          kLargestElements[secondInsertionPointFinder].value
        ) {
          findSecondPositionFlag = false;
        } else {
          secondInsertionPointFinder++;
        }
      }
      kLargestElements.splice(secondInsertionPointFinder, 0, {
        value: currentNumericValue,
        originalPosition: currentElementPosition,
      });
    }
    elementIterator++;
  }

  kLargestElements.sort(
    (firstElement, secondElement) =>
      firstElement.originalPosition - secondElement.originalPosition,
  );

  let finalResultArray = [];
  let resultIndexPopulator = 0;
  while (resultIndexPopulator < kLargestElements.length) {
    finalResultArray.push(kLargestElements[resultIndexPopulator].value);
    resultIndexPopulator++;
  }

  return finalResultArray;
};
