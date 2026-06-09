/**
* Maximum Consecutive Floors Without Special Floors
* Intuition: The maximum number of consecutive non-special floors will occur in one of three segments: the space from the building's bottom to the first special floor, the space from the last special floor to the building's top, or within the gaps between any two adjacent special floors after sorting them.
* Approach: 1. Sort the `special` array in ascending order to easily identify consecutive special floors and the gaps between them. 2. Calculate the maximum consecutive floors for the two edge cases: `special[0] - bottom` (floors before the first special one) and `top - special[last_index]` (floors after the last special one). Initialize a `maximumConsecutiveCount` with the larger of these two values. 3. Iterate through the sorted `special` array, using a `while` loop, from the second special floor to the end. In each step, calculate the number of non-special floors between the current special floor and the preceding one (`current_special_floor - previous_special_floor - 1`). 4. Update `maximumConsecutiveCount` if the newly calculated gap is larger. 5. Return the final `maximumConsecutiveCount`.
* Dry Run: bottom = 2, top = 9, special = [4, 6]
    1. special.sort((floorA, floorB) => floorA - floorB) results in special = [4, 6].
    2. initialMaxGapOne = special[0] - bottom = 4 - 2 = 2.
        specialFloorsLength = 2.
        lastFloorIndex = 1.
        initialMaxGapTwo = top - special[lastFloorIndex] = 9 - 6 = 3.
        maximumConsecutiveCount = Math.max(2, 3) = 3.
    3. currentFloorIndex = 1.
       while (currentFloorIndex < specialFloorsLength) condition (1 < 2) is true.
       previousSpecialFloor = special[0] = 4.
       currentSpecialFloor = special[1] = 6.
       consecutiveMiddle = currentSpecialFloor - previousSpecialFloor - 1 = 6 - 4 - 1 = 1.
       maximumConsecutiveCount = Math.max(3, 1) = 3.
       currentFloorIndex becomes 2.
    4. while (currentFloorIndex < specialFloorsLength) condition (2 < 2) is false. Loop terminates.
    5. Return maximumConsecutiveCount = 3.
* Time Complexity: O(S log S)
* Space Complexity: O(log S)
*/
var maxConsecutive = function (bottom, top, special) {
  special.sort((floorA, floorB) => floorA - floorB);

  let initialMaxGapOne = special[0] - bottom;
  let specialFloorsLength = special.length;
  let lastFloorIndex = specialFloorsLength - 1;
  let initialMaxGapTwo = top - special[lastFloorIndex];

  let maximumConsecutiveCount = Math.max(initialMaxGapOne, initialMaxGapTwo);

  let currentFloorIndex = 1;
  while (currentFloorIndex < specialFloorsLength) {
    let previousSpecialFloor = special[currentFloorIndex - 1];
    let currentSpecialFloor = special[currentFloorIndex];
    let consecutiveMiddle = currentSpecialFloor - previousSpecialFloor - 1;
    maximumConsecutiveCount = Math.max(
      maximumConsecutiveCount,
      consecutiveMiddle,
    );
    currentFloorIndex++;
  }

  return maximumConsecutiveCount;
};
