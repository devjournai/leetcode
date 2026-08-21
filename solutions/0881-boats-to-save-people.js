/**
 * Boats To Save People
 * Intuition: After sorting, always seat the heaviest remaining person. Pair them with the lightest if they fit together; otherwise they go alone.
 * Approach: 1. Sort `people` ascending. 2. Two pointers `lightestPersonIndex` and `heaviestPersonIndex`. 3. While light ≤ heavy, if sum ≤ `limit` advance both, else only decrement heavy. 4. Increment `numberOfBoats` each iteration. 5. Return the boat count.
 * Dry Run: people = [3, 2, 2, 1], limit = 3.
 *   - Sorted [1,2,2,3]. 1+3>3 → boat for 3. 1+2≤3 → boat for 1 and 2. Last 2 alone. Return 3.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var numRescueBoats = function (people, limit) {
  people.sort((a, b) => a - b);

  let numberOfBoats = 0;
  let lightestPersonIndex = 0;
  let heaviestPersonIndex = people.length - 1;

  while (lightestPersonIndex <= heaviestPersonIndex) {
    if (people[lightestPersonIndex] + people[heaviestPersonIndex] <= limit) {
      lightestPersonIndex++;
      heaviestPersonIndex--;
    } else {
      heaviestPersonIndex--;
    }
    numberOfBoats++;
  }

  return numberOfBoats;
};
