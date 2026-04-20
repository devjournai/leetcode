/**
 * Last Moment Before All Ants Fall Out Of A Plank
 * Time Complexity: O(L + R)
 * Space Complexity: O(1)
 */
var getLastMoment = function (n, left, right) {
  let finalMoment = 0;

  for (const leftAntLocation of left) {
    finalMoment = Math.max(finalMoment, leftAntLocation);
  }

  right.forEach((rightAntLocation) => {
    finalMoment = Math.max(finalMoment, n - rightAntLocation);
  });

  return finalMoment;
};
