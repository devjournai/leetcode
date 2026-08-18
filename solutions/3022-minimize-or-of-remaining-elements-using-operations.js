/**
 * Minimize OR Of Remaining Elements Using Operations
 * Intuition: We want the OR of the remaining array after at most k AND-merges to be as small as possible. Greedily try to turn off bits from high to low: a bit can stay off if we can AND adjacent numbers so every remaining value avoids that bit, using at most k merges.
 * Approach: 1. Walk bits from 30 down to 0, adding each bit to a prefixMask of bits we hope to clear. 2. Count how many merges are needed so that every remaining AND-segment is a subset of the bits already forced on in the answer. 3. If that count exceeds k, the current bit must stay in the answer.
 * Dry Run: nums = [3, 5, 3, 2, 7], k = 2
 *   1. Trying to clear bit 2 (value 4) may require more than 2 merges, so it stays.
 *   2. Lower bits can be cleared within 2 merges, leaving answer 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minOrAfterOperations = function (nums, k) {
  const getMergeOps = (prefixMask, target) => {
    let mergeOps = 0;
    let currentAnd = prefixMask;
    for (const value of nums) {
      currentAnd &= value;
      if ((currentAnd | target) === target) {
        currentAnd = prefixMask;
      } else {
        mergeOps++;
      }
    }
    return mergeOps;
  };

  const maxBit = 30;
  let answer = 0;
  let prefixMask = 0;

  for (let bitIndex = maxBit; bitIndex >= 0; bitIndex--) {
    prefixMask |= 1 << bitIndex;
    if (getMergeOps(prefixMask, answer) > k) {
      answer |= 1 << bitIndex;
    }
  }

  return answer;
};
