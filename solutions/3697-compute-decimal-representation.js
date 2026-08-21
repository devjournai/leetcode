/**
 * Compute Decimal Representation
 * Intuition: Peel digits from least significant, emit digit * place when nonzero, then reverse so the largest place comes first.
 * Approach: While n > 0, take n % 10; if nonzero push digit * place; n = floor(n/10); place *= 10. Reverse the list.
 * Dry Run: n = 537 → 7, 30, 500 then reverse → [500, 30, 7].
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */
var decimalRepresentation = function (n) {
  const parts = [];
  let place = 1;
  while (n > 0) {
    const digit = n % 10;
    n = Math.floor(n / 10);
    if (digit !== 0) {
      parts.push(place * digit);
    }
    place *= 10;
  }
  parts.reverse();
  return parts;
};
