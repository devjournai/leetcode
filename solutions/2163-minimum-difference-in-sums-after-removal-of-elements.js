/**
 * Minimum Difference In Sums After Removal Of Elements
 * Intuition: The problem requires minimizing the difference `sumFirst - sumSecond`. This means we need to make `sumFirst` as small as possible and `sumSecond` as large as possible. The key observation is that after removing 'n' elements, the remaining '2n' elements are chosen from the original `3n` array. These `2n` elements can be conceptually split by an imaginary boundary `p`. The first `n` elements for `sumFirst` are chosen from `nums[0...p]`, and the next `n` elements for `sumSecond` are chosen from `nums[p+1...3n-1]`. The index `p` can range from `n-1` to `2n-1`. For a fixed split point `p`, to minimize `sumFirst`, we must pick the `n` smallest elements from `nums[0...p]`. To maximize `sumSecond`, we must pick the `n` largest elements from `nums[p+1...3n-1]`. We can precompute these minimum/maximum sums efficiently using heaps.
 * Approach:
 * 1. Define `groupSize = nums.length / 3`. This `groupSize` is the 'n' referred to in the problem.
 * 2. Create an array `firstPartSums` of size `nums.length`. `firstPartSums[i]` will store the minimum possible sum of `groupSize` elements chosen from the prefix `nums[0...i]`.
 * 3. Initialize a max-heap (`firstHeap`) and `sumForFirstPart = 0`. Iterate from `loopIndexA = 0` to `groupSize - 1`, adding `nums[loopIndexA]` to `firstHeap` and `sumForFirstPart`. Store `sumForFirstPart` in `firstPartSums[groupSize - 1]`.
 * 4. Continue iterating from `loopIndexB = groupSize` to `2 * groupSize - 1`. For each `nums[loopIndexB]`, add it to `firstHeap` and `sumForFirstPart`. Then, remove the largest element from `firstHeap` (using `dequeue`) and subtract it from `sumForFirstPart`. Store this updated `sumForFirstPart` in `firstPartSums[loopIndexB]`. This ensures `firstPartSums[i]` always holds the sum of the `groupSize` smallest elements encountered up to `nums[i]`.
 * 5. Create an array `secondPartSums` of size `nums.length`. `secondPartSums[i]` will store the maximum possible sum of `groupSize` elements chosen from the suffix `nums[i...3*groupSize - 1]`.
 * 6. Initialize a min-heap (`secondHeap`) and `sumForSecondPart = 0`. Iterate from `loopIndexC = 2 * groupSize` to `3 * groupSize - 1`, adding `nums[loopIndexC]` to `secondHeap` and `sumForSecondPart`. Store `sumForSecondPart` in `secondPartSums[2 * groupSize]`.
 * 7. Continue iterating backwards from `loopIndexD = 2 * groupSize - 1` down to `groupSize`. For each `nums[loopIndexD]`, add it to `secondHeap` and `sumForSecondPart`. Then, remove the smallest element from `secondHeap` and subtract it from `sumForSecondPart`. Store this updated `sumForSecondPart` in `secondPartSums[loopIndexD]`. This ensures `secondPartSums[i]` always holds the sum of the `groupSize` largest elements encountered from `nums[i]` onwards.
 * 8. Initialize `minimumDifferenceValue` to positive infinity.
 * 9. Iterate `loopIndexE` from `groupSize - 1` to `2 * groupSize - 1`. This `loopIndexE` represents the split point 'p'.
 * 10. Calculate `currentDifference = firstPartSums[loopIndexE] - secondPartSums[loopIndexE + 1]`. Update `minimumDifferenceValue = Math.min(minimumDifferenceValue, currentDifference)`.
 * 11. Return `minimumDifferenceValue`.
 * Dry Run: nums = [3, 1, 2, 8, 7, 6], groupSize = 2.
 * firstPartSums (initialized to 0s), secondPartSums (initialized to 0s)
 *
 * Calculate firstPartSums:
 * - loopIndexA = 0: nums[0]=3. firstHeap=[3], sumForFirstPart=3.
 * - loopIndexA = 1: nums[1]=1. firstHeap=[3,1], sumForFirstPart=4. firstPartSums[1]=4.
 * - loopIndexB = 2: nums[2]=2. firstHeap.enqueue(2)=>[3,2,1]. sumForFirstPart=4+2=6. valueRemovedFromFirstHeap=firstHeap.dequeue() (3). sumForFirstPart=6-3=3. firstHeap=[2,1]. firstPartSums[2]=3.
 * - loopIndexB = 3: nums[3]=8. firstHeap.enqueue(8)=>[8,2,1]. sumForFirstPart=3+8=11. valueRemovedFromFirstHeap=firstHeap.dequeue() (8). sumForFirstPart=11-8=3. firstHeap=[2,1]. firstPartSums[3]=3.
 * firstPartSums: [?, 4, 3, 3, ?, ?]
 *
 * Calculate secondPartSums:
 * - loopIndexC = 4: nums[4]=7. secondHeap=[7], sumForSecondPart=7.
 * - loopIndexC = 5: nums[5]=6. secondHeap=[6,7], sumForSecondPart=7+6=13. secondPartSums[4]=13.
 * - loopIndexD = 3: nums[3]=8. secondHeap.enqueue(8)=>[6,7,8]. sumForSecondPart=13+8=21. valueRemovedFromSecondHeap=secondHeap.dequeue() (6). sumForSecondPart=21-6=15. secondHeap=[7,8]. secondPartSums[3]=15.
 * - loopIndexD = 2: nums[2]=2. secondHeap.enqueue(2)=>[2,7,8]. sumForSecondPart=15+2=17. valueRemovedFromSecondHeap=secondHeap.dequeue() (2). sumForSecondPart=17-2=15. secondHeap=[7,8]. secondPartSums[2]=15.
 * secondPartSums: [?, ?, 15, 15, 13, ?]
 *
 * Final minimum difference:
 * minimumDifferenceValue = Infinity
 * - loopIndexE = 1: currentDifference = firstPartSums[1] - secondPartSums[2] = 4 - 15 = -11. minimumDifferenceValue = -11.
 * - loopIndexE = 2: currentDifference = firstPartSums[2] - secondPartSums[3] = 3 - 15 = -12. minimumDifferenceValue = -12.
 * - loopIndexE = 3: currentDifference = firstPartSums[3] - secondPartSums[4] = 3 - 13 = -10. minimumDifferenceValue = -12.
 * Return -12.
 * Time Complexity: O(N log n)
 * Space Complexity: O(N)
 */
