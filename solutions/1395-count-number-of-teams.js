/**
 * Count Number Of Teams
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var numTeams = function (rating) {
  let finalTeamCount = 0;
  const arrayLength = rating.length;

  for (
    let currentMiddleIndex = 1;
    currentMiddleIndex < arrayLength - 1;
    currentMiddleIndex++
  ) {
    let lowerLeftCount = 0;
    let higherLeftCount = 0;
    let lowerRightCount = 0;
    let higherRightCount = 0;

    for (
      let currentLeftIndex = 0;
      currentLeftIndex < currentMiddleIndex;
      currentLeftIndex++
    ) {
      if (rating[currentLeftIndex] < rating[currentMiddleIndex]) {
        lowerLeftCount++;
      } else {
        higherLeftCount++;
      }
    }

    for (
      let currentRightIndex = currentMiddleIndex + 1;
      currentRightIndex < arrayLength;
      currentRightIndex++
    ) {
      if (rating[currentRightIndex] < rating[currentMiddleIndex]) {
        lowerRightCount++;
      } else {
        higherRightCount++;
      }
    }

    finalTeamCount += lowerLeftCount * higherRightCount;
    finalTeamCount += higherLeftCount * lowerRightCount;
  }

  return finalTeamCount;
};
