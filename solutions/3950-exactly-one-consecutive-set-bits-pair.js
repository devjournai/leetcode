/**
 * Exactly One Consecutive Set Bits Pair
 * Intuition: We use a variable pre to record the digit of the previous bit, initialized to pre = 0, and another variable vis to record whether a pair of consecutive set bits has already been found, initialized to vis = text{false}.
 * Approach: We use a variable pre to record the digit of the previous bit, initialized to pre = 0, and another variable vis to record whether a pair of consecutive set bits has already been found, initialized to vis = text{false}. Iterate through each binary bit of n, and denote the current binary bit as cur. If pre = cur = 1, and if vis = text{true} at this moment, it indicates that there are multiple pairs of consecutive set bits, so we directly return text{false}. Otherwise, we set vis to text{true}. Then, we update pre = cur and continue to iterate through the next binary bit. After the iteration ends, if vis = text{true}, return text{true}; otherwise, return text{false}.
 * Dry Run: Input: n = 6. Output: true.
 * Time Complexity: O(logn)
 * Space Complexity: O(1)
 */
var consecutiveSetBits = function (n) {
  let vis = false;
  for (let pre = 0; n > 0; n >>= 1) {
    const cur = n & 1;
    if (pre === cur && cur === 1) {
      if (vis) {
        return false;
      }
      vis = true;
    }
    pre = cur;
  }
  return vis;
};
