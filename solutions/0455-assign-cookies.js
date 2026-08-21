/**
 * Assign Cookies
 * Intuition: After sorting both arrays, give each child the smallest remaining cookie that meets their greed.
 * Approach: 1. Sort `g` and `s` ascending. 2. Two pointers: if cookie ≥ greed, count content and advance child. 3. Always advance `cookiePointer`. 4. Return `contentChildrenCount`.
 * Dry Run: g=[1,2,3], s=[1,1]. Cookie 1 feeds child 1; next cookie 1 cannot feed 2. Return 1.
 * Time Complexity: O(g.length log g.length + s.length log s.length)
 * Space Complexity: O(1)
 */
var findContentChildren = function (g, s) {
  g.sort((firstElement, secondElement) => firstElement - secondElement);
  s.sort((initialValue, subsequentValue) => initialValue - subsequentValue);

  let childPointer = 0;
  let cookiePointer = 0;
  let contentChildrenCount = 0;

  while (childPointer < g.length && cookiePointer < s.length) {
    if (s[cookiePointer] >= g[childPointer]) {
      contentChildrenCount++;
      childPointer++;
    }
    cookiePointer++;
  }

  return contentChildrenCount;
};
