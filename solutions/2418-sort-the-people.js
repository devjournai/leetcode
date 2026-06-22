/**
 * Sort The People
 * Intuition: To sort people by height while preserving their names, it's efficient to pair each person's name with their height, then sort these pairs based on height in descending order, and finally extract the names from the sorted pairs.
 * Approach: 1. Create a combined array of objects, where each object stores a person's name and their corresponding height. 2. Sort this combined array in descending order based on the 'height' property of each object. 3. Map the sorted array to a new array containing only the names, thereby producing the final desired output.
 * Dry Run: names = ["Mary","John","Emma"], heights = [180,165,170]
 * 1. `personDataCollection` creation:
 *    - `names[0]`="Mary", `heights[0]`=180 -> `{name: "Mary", height: 180}`
 *    - `names[1]`="John", `heights[1]`=165 -> `{name: "John", height: 165}`
 *    - `names[2]`="Emma", `heights[2]`=170 -> `{name: "Emma", height: 170}`
 *    `personDataCollection` becomes `[{name: "Mary", height: 180}, {name: "John", height: 165}, {name: "Emma", height: 170}]`.
 * 2. Sorting `personDataCollection`:
 *    The array is sorted by `height` in descending order:
 *    - `180` (Mary) > `170` (Emma) > `165` (John)
 *    `personDataCollection` after sort: `[{name: "Mary", height: 180}, {name: "Emma", height: 170}, {name: "John", height: 165}]`.
 * 3. Extracting names to `resultNames`:
 *    - From `{name: "Mary", height: 180}` -> "Mary"
 *    - From `{name: "Emma", height: 170}` -> "Emma"
 *    - From `{name: "John", height: 165}` -> "John"
 *    `resultNames` becomes `["Mary", "Emma", "John"]`.
 * Return `["Mary", "Emma", "John"]`.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var sortPeople = function (names, heights) {
  const personDataCollection = names.map((singleName, arrayIndex) => ({
    name: singleName,
    height: heights[arrayIndex],
  }));

  personDataCollection.sort(
    (firstPerson, secondPerson) => secondPerson.height - firstPerson.height,
  );

  const resultNames = personDataCollection.map(
    (individualPerson) => individualPerson.name,
  );

  return resultNames;
};
