/**
 * Range Addition
 * Time Complexity: O(length + updates.length)
 * Space Complexity: O(length)
*/
var getModifiedArray = function (length, updates) {
  const modifiedArrayElements = new Array(length).fill(0);

  for (const updateOperation of updates) {
    const startRangeIndex = updateOperation[0];
    const endRangeIndex = updateOperation[1];
    const incrementValue = updateOperation[2];

    modifiedArrayElements[startRangeIndex] += incrementValue;

    if (endRangeIndex + 1 < length) {
      modifiedArrayElements[endRangeIndex + 1] -= incrementValue;
    }
  }

  for (let currentPosition = 1; currentPosition < length; currentPosition++) {
    modifiedArrayElements[currentPosition] += modifiedArrayElements[currentPosition - 1];
  }

  return modifiedArrayElements;
};