/**
 * Count Number Of Teams
 * Intuition: Fix the middle soldier. Teams are (smaller on left × larger on right) plus (larger on left × smaller on right).
 * Approach: 1. For each middle index, count lower/higher ratings on the left and on the right. 2. Add lowerLeft*higherRight and higherLeft*lowerRight. 3. Return the total.
 * Dry Run: rating = [2,5,3,4,1].
 *   - Middle 5: left lower 1, right lower 3 / higher 0 → 1*0 + 0*3 = 0; middle 3: left lower 1 higher 1, right lower 1 higher 1 → 1+1=2; plus other middles. Total 3.
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
