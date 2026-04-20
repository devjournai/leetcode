/**
 * Rank Transform Of An Array
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var arrayRankTransform = function (arr) {
  const len = arr.length;
  if (len === 0) {
    return [];
  }

  const indexedElements = new Array(len);
  for (let k = 0; k < len; ++k) {
    indexedElements[k] = { value: arr[k], originalIndex: k };
  }

  const sortedElements = [...indexedElements].sort(
    (firstElement, secondElement) => {
      return firstElement.value - secondElement.value;
    },
  );

  const resultArray = new Array(len);
  let rankCounter = 1;
  let previousUniqueValue = null;

  for (let advanceIndex = 0; advanceIndex < len; ++advanceIndex) {
    const elementInfo = sortedElements[advanceIndex];
    const valToRank = elementInfo.value;
    const originalPos = elementInfo.originalIndex;

    if (previousUniqueValue === null || valToRank !== previousUniqueValue) {
      previousUniqueValue = valToRank;
      resultArray[originalPos] = rankCounter;
      rankCounter++;
    } else {
      resultArray[originalPos] = rankCounter - 1;
    }
  }

  return resultArray;
};
