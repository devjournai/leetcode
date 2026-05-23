/**
 * Minimum Number Of Food Buckets To Feed The Hamsters
 * Intuition: A greedy approach is optimal. For each hamster that needs feeding, prioritize placing a food bucket to its right. This allows the bucket to potentially feed subsequent hamsters as well, maximizing its utility. If a right-side placement isn't possible, then place the bucket to its left. If neither is possible, it's impossible to feed.
 * Approach: 1. Convert the input string `hamsters` into a mutable character array. 2. Initialize a counter for food buckets. 3. Iterate through the array using a `placeIndex`. 4. If a hamster ('H') is found at `placeIndex`: a. Check if it's already fed by a bucket immediately to its left (at `placeIndex - 1`). If so, continue to the next iteration. b. If not fed, attempt to place a bucket to its right (at `placeIndex + 1`). If `placeIndex + 1` is within bounds and empty ('.'), place a bucket there, increment the `bucketCount`, and then advance `placeIndex` by two. This skip is crucial because the placed bucket at `placeIndex + 1` covers `placeIndex` and might cover `placeIndex + 2`. c. If a right placement is not possible, attempt to place a bucket to its left (at `placeIndex - 1`). If `placeIndex - 1` is within bounds and empty ('.'), place a bucket there and increment `bucketCount`. d. If neither left nor right placement is possible, it's impossible to feed all hamsters, so return -1. 5. After iterating through all positions, return the final `bucketCount`.
 * Dry Run: hamsters = ".H.H."
 *   hamsterPlaces = ['.', 'H', '.', 'H', '.']
 *   bucketCount = 0
 *   hamsterPlacesLength = 5
 *
 *   placeIndex = 0: hamsterPlaces[0] is '.' (skip)
 *
 *   placeIndex = 1: hamsterPlaces[1] is 'H'
 *     - Check left: placeIndex > 0 && hamsterPlaces[0] === 'B' (false, hamsterPlaces[0] is '.')
 *     - Attempt right placement: placeIndex + 1 = 2. 2 < 5 (true). hamsterPlaces[2] === '.' (true).
 *       - Place bucket: hamsterPlaces[2] = 'B'.
 *       - bucketCount becomes 1.
 *       - hamsterPlaces is now ['.', 'H', 'B', 'H', '.']
 *       - Advance placeIndex: placeIndex = 1 + 2 = 3.
 *   (Loop's automatic increment will make placeIndex become 4 for the next iteration)
 *
 *   placeIndex = 4: hamsterPlaces[4] is '.' (skip)
 *
 *   (Loop's automatic increment will make placeIndex become 5. Loop condition placeIndex < hamsterPlacesLength (5 < 5) is false. Loop terminates.)
 *
 *   Return bucketCount = 1.
 *   (This is correct, as a single bucket at index 2 feeds both hamsters at index 1 and 3).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minimumBuckets = function (hamsters) {
  const hamsterPlacesLength = hamsters.length;
  let bucketCount = 0;
  const hamsterPlaces = hamsters.split("");

  for (let placeIndex = 0; placeIndex < hamsterPlacesLength; placeIndex++) {
    if (hamsterPlaces[placeIndex] === "H") {
      if (placeIndex > 0 && hamsterPlaces[placeIndex - 1] === "B") {
        continue;
      }

      if (
        placeIndex + 1 < hamsterPlacesLength &&
        hamsterPlaces[placeIndex + 1] === "."
      ) {
        hamsterPlaces[placeIndex + 1] = "B";
        bucketCount++;
        placeIndex += 2;
      } else if (placeIndex > 0 && hamsterPlaces[placeIndex - 1] === ".") {
        hamsterPlaces[placeIndex - 1] = "B";
        bucketCount++;
      } else {
        return -1;
      }
    }
  }

  return bucketCount;
};
