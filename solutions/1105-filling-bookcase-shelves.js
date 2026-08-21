/**
 * Filling Bookcase Shelves
 * Intuition: dp[i] is min height to place the first i books. The last shelf can hold any suffix of those books that still fits the width; try every feasible shelf start.
 * Approach: 1. dp[0]=0. 2. For i=1..n, start a shelf with book i and dp[i]=dp[i-1]+height. 3. Walk leftover books leftward while width fits, updating max height and dp[i]. 4. Return dp[n].
 * Dry Run: books [[1,1],[2,3],[2,3]] width 4. Last shelf can take all three (width 5? 1+2+2=5>4) so [1] then [2,3]+[2,3] height 1+3=4, or other splits; min is 4.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var minHeightShelves = function (bookDimensions, shelfMaximumWidth) {
  const totalBooks = bookDimensions.length;
  const minimumTotalHeights = new Array(totalBooks + 1).fill(0);

  for (let bookCountIdx = 1; bookCountIdx <= totalBooks; bookCountIdx++) {
    const currentBookActualIndex = bookCountIdx - 1;
    let shelfCurrentWidth = bookDimensions[currentBookActualIndex][0];
    let shelfCurrentMaximumHeight = bookDimensions[currentBookActualIndex][1];

    minimumTotalHeights[bookCountIdx] =
      minimumTotalHeights[bookCountIdx - 1] + shelfCurrentMaximumHeight;

    for (
      let previousBookToCombineIndex = currentBookActualIndex - 1;
      previousBookToCombineIndex >= 0;
      previousBookToCombineIndex--
    ) {
      const addedBookThickness = bookDimensions[previousBookToCombineIndex][0];
      const addedBookHeight = bookDimensions[previousBookToCombineIndex][1];

      if (shelfCurrentWidth + addedBookThickness <= shelfMaximumWidth) {
        shelfCurrentWidth += addedBookThickness;
        shelfCurrentMaximumHeight = Math.max(
          shelfCurrentMaximumHeight,
          addedBookHeight
        );

        minimumTotalHeights[bookCountIdx] = Math.min(
          minimumTotalHeights[bookCountIdx],
          minimumTotalHeights[previousBookToCombineIndex] +
            shelfCurrentMaximumHeight
        );
      } else {
        break;
      }
    }
  }

  return minimumTotalHeights[totalBooks];
};
