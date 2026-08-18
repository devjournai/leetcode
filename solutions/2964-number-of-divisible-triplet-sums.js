/**
 * Number Of Divisible Triplet Sums
 * Intuition: The problem asks for triplets (i, j, k) with i < j < k such that their sum is divisible by d. Instead of checking all O(N^3) triplets, we can optimize by fixing the third element `k` and efficiently finding pairs `(i, j)` where `i < j < k` and `(nums[i] + nums[j] + nums[k]) % d == 0`. This condition can be rewritten as `(nums[i] + nums[j]) % d == (d - nums[k] % d) % d`.
 * Approach: 1. Initialize a `Map` to store precomputed sums of pairs. The keys will be `(nums[i] + nums[j]) % d`, and the values will be lists of `[i, j]` index pairs that yield that remainder.
 *           2. Iterate through all possible pairs `(i, j)` such that `i < j`. For each pair, calculate `currentPairSumModulo = (nums[i] + nums[j]) % d`. If `mapOfPrefixPairSums` does not have `currentPairSumModulo` as a key, initialize an empty list for it. Then, add `[i, j]` to the list associated with `currentPairSumModulo`.
 *           3. Initialize a counter `finalCount` to zero.
 *           4. Iterate through each element `nums[k]` from `k = 0` to `arrayLength - 1`.
 *           5. For each `nums[k]`, calculate the `targetModForPair`. This is the remainder that `(nums[i] + nums[j]) % d` must have for the total sum `(nums[i] + nums[j] + nums[k]) % d` to be zero. The formula for this is `(d - (nums[k] % d)) % d`.
 *           6. Check if `mapOfPrefixPairSums` contains `targetModForPair`.
 *           7. If it does, retrieve the `candidatePairList` associated with `targetModForPair`. Iterate through each `individualPair` (which is `[i, j]`) in this list.
 *           8. For each `individualPair`, check if its second index `j` is strictly less than the current index `k`. If `j < k` holds, it means we have found a valid triplet `(i, j, k)` satisfying `i < j < k` and the divisibility condition. Increment `finalCount`.
 *           9. After iterating through all `k` and their corresponding pairs, return `finalCount`.
 * Dry Run:
 *   nums = [3, 3, 6, 7], d = 3
 *   arrayLength = 4
 *   mapOfPrefixPairSums = new Map()
 *   finalCount = 0
 *
 *   // Phase 1: Build mapOfPrefixPairSums
 *   idxA = 0 (nums[0]=3)
 *     idxB = 1 (nums[1]=3): currentPairSumModulo = (3+3)%3 = 0. mapOfPrefixPairSums: { 0: [[0,1]] }
 *     idxB = 2 (nums[2]=6): currentPairSumModulo = (3+6)%3 = 0. mapOfPrefixPairSums: { 0: [[0,1], [0,2]] }
 *     idxB = 3 (nums[3]=7): currentPairSumModulo = (3+7)%3 = 1. mapOfPrefixPairSums: { 0: [[0,1], [0,2]], 1: [[0,3]] }
 *   idxA = 1 (nums[1]=3)
 *     idxB = 2 (nums[2]=6): currentPairSumModulo = (3+6)%3 = 0. mapOfPrefixPairSums: { 0: [[0,1], [0,2], [1,2]], 1: [[0,3]] }
 *     idxB = 3 (nums[3]=7): currentPairSumModulo = (3+7)%3 = 1. mapOfPrefixPairSums: { 0: [[0,1], [0,2], [1,2]], 1: [[0,3], [1,3]] }
 *   idxA = 2 (nums[2]=6)
 *     idxB = 3 (nums[3]=7): currentPairSumModulo = (6+7)%3 = 1. mapOfPrefixPairSums: { 0: [[0,1], [0,2], [1,2]], 1: [[0,3], [1,3], [2,3]] }
 *
 *   // Phase 2: Count triplets
 *   idxK = 0 (nums[0]=3): currentNumValue = 3. targetModForPair = (3 - (3%3))%3 = (3-0)%3 = 0.
 *     mapOfPrefixPairSums.get(0) exists: [[0,1], [0,2], [1,2]].
 *     individualPair = [0,1]: secondPairIndex = 1. Is 1 < 0? No.
 *     individualPair = [0,2]: secondPairIndex = 2. Is 2 < 0? No.
 *     individualPair = [1,2]: secondPairIndex = 2. Is 2 < 0? No.
 *   idxK = 1 (nums[1]=3): currentNumValue = 3. targetModForPair = (3 - (3%3))%3 = 0.
 *     mapOfPrefixPairSums.get(0) exists: [[0,1], [0,2], [1,2]].
 *     individualPair = [0,1]: secondPairIndex = 1. Is 1 < 1? No.
 *     individualPair = [0,2]: secondPairIndex = 2. Is 2 < 1? No.
 *     individualPair = [1,2]: secondPairIndex = 2. Is 2 < 1? No.
 *   idxK = 2 (nums[2]=6): currentNumValue = 6. targetModForPair = (3 - (6%3))%3 = (3-0)%3 = 0.
 *     mapOfPrefixPairSums.get(0) exists: [[0,1], [0,2], [1,2]].
 *     individualPair = [0,1]: secondPairIndex = 1. Is 1 < 2? Yes. finalCount = 1. (Triplet: (0,1,2))
 *     individualPair = [0,2]: secondPairIndex = 2. Is 2 < 2? No.
 *     individualPair = [1,2]: secondPairIndex = 2. Is 2 < 2? No.
 *   idxK = 3 (nums[3]=7): currentNumValue = 7. targetModForPair = (3 - (7%3))%3 = (3-1)%3 = 2.
 *     mapOfPrefixPairSums.get(2) does not exist.
 *
 *   Final finalCount = 1.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var divisibleTripletCount = function (nums, d) {
  const arrayLength = nums.length;
  const mapOfPrefixPairSums = new Map();

  for (let idxA = 0; idxA < arrayLength - 1; idxA++) {
    for (let idxB = idxA + 1; idxB < arrayLength; idxB++) {
      const currentPairSumModulo = (nums[idxA] + nums[idxB]) % d;
      if (!mapOfPrefixPairSums.has(currentPairSumModulo)) {
        mapOfPrefixPairSums.set(currentPairSumModulo, []);
      }
      mapOfPrefixPairSums.get(currentPairSumModulo).push([idxA, idxB]);
    }
  }

  let finalCount = 0;
  for (let idxK = 0; idxK < arrayLength; idxK++) {
    const currentNumValue = nums[idxK];
    const targetModForPair = (d - (currentNumValue % d)) % d;

    if (mapOfPrefixPairSums.has(targetModForPair)) {
      const candidatePairList = mapOfPrefixPairSums.get(targetModForPair);
      for (const individualPair of candidatePairList) {
        const firstPairIndex = individualPair[0];
        const secondPairIndex = individualPair[1];
        if (secondPairIndex < idxK) {
          finalCount++;
        }
      }
    }
  }

  return finalCount;
};
