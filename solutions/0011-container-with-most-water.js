/**
 * Container With Most Water
 * Intuition: The widest pair of lines is a candidate; shrinking the taller side cannot help, so move the pointer at the shorter height to search for a better min-height × width.
 * Approach: 1. Set `leftPointer` and `rightPointer` at the ends. 2. While they have not crossed, compute `potentialArea` from `min` heights times `currentWidth`. 3. Update `currentMaxArea`. 4. Increment `leftPointer` if its height is smaller, else decrement `rightPointer`. 5. Return `currentMaxArea`.
 * Dry Run: heightsArray = [1, 8, 6, 2].
 *   - L=0,R=3: min(1,2)*3=3, move left. L=1,R=3: min(8,2)*2=4, move right. L=1,R=2: min(8,6)*1=6. Return 6.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxArea = function (heightsArray) {
  let currentMaxArea = 0;
  let leftPointer = 0;
  let rightPointer = heightsArray.length - 1;

  while (leftPointer < rightPointer) {
    const currentHeight = Math.min(
      heightsArray[leftPointer],
      heightsArray[rightPointer]
    );
    const currentWidth = rightPointer - leftPointer;
    const potentialArea = currentHeight * currentWidth;
    currentMaxArea = Math.max(currentMaxArea, potentialArea);

    if (heightsArray[leftPointer] < heightsArray[rightPointer]) {
      leftPointer++;
    } else {
      rightPointer--;
    }
  }

  return currentMaxArea;
};
