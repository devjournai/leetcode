/**
 * Find The Index Of The Large Integer
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var getIndex = function (reader) {
  const arraySize = reader.length();
  let startIndex = 0;
  let endIndex = arraySize - 1;

  while (startIndex < endIndex) {
    const currentRange = endIndex - startIndex + 1;
    const middlePoint = Math.floor((startIndex + endIndex) / 2);

    if (currentRange % 2 === 1) {
      const comparisonResultA = reader.compareSub(
        startIndex,
        middlePoint - 1,
        middlePoint + 1,
        endIndex,
      );
      if (comparisonResultA === 0) {
        return middlePoint;
      } else if (comparisonResultA === 1) {
        endIndex = middlePoint - 1;
      } else {
        startIndex = middlePoint + 1;
      }
    } else {
      const comparisonResultB = reader.compareSub(
        startIndex,
        middlePoint,
        middlePoint + 1,
        endIndex,
      );
      if (comparisonResultB === 1) {
        endIndex = middlePoint;
      } else {
        startIndex = middlePoint + 1;
      }
    }
  }

  return startIndex;
};
