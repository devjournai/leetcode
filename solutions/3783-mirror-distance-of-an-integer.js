/**
 * Mirror Distance of an Integer
 * Time Complexity: O(log10(n))
 * Space Complexity: O(log10(n))
 */
var mirrorDistance = function (n) {
  const originalN = n;
  const nStr = n.toString();
  const reversedStr = nStr.split("").reverse().join("");
  const reversedN = parseInt(reversedStr, 10);
  return Math.abs(originalN - reversedN);
};
