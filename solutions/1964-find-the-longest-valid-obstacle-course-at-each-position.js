/**
 * Find The Longest Valid Obstacle Course At Each Position
 * Intuition: The problem asks for the length of the longest non-decreasing subsequence ending at each position. This is a classic variation of the Longest Increasing Subsequence (LIS) problem, adapted for non-decreasing sequences. The key insight is to maintain an auxiliary array (often called 'tails' or 'dp' array) which stores the smallest ending element for all non-decreasing subsequences of a given length. When processing a new obstacle, we use binary search on this 'tails' array to find the correct position to either update an existing subsequence or extend the longest one found so far.
 * Approach: 1. Initialize an `courseLengths` array of the same size as `obstacles` to store the result for each position, initially filling it with 1s (as each obstacle itself forms a course of length 1). 2. Initialize a `tailsOfCourses` array, which will store the smallest ending height for all non-decreasing subsequences of different lengths found so far. `tailsOfCourses[k]` will be the smallest tail of all non-decreasing subsequences of length `k+1`. 3. Iterate through each obstacle `currentObstacleHeight` in the `obstacles` array using `currentObstacleIndex`. 4. For each `currentObstacleHeight`, perform a binary search on `tailsOfCourses` to find the smallest element that is strictly greater than `currentObstacleHeight`. This binary search identifies the position `searchStart` where `currentObstacleHeight` can fit to form a non-decreasing subsequence. 5. If `searchStart` is equal to the current length of `tailsOfCourses`, it means `currentObstacleHeight` is greater than or equal to all elements in `tailsOfCourses`, thus extending the longest non-decreasing subsequence by one. In this case, append `currentObstacleHeight` to `tailsOfCourses`. 6. Otherwise (`searchStart` is less than `tailsOfCourses.length`), it means `currentObstacleHeight` can replace `tailsOfCourses[searchStart]`. This is beneficial because `currentObstacleHeight` forms a non-decreasing subsequence of length `searchStart + 1` with a smaller or equal ending value, making it more favorable for future extensions. 7. The length of the longest non-decreasing subsequence ending at `obstacles[currentObstacleIndex]` is `searchStart + 1`. Store this value in `courseLengths[currentObstacleIndex]`. 8. After iterating through all obstacles, return the `courseLengths` array.
 * Dry Run: obstacles = [3, 1, 5, 6, 4, 2]
 *   totalObstaclesCount = 6
 *   courseLengths = [1, 1, 1, 1, 1, 1]
 *   tailsOfCourses = []
 *
 *   currentObstacleIndex = 0, currentObstacleHeight = 3:
 *     searchStart = 0, searchEnd = 0. Binary search finds no element > 3.
 *     searchStart (0) == tailsOfCourses.length (0). tailsOfCourses.push(3).
 *     tailsOfCourses = [3]
 *     courseLengths[0] = 0 + 1 = 1.
 *     courseLengths = [1, 1, 1, 1, 1, 1]
 *
 *   currentObstacleIndex = 1, currentObstacleHeight = 1:
 *     searchStart = 0, searchEnd = 1. Binary search for first element > 1 in [3].
 *       searchMidpoint = 0. tailsOfCourses[0] (3) <= 1 is false. searchEnd = 0.
 *     Loop ends: searchStart = 0, searchEnd = 0.
 *     searchStart (0) < tailsOfCourses.length (1). tailsOfCourses[0] = 1.
 *     tailsOfCourses = [1]
 *     courseLengths[1] = 0 + 1 = 1.
 *     courseLengths = [1, 1, 1, 1, 1, 1]
 *
 *   currentObstacleIndex = 2, currentObstacleHeight = 5:
 *     searchStart = 0, searchEnd = 1. Binary search for first element > 5 in [1].
 *       searchMidpoint = 0. tailsOfCourses[0] (1) <= 5 is true. searchStart = 1.
 *     Loop ends: searchStart = 1, searchEnd = 1.
 *     searchStart (1) == tailsOfCourses.length (1). tailsOfCourses.push(5).
 *     tailsOfCourses = [1, 5]
 *     courseLengths[2] = 1 + 1 = 2.
 *     courseLengths = [1, 1, 2, 1, 1, 1]
 *
 *   currentObstacleIndex = 3, currentObstacleHeight = 6:
 *     searchStart = 0, searchEnd = 2. Binary search for first element > 6 in [1, 5].
 *       searchMidpoint = 1. tailsOfCourses[1] (5) <= 6 is true. searchStart = 2.
 *     Loop ends: searchStart = 2, searchEnd = 2.
 *     searchStart (2) == tailsOfCourses.length (2). tailsOfCourses.push(6).
 *     tailsOfCourses = [1, 5, 6]
 *     courseLengths[3] = 2 + 1 = 3.
 *     courseLengths = [1, 1, 2, 3, 1, 1]
 *
 *   currentObstacleIndex = 4, currentObstacleHeight = 4:
 *     searchStart = 0, searchEnd = 3. Binary search for first element > 4 in [1, 5, 6].
 *       searchMidpoint = 1. tailsOfCourses[1] (5) <= 4 is false. searchEnd = 1.
 *       searchMidpoint = 0. tailsOfCourses[0] (1) <= 4 is true. searchStart = 1.
 *     Loop ends: searchStart = 1, searchEnd = 1.
 *     searchStart (1) < tailsOfCourses.length (3). tailsOfCourses[1] = 4.
 *     tailsOfCourses = [1, 4, 6]
 *     courseLengths[4] = 1 + 1 = 2.
 *     courseLengths = [1, 1, 2, 3, 2, 1]
 *
 *   currentObstacleIndex = 5, currentObstacleHeight = 2:
 *     searchStart = 0, searchEnd = 3. Binary search for first element > 2 in [1, 4, 6].
 *       searchMidpoint = 1. tailsOfCourses[1] (4) <= 2 is false. searchEnd = 1.
 *       searchMidpoint = 0. tailsOfCourses[0] (1) <= 2 is true. searchStart = 1.
 *     Loop ends: searchStart = 1, searchEnd = 1.
 *     searchStart (1) < tailsOfCourses.length (3). tailsOfCourses[1] = 2.
 *     tailsOfCourses = [1, 2, 6]
 *     courseLengths[5] = 1 + 1 = 2.
 *     courseLengths = [1, 1, 2, 3, 2, 2]
 *
 *   Return [1, 1, 2, 3, 2, 2]
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var longestObstacleCourseAtEachPosition = function (obstacles) {
  const totalObstaclesCount = obstacles.length;
  const courseLengths = new Array(totalObstaclesCount).fill(1);
  const tailsOfCourses = [];

  for (
    let currentObstacleIndex = 0;
    currentObstacleIndex < totalObstaclesCount;
    currentObstacleIndex++
  ) {
    const currentObstacleHeight = obstacles[currentObstacleIndex];
    let searchStart = 0;
    let searchEnd = tailsOfCourses.length;

    while (searchStart < searchEnd) {
      const searchMidpoint = Math.floor((searchStart + searchEnd) / 2);
      if (tailsOfCourses[searchMidpoint] <= currentObstacleHeight) {
        searchStart = searchMidpoint + 1;
      } else {
        searchEnd = searchMidpoint;
      }
    }

    if (searchStart < tailsOfCourses.length) {
      tailsOfCourses[searchStart] = currentObstacleHeight;
    } else {
      tailsOfCourses.push(currentObstacleHeight);
    }

    courseLengths[currentObstacleIndex] = searchStart + 1;
  }

  return courseLengths;
};
