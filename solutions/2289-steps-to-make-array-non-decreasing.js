/**
 * Steps To Make Array Non Decreasing
 * Intuition: This problem asks for the maximum number of steps required to make an array non-decreasing by repeatedly removing elements smaller than their left neighbors. The removal happens simultaneously in each step. A monotonic stack, processed from right to left, is often effective for problems involving "left neighbor" conditions or dependencies among elements. By processing from right to left, we can determine how many steps an element `nums[i]` (a potential "left neighbor") would take to remove elements to its right. The key is how to aggregate these steps, considering the simultaneous nature of removals.
 * Approach:
 * 1. Initialize `arrayLength` with the length of the input `nums` array.
 * 2. Create a `removalSteps` array of `arrayLength`, initialized to zeros. `removalSteps[i]` will store the number of steps `nums[i]` contributes to the total steps (specifically, the maximum "survival time" of any element `nums[j]` to its right that it removes, plus one if `nums[j]` would have been removed sooner).
 * 3. Initialize an empty `elementStack` to store indices. This stack will maintain indices of elements in decreasing order of their values, from bottom to top.
 * 4. Initialize `maximumSteps` to 0, which will track the overall maximum steps encountered.
 * 5. Iterate through the `nums` array from right to left using `currentIdx` (from `arrayLength - 1` down to `0`).
 * 6. For each `currentIdx`:
 *    a. Initialize a `currentElementRemovalCount` to 0. This variable will accumulate the number of steps `nums[currentIdx]` itself is responsible for.
 *    b. While `elementStack` is not empty and `nums[currentIdx]` is strictly greater than `nums[elementStack[elementStack.length - 1]]` (the element at the top of the stack):
 *       i. Pop the top index from `elementStack` and store it in `poppedIdx`.
 *       ii. Update `currentElementRemovalCount`: `currentElementRemovalCount = Math.max(currentElementRemovalCount + 1, removalSteps[poppedIdx])`. This is the core logic: `nums[currentIdx]` either extends its own removal chain by one step, or it "inherits" the maximum steps required by the element it just removed (`nums[poppedIdx]`), whichever is greater.
 *    c. After the inner `while` loop finishes (either stack is empty or `nums[currentIdx]` is not greater than the new stack top):
 *       i. Set `removalSteps[currentIdx]` to `currentElementRemovalCount`.
 *       ii. Update `maximumSteps = Math.max(maximumSteps, removalSteps[currentIdx])`.
 *    d. Push `currentIdx` onto `elementStack`.
 * 7. After the main loop completes, return `maximumSteps`.
 * Dry Run: nums = [5,3,4,4,7,3,6,11,8,5,11]
 * arrayLength = 11
 * elementStack = []
 * removalSteps = [0,0,0,0,0,0,0,0,0,0,0]
 * maximumSteps = 0
 *
 * i = 10 (nums[10]=11): stack empty. removalSteps[10]=0. maximumSteps=0. elementStack=[10]
 * i = 9 (nums[9]=5): nums[9] not > nums[10]. removalSteps[9]=0. maximumSteps=0. elementStack=[10, 9]
 * i = 8 (nums[8]=8):
 *   nums[8]>nums[9] (8>5). poppedIdx=9. currentElementRemovalCount=max(0+1, removalSteps[9]=0)=1. stack=[10]
 *   nums[8] not > nums[10] (8 not > 11). Loop ends.
 *   removalSteps[8]=1. maximumSteps=max(0,1)=1. elementStack=[10, 8]
 * i = 7 (nums[7]=11):
 *   nums[7]>nums[8] (11>8). poppedIdx=8. currentElementRemovalCount=max(0+1, removalSteps[8]=1)=1. stack=[10]
 *   nums[7] not > nums[10] (11 not > 11). Loop ends.
 *   removalSteps[7]=1. maximumSteps=max(1,1)=1. elementStack=[10, 7]
 * i = 6 (nums[6]=6): nums[6] not > nums[7]. removalSteps[6]=0. maximumSteps=1. elementStack=[10, 7, 6]
 * i = 5 (nums[5]=3): nums[5] not > nums[6]. removalSteps[5]=0. maximumSteps=1. elementStack=[10, 7, 6, 5]
 * i = 4 (nums[4]=7):
 *   nums[4]>nums[5] (7>3). poppedIdx=5. currentElementRemovalCount=max(0+1, removalSteps[5]=0)=1. stack=[10,7,6]
 *   nums[4]>nums[6] (7>6). poppedIdx=6. currentElementRemovalCount=max(1+1, removalSteps[6]=0)=2. stack=[10,7]
 *   nums[4] not > nums[7] (7 not > 11). Loop ends.
 *   removalSteps[4]=2. maximumSteps=max(1,2)=2. elementStack=[10, 7, 4]
 * i = 3 (nums[3]=4): nums[3] not > nums[4]. removalSteps[3]=0. maximumSteps=2. elementStack=[10, 7, 4, 3]
 * i = 2 (nums[2]=4): nums[2] not > nums[3]. removalSteps[2]=0. maximumSteps=2. elementStack=[10, 7, 4, 3, 2]
 * i = 1 (nums[1]=3): nums[1] not > nums[2]. removalSteps[1]=0. maximumSteps=2. elementStack=[10, 7, 4, 3, 2, 1]
 * i = 0 (nums[0]=5):
 *   nums[0]>nums[1] (5>3). poppedIdx=1. currentElementRemovalCount=max(0+1, removalSteps[1]=0)=1. stack=[10,7,4,3,2]
 *   nums[0]>nums[2] (5>4). poppedIdx=2. currentElementRemovalCount=max(1+1, removalSteps[2]=0)=2. stack=[10,7,4,3]
 *   nums[0]>nums[3] (5>4). poppedIdx=3. currentElementRemovalCount=max(2+1, removalSteps[3]=0)=3. stack=[10,7,4]
 *   nums[0] not > nums[4] (5 not > 7). Loop ends.
 *   removalSteps[0]=3. maximumSteps=max(2,3)=3. elementStack=[10, 7, 4, 0]
 *
 * Return maximumSteps = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var totalSteps = function (nums) {
  const arrayLength = nums.length;
  const elementStack = [];
  const removalSteps = new Array(arrayLength).fill(0);
  let maximumSteps = 0;

  for (let currentIdx = arrayLength - 1; currentIdx >= 0; currentIdx--) {
    let currentElementRemovalCount = 0;
    while (
      elementStack.length > 0 &&
      nums[currentIdx] > nums[elementStack[elementStack.length - 1]]
    ) {
      const poppedIdx = elementStack.pop();
      currentElementRemovalCount = Math.max(
        currentElementRemovalCount + 1,
        removalSteps[poppedIdx],
      );
    }
    removalSteps[currentIdx] = currentElementRemovalCount;
    maximumSteps = Math.max(maximumSteps, removalSteps[currentIdx]);
    elementStack.push(currentIdx);
  }

  return maximumSteps;
};
