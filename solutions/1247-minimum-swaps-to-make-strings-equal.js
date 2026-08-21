/**
 * Minimum Swaps To Make Strings Equal
 * Intuition: Only mismatched positions matter. Two x/y mismatches swap in one move; leftover one xy and one yx need two swaps. An odd total mismatch count is impossible.
 * Approach: 1. Count countXYMismatch (s1=x,s2=y) and countYXMismatch. 2. If their sum is odd, return -1. 3. Pair xy mismatches in twos (floor/2) and same for yx. 4. If one xy remains, add 2 swaps. 5. Return the total.
 * Dry Run: s1 = "xx", s2 = "yy"
 *   XY=2, YX=0, total even. resolvedXYPairs=1, remainingXY=0. swaps=1. Return 1.
 *   s1="xy", s2="yx": XY=1, YX=1. pairs=0, remainingXY=1, swaps=2. Return 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumSwap = function (s1, s2) {
  let countXYMismatch = 0;
  let countYXMismatch = 0;

  let stringLength = s1.length;

  for (let charIterator = 0; charIterator < stringLength; charIterator++) {
    let charA = s1[charIterator];
    let charB = s2[charIterator];

    if (charA === "x" && charB === "y") {
      countXYMismatch++;
    }
    if (charA === "y" && charB === "x") {
      countYXMismatch++;
    }
  }

  let totalMismatchCount = countXYMismatch + countYXMismatch;

  if (totalMismatchCount % 2 !== 0) {
    return -1;
  }

  let resolvedXYPairs = Math.floor(countXYMismatch / 2);
  let resolvedYXPairs = Math.floor(countYXMismatch / 2);

  let remainingXY = countXYMismatch % 2;

  let totalSwapsRequired = resolvedXYPairs + resolvedYXPairs;

  totalSwapsRequired += remainingXY * 2;

  return totalSwapsRequired;
};
