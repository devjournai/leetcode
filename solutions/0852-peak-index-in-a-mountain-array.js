/**
 * Peak Index In A Mountain Array
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
