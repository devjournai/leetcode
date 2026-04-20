/**
 * Valid Boomerang
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var isBoomerang = function (points) {
  const pointFirstX = points[0][0];
  const pointFirstY = points[0][1];
  const pointSecondX = points[1][0];
  const pointSecondY = points[1][1];
  const pointThirdX = points[2][0];
  const pointThirdY = points[2][1];

  const differenceYOneTwo = pointFirstY - pointSecondY;
  const differenceXTwoThree = pointSecondX - pointThirdX;
  const differenceXOneTwo = pointFirstX - pointSecondX;
  const differenceYTwoThree = pointSecondY - pointThirdY;

  const crossProductFirstPart = differenceYOneTwo * differenceXTwoThree;
  const crossProductSecondPart = differenceXOneTwo * differenceYTwoThree;

  return crossProductFirstPart !== crossProductSecondPart;
};
