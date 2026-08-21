/**
 * Minimum Cost to Make Arrays Identical
 * Intuition: arr[i] must become brr[i]. Either pay |arr[i]-brr[i]| in place, or pay k once to rearrange arr arbitrarily (equivalent to sorting both) then pay the sorted L1.
 * Approach: 1. Compute unsorted L1. 2. Compute L1 after sorting copies of both arrays, plus k. 3. Return the min.
 * Dry Run: arr = [3,2,1], brr = [1,2,3], k = 2. Unsorted cost 4, sorted cost 0+2=2 → 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var minCost = function (arr, brr, k) {
  const pairCost = (firstArray, secondArray) => {
    let totalCost = 0;
    for (let index = 0; index < firstArray.length; index++) {
      totalCost += Math.abs(firstArray[index] - secondArray[index]);
    }
    return totalCost;
  };

  const unsortedCost = pairCost(arr, brr);
  const sortedArr = [...arr].sort((left, right) => left - right);
  const sortedBrr = [...brr].sort((left, right) => left - right);
  return Math.min(unsortedCost, pairCost(sortedArr, sortedBrr) + k);
};
