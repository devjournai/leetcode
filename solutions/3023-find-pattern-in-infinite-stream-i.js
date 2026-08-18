/**
 * Find Pattern In Infinite Stream I
 * Intuition: We need to maintain a window of bits from the stream, the size of which matches the pattern length. We continuously slide this window, comparing its contents with the given pattern until a match is found.
 * Approach: 1. Initialize a dynamic array (a sliding window) to store bits read from the stream. 2. Fill this window with the first `pattern.length` bits from the stream. 3. Define a helper function to compare two arrays element by element. 4. Enter a loop that continues until a match is found. In each iteration, compare the current window content with the pattern using the helper function. If they match, return the current starting index. If not, remove the oldest bit from the front of the window, read a new bit from the stream, add it to the back of the window, and increment the starting index.
 * Dry Run: stream = [0, 1, 0, 1, 0, ...], pattern = [1, 0]
 *   1. sequenceDesiredLength = 2, observedSegment = [], currentStreamIndex = 0, matchFound = false.
 *   2. Initial fill (for loop):
 *      - elementCounter = 0: observedSegment.push(stream.next()) -> observedSegment = [0]
 *      - elementCounter = 1: observedSegment.push(stream.next()) -> observedSegment = [0, 1]
 *   3. Main loop (while !matchFound):
 *      - Iteration 1:
 *        - verifySegmentMatch([0, 1], [1, 0]):
 *          - iterationCounter = 0: 0 !== 1, returns false.
 *        - observedSegment.shift() -> [1]
 *        - observedSegment.push(stream.next()) (reads 0) -> [1, 0]
 *        - currentStreamIndex++ -> 1
 *      - Iteration 2:
 *        - verifySegmentMatch([1, 0], [1, 0]):
 *          - iterationCounter = 0: 1 === 1
 *          - iterationCounter = 1: 0 === 0
 *          - Loop ends, returns true.
 *        - matchFound = true
 *        - return currentStreamIndex (1).
 * Time Complexity: O(K * M)
 * Space Complexity: O(M)
 */
var findPattern = function (dataStream, targetSequence) {
  const sequenceDesiredLength = targetSequence.length;
  let observedSegment = [];
  let currentStreamIndex = 0;

  for (
    let elementCounter = 0;
    elementCounter < sequenceDesiredLength;
    elementCounter++
  ) {
    observedSegment.push(dataStream.next());
  }

  const verifySegmentMatch = (candidateSegment, comparisonTarget) => {
    let iterationCounter = 0;
    while (iterationCounter < candidateSegment.length) {
      if (
        candidateSegment[iterationCounter] !==
        comparisonTarget[iterationCounter]
      ) {
        return false;
      }
      iterationCounter++;
    }
    return true;
  };

  let matchFound = false;
  while (!matchFound) {
    if (verifySegmentMatch(observedSegment, targetSequence)) {
      matchFound = true;
      return currentStreamIndex;
    }

    observedSegment.shift();
    observedSegment.push(dataStream.next());
    currentStreamIndex++;
  }
};
