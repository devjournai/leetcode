/**
 * Get Maximum In Generated Array
 * Intuition: Build nums[0..n] from the given even/odd recurrence and track the running maximum.
 * Approach: 1. Handle n=0. 2. Set nums[0]=0, nums[1]=1. 3. For i=2..n, even: nums[i]=nums[i/2]; odd: nums[i]=nums[floor(i/2)]+nums[floor(i/2)+1]. 4. Update the max.
 * Dry Run: n=7 → array [0,1,1,2,1,3,2,3], max 3.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var getMaximumGenerated = function (n) {
  if (n === 0) {
    return 0;
  }

  const numberSequence = new Array(n + 1);
  numberSequence[0] = 0;
  numberSequence[1] = 1;

  let currentTopValue = 1;

  for (let sequenceIndex = 2; sequenceIndex <= n; sequenceIndex++) {
    const halfIndex = Math.floor(sequenceIndex / 2);

    if (sequenceIndex % 2 === 0) {
      numberSequence[sequenceIndex] = numberSequence[halfIndex];
    } else {
      numberSequence[sequenceIndex] =
        numberSequence[halfIndex] + numberSequence[halfIndex + 1];
    }

    currentTopValue = Math.max(currentTopValue, numberSequence[sequenceIndex]);
  }

  return currentTopValue;
};
