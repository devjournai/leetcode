/**
 * Number of Unique XOR Triplets II
 * Intuition: The problem asks for the count of unique XOR sums of three elements `nums[i] XOR nums[j] XOR nums[k]` where `i <= j <= k`. The constraints (N=1500, nums[i]=1500) suggest an O(N^2) or O(N*M) solution, where M is the maximum possible XOR value (around 2048 for numbers up to 1500). A naive O(N^3) approach would be too slow. The small range of possible XOR values (0 to 2047) allows us to use boolean arrays (BitSets) to efficiently track reachable XOR sums.
 *
 * Approach:
 * The target sum is `nums[i] ^ nums[j] ^ nums[k]` with `i <= j <= k`.
 * This can be rewritten as `nums[i] ^ (nums[j] ^ nums[k])` where `i <= j <= k`.
 * We can iterate through `i` from `0` to `N-1`. For each `nums[i]`, we need to find all possible values of `(nums[j] ^ nums[k])` such that `i <= j <= k`.
 * Let `suffixTwoXorValues[p]` be a boolean array (or BitSet) where `suffixTwoXorValues[p][x]` is true if `x` can be formed by `nums[a] ^ nums[b]` for some `p <= a <= b < N`.
 *
 * 1.  **Precompute `suffixOneXorValues`**: Create `suffixOneXorValues[j]` for `j` from `N-1` down to `0`. `suffixOneXorValues[j][x]` is true if `x` is present in `nums[k]` for any `k >= j`. This is a set of unique numbers in the suffix `nums[j...N-1]`.
 *     -   Initialize `currentSuffixOneXor` as a boolean array of size `MAX_XOR_VALUE_PLUS_ONE` (2048) filled with `false`.
 *     -   Iterate `j` from `N-1` down to `0`:
 *         -   Set `currentSuffixOneXor[nums[j]] = true`.
 *         -   Store a deep copy of `currentSuffixOneXor` in `suffixOneXorValues[j]`.
 *     -   Time: O(N * M), Space: O(N * M).
 *
 * 2.  **Precompute `suffixTwoXorValues`**: Create `suffixTwoXorValues[j]` for `j` from `N-1` down to `0`. `suffixTwoXorValues[j][x]` is true if `x = nums[p] ^ nums[q]` for some `p, q` such that `j <= p <= q < N`.
 *     -   Initialize `suffixTwoXorValues[N-1]` to have `true` only at index `0` (for `nums[N-1] ^ nums[N-1]`).
 *     -   Iterate `j` from `N-2` down to `0`:
 *         -   Initialize `suffixTwoXorValues[j]` as a deep copy of `suffixTwoXorValues[j+1]`. This handles cases where `p, q > j`.
 *         -   Set `suffixTwoXorValues[j][0] = true` (for `nums[j] ^ nums[j]`).
 *         -   To handle cases where `p = j` and `q > j`: Iterate through `x` from `0` to `MAX_XOR_VALUE_PLUS_ONE`. If `suffixOneXorValues[j+1][x]` is true (meaning `x` is some `nums[q]` with `q > j`), then set `suffixTwoXorValues[j][nums[j] ^ x] = true`.
 *     -   Time: O(N * M), Space: O(N * M).
 *
 * 3.  **Compute `allUniqueXorTriplets`**: Iterate `i` from `0` to `N-1`. For each `nums[i]`, we need to combine it with all values `x` from `suffixTwoXorValues[i]` (which represent `nums[j] ^ nums[k]` for `i <= j <= k`).
 *     -   Initialize `allUniqueXorTriplets` as a boolean array of size `MAX_XOR_VALUE_PLUS_ONE` filled with `false`.
 *     -   Iterate `i` from `0` to `N-1`:
 *         -   Iterate `x` from `0` to `MAX_XOR_VALUE_PLUS_ONE`. If `suffixTwoXorValues[i][x]` is true, then set `allUniqueXorTriplets[nums[i] ^ x] = true`.
 *     -   Time: O(N * M), Space: O(M).
 *
 * 4.  **Count unique triplets**: Iterate `x` from `0` to `MAX_XOR_VALUE_PLUS_ONE`. Count how many `allUniqueXorTriplets[x]` are true.
 *     -   Time: O(M), Space: O(1).
 *
 * Dry Run: For `nums = [1,3]`:
 * N=2, MAX_XOR_VALUE_PLUS_ONE=2048.
 *
 * Step 1: Precompute `suffixOneXorValues`
 * j=1: nums[1]=3. currentSuffixOneXor[3]=true. suffixOneXorValues[1]=[...,false,false,false,true,...] (only 3 is true)
 * j=0: nums[0]=1. currentSuffixOneXor[1]=true. currentSuffixOneXor is now [...,false,true,false,true,...] (1 and 3 are true). suffixOneXorValues[0]=[...,false,true,false,true,...]
 *
 * Step 2: Precompute `suffixTwoXorValues`
 * j=1:
 *   suffixTwoXorValues[1] initialized as `false` array.
 *   suffixTwoXorValues[1][0]=true (for nums[1]^nums[1] = 3^3 = 0).
 *   `j+1` (2) is not `< N`, so Case 2 and 3 skipped.
 *   suffixTwoXorValues[1]=[true,false,false,false,...] (only 0 is true)
 *
 * j=0:
 *   suffixTwoXorValues[0] initialized as `false` array.
 *   `j+1 < N` (1 < 2) is true:
 *     suffixTwoXorValues[0] = suffixTwoXorValues[1].slice() (copies [true,false,false,false,...])
 *   suffixTwoXorValues[0][0]=true (for nums[0]^nums[0] = 1^1 = 0) (already true)
 *
 *   Case 2 (p=j, q>j): Check `suffixOneXorValues[j+1]` (which is `suffixOneXorValues[1]`).
 *     x=3: suffixOneXorValues[1][3] is true.
 *       Set `suffixTwoXorValues[0][nums[0]^3] = suffixTwoXorValues[0][1^3] = suffixTwoXorValues[0][2] = true`.
 *   suffixTwoXorValues[0] is now [true,false,true,false,...] (0 and 2 are true)
 *
 *   Case 3 (p>j): `j+1 < N` (1 < 2) is true. Merge from `suffixTwoXorValues[j+1]` (which is `suffixTwoXorValues[1]`).
 *     `suffixTwoXorValues[1]` has `0` as true. `suffixTwoXorValues[0]` already has `0` as true. No change.
 *   Final suffixTwoXorValues[0]=[true,false,true,false,...] (0 and 2 are true)
 *
 * Step 3: Compute `allUniqueXorTriplets`
 * allUniqueXorTriplets initialized as `false` array.
 *
 * i=0: nums[0]=1
 *   Iterate `x` over `suffixTwoXorValues[0]` (which has 0 and 2 as true).
 *   x=0: `suffixTwoXorValues[0][0]` is true. Set `allUniqueXorTriplets[nums[0]^0] = allUniqueXorTriplets[1^0] = allUniqueXorTriplets[1] = true`.
 *   x=2: `suffixTwoXorValues[0][2]` is true. Set `allUniqueXorTriplets[nums[0]^2] = allUniqueXorTriplets[1^2] = allUniqueXorTriplets[3] = true`.
 *   allUniqueXorTriplets is now [...,false,true,false,true,...] (1 and 3 are true)
 *
 * i=1: nums[1]=3
 *   Iterate `x` over `suffixTwoXorValues[1]` (which has only 0 as true).
 *   x=0: `suffixTwoXorValues[1][0]` is true. Set `allUniqueXorTriplets[nums[1]^0] = allUniqueXorTriplets[3^0] = allUniqueXorTriplets[3] = true`. (Already true)
 *
 * Step 4: Count unique triplets
 * Count `true` values in `allUniqueXorTriplets`. Indices 1 and 3 are true. Count = 2.
 * Output: 2. (Matches example)
 *
 * Time Complexity: O(N * M)
 * Space Complexity: O(N * M)
 */