var minimumDifference = function (nums) {
  const groupSize = nums.length / 3;
  const firstPartSums = new Array(nums.length).fill(0);
  const secondPartSums = new Array(nums.length).fill(0);

  const firstHeap = new PriorityQueue((valA, valB) => valB - valA);
  let sumForFirstPart = 0;

  for (let loopIndexA = 0; loopIndexA < groupSize; loopIndexA++) {
    firstHeap.enqueue(nums[loopIndexA]);
    sumForFirstPart += nums[loopIndexA];
  }
  firstPartSums[groupSize - 1] = sumForFirstPart;

  for (let loopIndexB = groupSize; loopIndexB < 2 * groupSize; loopIndexB++) {
    firstHeap.enqueue(nums[loopIndexB]);
    sumForFirstPart += nums[loopIndexB];
    const valueRemovedFromFirstHeap = firstHeap.dequeue();
    sumForFirstPart -= valueRemovedFromFirstHeap;
    firstPartSums[loopIndexB] = sumForFirstPart;
  }

  const secondHeap = new PriorityQueue((valA, valB) => valA - valB);
  let sumForSecondPart = 0;

  for (
    let loopIndexC = 2 * groupSize;
    loopIndexC < 3 * groupSize;
    loopIndexC++
  ) {
    secondHeap.enqueue(nums[loopIndexC]);
    sumForSecondPart += nums[loopIndexC];
  }
  secondPartSums[2 * groupSize] = sumForSecondPart;

  for (
    let loopIndexD = 2 * groupSize - 1;
    loopIndexD >= groupSize;
    loopIndexD--
  ) {
    secondHeap.enqueue(nums[loopIndexD]);
    sumForSecondPart += nums[loopIndexD];
    const valueRemovedFromSecondHeap = secondHeap.dequeue();
    sumForSecondPart -= valueRemovedFromSecondHeap;
    secondPartSums[loopIndexD] = sumForSecondPart;
  }

  let minimumDifferenceValue = Infinity;
  for (
    let loopIndexE = groupSize - 1;
    loopIndexE < 2 * groupSize;
    loopIndexE++
  ) {
    const currentDifference =
      firstPartSums[loopIndexE] - secondPartSums[loopIndexE + 1];
    minimumDifferenceValue = Math.min(
      minimumDifferenceValue,
      currentDifference
    );
  }

  return minimumDifferenceValue;
};
