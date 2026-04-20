/**
 * Find The Derangement Of An Array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findDerangement = function (n) {
  const moduloConstant = 1000000007;

  if (n === 1) {
    return 0;
  }
  if (n === 2) {
    return 1;
  }

  let derangementBeforeLast = 0;
  let derangementLast = 1;

  for (let currentCount = 3; currentCount <= n; currentCount++) {
    const nextDerangement =
      ((currentCount - 1) * (derangementLast + derangementBeforeLast)) %
      moduloConstant;
    derangementBeforeLast = derangementLast;
    derangementLast = nextDerangement;
  }

  return derangementLast;
};
