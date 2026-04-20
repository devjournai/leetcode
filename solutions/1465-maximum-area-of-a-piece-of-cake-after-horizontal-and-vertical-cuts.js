/**
 * Maximum Area Of A Piece Of Cake After Horizontal And Vertical Cuts
 * Time Complexity: O(N log N + M log M)
 * Space Complexity: O(1)
 */
var maxArea = function (h, w, horizontalCuts, verticalCuts) {
  horizontalCuts.sort((firstH, secondH) => firstH - secondH);
  verticalCuts.sort((firstV, secondV) => firstV - secondV);

  let maximumPossibleHeight = Math.max(
    horizontalCuts[0],
    h - horizontalCuts[horizontalCuts.length - 1],
  );
  let maximumPossibleWidth = Math.max(
    verticalCuts[0],
    w - verticalCuts[verticalCuts.length - 1],
  );

  let horizontalIterator = 1;
  let totalHorizontalCuts = horizontalCuts.length;
  while (horizontalIterator < totalHorizontalCuts) {
    let heightDifference =
      horizontalCuts[horizontalIterator] -
      horizontalCuts[horizontalIterator - 1];
    maximumPossibleHeight = Math.max(maximumPossibleHeight, heightDifference);
    horizontalIterator++;
  }

  let verticalIterator = 1;
  let totalVerticalCuts = verticalCuts.length;
  while (verticalIterator < totalVerticalCuts) {
    let widthDifference =
      verticalCuts[verticalIterator] - verticalCuts[verticalIterator - 1];
    maximumPossibleWidth = Math.max(maximumPossibleWidth, widthDifference);
    verticalIterator++;
  }

  const modValue = 1000000007;
  return Number(
    (BigInt(maximumPossibleHeight) * BigInt(maximumPossibleWidth)) %
      BigInt(modValue),
  );
};
