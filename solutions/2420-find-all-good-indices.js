/**
 * Find All Good Indices
 * Intuition: To efficiently check non-increasing and non-decreasing sequences around each potential good index, we can precompute the lengths of such sequences. By calculating the lengths of non-increasing sequences ending at each position and non-decreasing sequences starting at each position, we can look up these values in constant time for any given index.
 * Approach: 1. Initialize `arrayLength` with the length of the input array `nums`.
 * 2. Create an array `increasingFromLeft` of size `arrayLength`, initialized with `1`s. This array will store for each index `j`, the length of the non-increasing sequence ending at `j`.
 * 3. Populate `increasingFromLeft` by iterating `firstPointer` from `1` to `arrayLength - 1`. If `nums[firstPointer - 1]` is greater than or equal to `nums[firstPointer]`, the sequence continues, so `increasingFromLeft[firstPointer]` becomes `increasingFromLeft[firstPointer - 1] + 1`. Otherwise, a new sequence starts, so it's `1`.
 * 4. Create an array `decreasingFromRight` of size `arrayLength`, initialized with `1`s. This array will store for each index `j`, the length of the non-decreasing sequence starting at `j`.
 * 5. Populate `decreasingFromRight` by iterating `secondPointer` from `arrayLength - 2` down to `0`. If `nums[secondPointer]` is less than or equal to `nums[secondPointer + 1]`, the sequence continues, so `decreasingFromRight[secondPointer]` becomes `decreasingFromRight[secondPointer + 1] + 1`. Otherwise, a new sequence starts, so it's `1`.
 * 6. Initialize an empty array `goodCandidates` to store the indices that satisfy the conditions.
 * 7. Iterate `targetIndex` from `k` up to `arrayLength - k - 1`. For each `targetIndex`:
 *    a. Check if the non-increasing sequence before `targetIndex` has a length of at least `k`. This is represented by `increasingFromLeft[targetIndex - 1] >= k`.
 *    b. Check if the non-decreasing sequence after `targetIndex` has a length of at least `k`. This is represented by `decreasingFromRight[targetIndex + 1] >= k`.
 *    c. If both conditions are met, `targetIndex` is a good index, so add it to `goodCandidates`.
 * 8. Return the `goodCandidates` array.
 * Dry Run: nums = [2,1,1,1,3,4,1], k = 2
 * arrayLength = 7
 * increasingFromLeft (initialized to [1,1,1,1,1,1,1]):
 * firstPointer = 1: nums[0]=2 >= nums[1]=1 -> increasingFromLeft[1] = increasingFromLeft[0]+1 = 2. Array: [1,2,1,1,1,1,1]
 * firstPointer = 2: nums[1]=1 >= nums[2]=1 -> increasingFromLeft[2] = increasingFromLeft[1]+1 = 3. Array: [1,2,3,1,1,1,1]
 * firstPointer = 3: nums[2]=1 >= nums[3]=1 -> increasingFromLeft[3] = increasingFromLeft[2]+1 = 4. Array: [1,2,3,4,1,1,1]
 * firstPointer = 4: nums[3]=1 < nums[4]=3 -> increasingFromLeft[4] = 1. Array: [1,2,3,4,1,1,1]
 * firstPointer = 5: nums[4]=3 < nums[5]=4 -> increasingFromLeft[5] = 1. Array: [1,2,3,4,1,1,1]
 * firstPointer = 6: nums[5]=4 >= nums[6]=1 -> increasingFromLeft[6] = increasingFromLeft[5]+1 = 2. Array: [1,2,3,4,1,1,2]
 * Final increasingFromLeft: [1,2,3,4,1,1,2]
 *
 * decreasingFromRight (initialized to [1,1,1,1,1,1,1]):
 * secondPointer = 5 (index 6 is 1 by default): nums[5]=4 > nums[6]=1 -> decreasingFromRight[5] = 1. Array: [1,1,1,1,1,1,1]
 * secondPointer = 4: nums[4]=3 <= nums[5]=4 -> decreasingFromRight[4] = decreasingFromRight[5]+1 = 2. Array: [1,1,1,1,2,1,1]
 * secondPointer = 3: nums[3]=1 <= nums[4]=3 -> decreasingFromRight[3] = decreasingFromRight[4]+1 = 3. Array: [1,1,1,3,2,1,1]
 * secondPointer = 2: nums[2]=1 <= nums[3]=1 -> decreasingFromRight[2] = decreasingFromRight[3]+1 = 4. Array: [1,1,4,3,2,1,1]
 * secondPointer = 1: nums[1]=1 <= nums[2]=1 -> decreasingFromRight[1] = decreasingFromRight[2]+1 = 5. Array: [1,5,4,3,2,1,1]
 * secondPointer = 0: nums[0]=2 > nums[1]=1 -> decreasingFromRight[0] = 1. Array: [1,5,4,3,2,1,1]
 * Final decreasingFromRight: [1,5,4,3,2,1,1]
 *
 * goodCandidates = []
 * targetIndex from k=2 to arrayLength-k-1 = 7-2-1 = 4. (i.e., targetIndex = 2, 3, 4)
 * targetIndex = 2:
 *   increasingFromLeft[2-1] = increasingFromLeft[1] = 2. Is 2 >= k=2? Yes.
 *   decreasingFromRight[2+1] = decreasingFromRight[3] = 3. Is 3 >= k=2? Yes.
 *   Both true. goodCandidates.push(2). goodCandidates = [2]
 * targetIndex = 3:
 *   increasingFromLeft[3-1] = increasingFromLeft[2] = 3. Is 3 >= k=2? Yes.
 *   decreasingFromRight[3+1] = decreasingFromRight[4] = 2. Is 2 >= k=2? Yes.
 *   Both true. goodCandidates.push(3). goodCandidates = [2,3]
 * targetIndex = 4:
 *   increasingFromLeft[4-1] = increasingFromLeft[3] = 4. Is 4 >= k=2? Yes.
 *   decreasingFromRight[4+1] = decreasingFromRight[5] = 1. Is 1 >= k=2? No.
 *   Not good.
 * Loop ends. Return [2,3].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var goodIndices = function (nums, k) {
  const arrayLength = nums.length;
  const goodCandidates = [];

  if (arrayLength < 2 * k + 1) {
    return goodCandidates;
  }

  const increasingFromLeft = new Array(arrayLength).fill(1);
  for (let firstPointer = 1; firstPointer < arrayLength; firstPointer++) {
    if (nums[firstPointer - 1] >= nums[firstPointer]) {
      increasingFromLeft[firstPointer] =
        increasingFromLeft[firstPointer - 1] + 1;
    } else {
      increasingFromLeft[firstPointer] = 1;
    }
  }

  const decreasingFromRight = new Array(arrayLength).fill(1);
  for (
    let secondPointer = arrayLength - 2;
    secondPointer >= 0;
    secondPointer--
  ) {
    if (nums[secondPointer] <= nums[secondPointer + 1]) {
      decreasingFromRight[secondPointer] =
        decreasingFromRight[secondPointer + 1] + 1;
    } else {
      decreasingFromRight[secondPointer] = 1;
    }
  }

  for (let targetIndex = k; targetIndex < arrayLength - k; targetIndex++) {
    if (
      increasingFromLeft[targetIndex - 1] >= k &&
      decreasingFromRight[targetIndex + 1] >= k
    ) {
      goodCandidates.push(targetIndex);
    }
  }

  return goodCandidates;
};