var uniqueXorTriplets = function (nums) {
  const MAX_XOR_VALUE_PLUS_ONE = 2048;

  const isPresent = new Uint8Array(MAX_XOR_VALUE_PLUS_ONE);
  const uniqueVals = [];

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    if (isPresent[val] === 0) {
      isPresent[val] = 1;
      uniqueVals.push(val);
    }
  }

  const v2 = new Uint8Array(MAX_XOR_VALUE_PLUS_ONE);
  const numUnique = uniqueVals.length;

  for (let i = 0; i < numUnique; i++) {
    const u = uniqueVals[i];
    for (let j = i; j < numUnique; j++) {
      v2[u ^ uniqueVals[j]] = 1;
    }
  }

  const v3 = new Uint8Array(MAX_XOR_VALUE_PLUS_ONE);

  for (let x = 0; x < MAX_XOR_VALUE_PLUS_ONE; x++) {
    if (v2[x] === 1) {
      for (let i = 0; i < numUnique; i++) {
        v3[x ^ uniqueVals[i]] = 1;
      }
    }
  }

  let uniqueCount = 0;
  for (let i = 0; i < MAX_XOR_VALUE_PLUS_ONE; i++) {
    if (v3[i] === 1) {
      uniqueCount++;
    }
  }

  return uniqueCount;
};
