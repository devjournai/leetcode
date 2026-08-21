/**
 * Peak Index In A Mountain Array
 * Intuition: Binary search the unique peak: if mid is above both neighbors return it; if the slope still rises, peak is to the right, else left.
 * Approach: 1. `firstIndex=1`, `lastIndex=n-2`. 2. Mid: greater than both sides → return. 3. Else if arr[mid] < arr[mid+1] go right, else left.
 * Dry Run: [0,1,0]. mid=1, 1>0 and 1>0 → return 1. [0,2,1,0]: mid=1, 2>0 and 2>1 → 1.
 * Time Complexity: O(log(n))
 * Space Complexity: O(1)
 */
var peakIndexInMountainArray = function (arr) {
  let firstIndex = 1;
  let lastIndex = arr.length - 2;

  while (firstIndex <= lastIndex) {
    let centralIndex = Math.floor((firstIndex + lastIndex) / 2);

    if (
      arr[centralIndex] > arr[centralIndex - 1] &&
      arr[centralIndex] > arr[centralIndex + 1]
    ) {
      return centralIndex;
    } else if (arr[centralIndex] < arr[centralIndex + 1]) {
      firstIndex = centralIndex + 1;
    } else {
      lastIndex = centralIndex - 1;
    }
  }
};
