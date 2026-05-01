/**
 * Maximum Element After Decreasing And Rearranging
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maximumElementAfterDecrementingAndRearranging = function (arr) {
  arr.sort((valueA, valueB) => valueA - valueB);

  let currentMaxAchieved = 1;

  for (
    let currentElementIndex = 1;
    currentElementIndex < arr.length;
    currentElementIndex++
  ) {
    if (arr[currentElementIndex] > currentMaxAchieved) {
      currentMaxAchieved++;
    }
  }

  return currentMaxAchieved;
};
