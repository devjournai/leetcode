/**
 * H Index II
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var hIndex = function (citations) {
  let firstPointer = 0;
  let lastPointer = citations.length - 1;
  const numberOfPapers = citations.length;

  while (firstPointer <= lastPointer) {
    const midPoint = Math.floor((firstPointer + lastPointer) / 2);
    const papersFromMid = numberOfPapers - midPoint;

    if (citations[midPoint] >= papersFromMid) {
      lastPointer = midPoint - 1;
    } else {
      firstPointer = midPoint + 1;
    }
  }

  return numberOfPapers - firstPointer;
};
