/**
 * Sliding Window Maximum
 * Intuition: A deque of indices in decreasing value order keeps the window maximum at the front. Drop indices that left the window, and drop smaller values from the back that can never be the max after the new element arrives.
 * Approach: 1. For each `currentIterator`, drop deque-front indices `<= currentIterator - windowSize`. 2. Pop the back while its value is less than `inputNumbers[currentIterator]`. 3. Push the current index. 4. Once `currentIterator >= windowSize - 1`, append `inputNumbers[maxIndexDeque[0]]`. 5. Return `outputResults`.
 * Dry Run: nums = [1, 3, -1, -3, 5], k = 3.
 *   - i=0: deque [0]. i=1: 1<3 so pop 0, deque [1]. i=2: 3>-1 so keep [1,2]; emit nums[1]=3.
 *   - i=3: drop none,  -1>-3 so [1,2,3]; emit 3. i=4: drop 1 (out of window), pop 2 and 3 (both <5), deque [4]; emit 5. Return [3, 3, 5].
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */
var maxSlidingWindow = function (inputNumbers, windowSize) {
  const outputResults = [];
  const maxIndexDeque = [];

  let currentIterator = 0;
  const totalElements = inputNumbers.length;

  while (currentIterator < totalElements) {
    while (
      maxIndexDeque.length > 0 &&
      maxIndexDeque[0] <= currentIterator - windowSize
    ) {
      maxIndexDeque.shift();
    }

    while (
      maxIndexDeque.length > 0 &&
      inputNumbers[maxIndexDeque[maxIndexDeque.length - 1]] <
        inputNumbers[currentIterator]
    ) {
      maxIndexDeque.pop();
    }

    maxIndexDeque.push(currentIterator);

    if (currentIterator >= windowSize - 1) {
      outputResults.push(inputNumbers[maxIndexDeque[0]]);
    }

    currentIterator++;
  }

  return outputResults;
};
