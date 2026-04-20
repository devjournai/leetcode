/**
 * Boats To Save People
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
