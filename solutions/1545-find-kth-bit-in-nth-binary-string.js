/**
 * Find Kth Bit in Nth Binary String
 * Intuition: S_n = S_{n-1} + '1' + reverse(invert(S_{n-1})). Recurse on the half; crossing the middle inverts and mirrors k.
 * Approach: 1. While n>1, mid=(2^n)/2. 2. If k==mid return inverted-or-not '1'. 3. If k<mid go to n-1. 4. Else invert flag++, k=len-k+1. 5. Base '0' with invert parity.
 * Dry Run: n = 3, k = 1.
 *   - S3 = "0111001"; first bit is '0'.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findKthBit = function (n, k) {
  let levelIterator = n;
  let bitPosition = k;
  let inversionTracker = 0;

  while (levelIterator > 1) {
    const currentLevelLength = (1 << levelIterator) - 1;
    const middleMark = (currentLevelLength + 1) / 2;

    if (bitPosition === middleMark) {
      return inversionTracker % 2 === 0 ? "1" : "0";
    } else if (bitPosition < middleMark) {
      levelIterator--;
    } else {
      inversionTracker++;
      bitPosition = currentLevelLength - bitPosition + 1;
      levelIterator--;
    }
  }
  return inversionTracker % 2 === 0 ? "0" : "1";
};
