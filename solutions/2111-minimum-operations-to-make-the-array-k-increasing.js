/**
 * Minimum Operations To Make The Array K Increasing
 * Intuition: The K-increasing condition `arr[i-k] <= arr[i]` means that elements in specific subsequences must be non-decreasing. Specifically, for each starting index `j` from `0` to `k-1`, the subsequence `arr[j], arr[j+k], arr[j+2k], ...` must be non-decreasing. The problem then decomposes into `k` independent subproblems, where for each subsequence, we need to find the minimum operations to make it non-decreasing. The minimum operations to make an array non-decreasing is equivalent to its length minus the length of its Longest Non-Decreasing Subsequence (LNDS).
 * Approach: 1. Initialize a variable `totalOperationsRequired` to accumulate the operations. 2. Iterate `k` times using an index `startOffset` from `0` to `k-1`. Each `startOffset` represents the beginning of a distinct subsequence. 3. Inside this loop, construct a `currentSegment` array by gathering elements `arr[startOffset], arr[startOffset + k], arr[startOffset + 2k], ...` until the end of the input array. 4. Define a helper function, `calculateLNDSLength`, which takes an array and returns the length of its Longest Non-Decreasing Subsequence. This function uses a patience sorting approach: it maintains a `minimalTails` array where `minimalTails[i]` stores the smallest ending element of all non-decreasing subsequences of length `i+1`. For each number in the input array, it performs a binary search on `minimalTails` to find the correct position to insert or update the number, ensuring `minimalTails` remains sorted and stores optimal tails. 5. For each `currentSegment`, call `calculateLNDSLength` to get its LNDS length. The number of operations for this segment is `currentSegment.length - LNDS length`. Add this value to `totalOperationsRequired`. 6. After iterating through all `k` subsequences, return `totalOperationsRequired`.
 * Dry Run: arr = [4, 1, 5, 2, 6, 2], k = 2
 *   `totalOperationsRequired = 0`
 *   `startOffset = 0`:
 *     `currentSegment = []`. Gather elements: `arr[0]=4`, `arr[2]=5`, `arr[4]=6`. So `currentSegment = [4, 5, 6]`.
 *     `calculateLNDSLength([4, 5, 6])`:
 *       `minimalTails = []`
 *       `num = 4`: `minimalTails = [4]`
 *       `num = 5`: `minimalTails = [4, 5]`
 *       `num = 6`: `minimalTails = [4, 5, 6]`
 *       Returns `minimalTails.length = 3`.
 *     `segmentOperations = 3 - 3 = 0`. `totalOperationsRequired = 0 + 0 = 0`.
 *   `startOffset = 1`:
 *     `currentSegment = []`. Gather elements: `arr[1]=1`, `arr[3]=2`, `arr[5]=2`. So `currentSegment = [1, 2, 2]`.
 *     `calculateLNDSLength([1, 2, 2])`:
 *       `minimalTails = []`
 *       `num = 1`: `minimalTails = [1]`
 *       `num = 2`: `minimalTails = [1, 2]`
 *       `num = 2`: Binary search finds position 2. `minimalTails = [1, 2, 2]`
 *       Returns `minimalTails.length = 3`.
 *     `segmentOperations = 3 - 3 = 0`. `totalOperationsRequired = 0 + 0 = 0`.
 *   Return `totalOperationsRequired = 0`.
 * Time Complexity: O(N log (N/K)).
 * Space Complexity: O(N).
 */
var kIncreasing = function (arr, k) {
  let totalOperationsRequired = 0;
  const arrayLength = arr.length;

  for (let startOffset = 0; startOffset < k; ++startOffset) {
    const currentSegment = [];
    for (
      let segmentElementIndex = startOffset;
      segmentElementIndex < arrayLength;
      segmentElementIndex += k
    ) {
      currentSegment.push(arr[segmentElementIndex]);
    }
    totalOperationsRequired +=
      currentSegment.length - calculateLNDSLength(currentSegment);
  }

  return totalOperationsRequired;

  function calculateLNDSLength(inputNumbers) {
    const minimalTails = [];
    for (const currentNumber of inputNumbers) {
      let searchLeft = 0;
      let searchRight = minimalTails.length;

      while (searchLeft < searchRight) {
        const searchMid = Math.floor((searchLeft + searchRight) / 2);
        if (minimalTails[searchMid] <= currentNumber) {
          searchLeft = searchMid + 1;
        } else {
          searchRight = searchMid;
        }
      }
      minimalTails[searchLeft] = currentNumber;
    }
    return minimalTails.length;
  }
};
