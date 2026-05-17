/**
 * Jump Game III
 * Intuition: The problem asks for reachability from a start index to any index with value 0, through jumps specified by array values. This is a classic graph traversal problem, where array indices are nodes and jumps are directed edges. A Depth-First Search (DFS) or Breadth-First Search (BFS) can determine if such a path exists. DFS explores one path completely before backtracking.
 * Approach: 1. Initialize a Set, named 'processedLocations', to store indices that have already been visited during the traversal, preventing redundant computations and infinite loops in case of cycles. 2. Define a recursive helper function, 'traverseJumps', that takes the current index, the array, and the 'processedLocations' set as arguments. 3. Inside 'traverseJumps', first handle base cases: a. If the 'currentPosition' is out of array bounds (less than 0 or greater than or equal to array length), return 'false'. b. If 'processedLocations' already contains 'currentPosition', it means this path has been explored or is part of a cycle, so return 'false'. c. If the value at 'inputArray[currentPosition]' is 0, we have successfully reached a target, so return 'true'. 4. For the recursive step, add 'currentPosition' to 'processedLocations'. 5. Calculate the 'moveDistance' using 'inputArray[currentPosition]'. 6. Recursively call 'traverseJumps' for two potential next positions: 'currentPosition + moveDistance' and 'currentPosition - moveDistance'. 7. If either of these recursive calls returns 'true', immediately return 'true' as a valid path to a zero-value index has been found. 8. If both recursive calls return 'false', it means no path to a zero-value index exists from the 'currentPosition', so return 'false'. 9. Start the process by calling 'traverseJumps' with the initial 'start' index, the input array, and a new empty 'processedLocations' set.
 * Dry Run: arr = [4,2,3,0,3,1,2], start = 5
 * canReach([4,2,3,0,3,1,2], 5)
 * Calls traverseJumps(5, arr, processedLocations = {})
 *   - currentPosition = 5. arr[5] = 1 (not 0).
 *   - 5 not in processedLocations. Add 5. processedLocations = {5}.
 *   - moveDistance = arr[5] = 1.
 *   - nextPositionPositive = 5 + 1 = 6.
 *   - Calls traverseJumps(6, arr, processedLocations = {5})
 *     - currentPosition = 6. arr[6] = 2 (not 0).
 *     - 6 not in processedLocations. Add 6. processedLocations = {5, 6}.
 *     - moveDistance = arr[6] = 2.
 *     - nextPositionPositive = 6 + 2 = 8. (Out of bounds, arr.length is 7).
 *     - Calls traverseJumps(8, arr, processedLocations = {5, 6}) -> Returns false (out of bounds).
 *     - nextPositionNegative = 6 - 2 = 4.
 *     - Calls traverseJumps(4, arr, processedLocations = {5, 6})
 *       - currentPosition = 4. arr[4] = 3 (not 0).
 *       - 4 not in processedLocations. Add 4. processedLocations = {5, 6, 4}.
 *       - moveDistance = arr[4] = 3.
 *       - nextPositionPositive = 4 + 3 = 7. (Out of bounds).
 *       - Calls traverseJumps(7, arr, processedLocations = {5, 6, 4}) -> Returns false (out of bounds).
 *       - nextPositionNegative = 4 - 3 = 1.
 *       - Calls traverseJumps(1, arr, processedLocations = {5, 6, 4})
 *         - currentPosition = 1. arr[1] = 2 (not 0).
 *         - 1 not in processedLocations. Add 1. processedLocations = {5, 6, 4, 1}.
 *         - moveDistance = arr[1] = 2.
 *         - nextPositionPositive = 1 + 2 = 3.
 *         - Calls traverseJumps(3, arr, processedLocations = {5, 6, 4, 1})
 *           - currentPosition = 3. arr[3] = 0. (Base case: Target found!)
 *           - Returns true.
 *         - traverseJumps(1, ...) receives true. Returns true.
 *       - traverseJumps(4, ...) receives true. Returns true.
 *     - traverseJumps(6, ...) receives true. Returns true.
 *   - traverseJumps(5, ...) receives true. Returns true.
 * Final result: true.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var canReach = function (arr, start) {
  const processedLocations = new Set();

  const traverseJumps = (currentPosition, inputArray, visitedTracker) => {
    if (currentPosition < 0 || currentPosition >= inputArray.length) {
      return false;
    }

    if (visitedTracker.has(currentPosition)) {
      return false;
    }

    if (inputArray[currentPosition] === 0) {
      return true;
    }

    visitedTracker.add(currentPosition);

    const moveDistance = inputArray[currentPosition];
    const nextPositionPositive = currentPosition + moveDistance;
    const nextPositionNegative = currentPosition - moveDistance;

    const resultFromForwardJump = traverseJumps(
      nextPositionPositive,
      inputArray,
      visitedTracker,
    );
    if (resultFromForwardJump) {
      return true;
    }

    const resultFromBackwardJump = traverseJumps(
      nextPositionNegative,
      inputArray,
      visitedTracker,
    );
    if (resultFromBackwardJump) {
      return true;
    }

    return false;
  };

  return traverseJumps(start, arr, processedLocations);
};
