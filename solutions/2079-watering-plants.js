/**
* Watering Plants
* Intuition: Simulate the watering process, moving from left to right. The main challenge is correctly calculating steps when a refill is required. A refill entails returning to the river from the current plant's position and then traveling back to the current plant.
* Approach: 1. Initialize `totalStepsCount` to zero and `currentCanWater` to the initial `capacity`. 2. Iterate through each `plantIndex` from 0 to `plants.length - 1`. 3. In each iteration, check if `currentCanWater` is less than `plants[plantIndex]`. If it is, a refill is needed. 4. If refilling, add `2 * plantIndex` to `totalStepsCount` (representing the round trip to the river and back to the current plant `plantIndex`) and reset `currentCanWater` to `capacity`. 5. After the refill check (or if no refill was needed), subtract `plants[plantIndex]` from `currentCanWater`. 6. Increment `totalStepsCount` by 1, accounting for the step taken to move from the previous plant's location to the current `plantIndex`. 7. After the loop completes, return `totalStepsCount`.
* Dry Run: plants = [2, 2, 3, 3], capacity = 5
* Initial: totalStepsCount = 0, currentCanWater = 5
*
* plantIndex = 0 (plants[0] = 2):
*   currentCanWater (5) >= plants[0] (2). No refill.
*   currentCanWater = 5 - 2 = 3.
*   totalStepsCount = 0 + 1 = 1.
*
* plantIndex = 1 (plants[1] = 2):
*   currentCanWater (3) >= plants[1] (2). No refill.
*   currentCanWater = 3 - 2 = 1.
*   totalStepsCount = 1 + 1 = 2.
*
* plantIndex = 2 (plants[2] = 3):
*   currentCanWater (1) < plants[2] (3). Refill needed!
*   totalStepsCount = 2 + (2 * 2) = 2 + 4 = 6.
*   currentCanWater = 5.
*   currentCanWater = 5 - 3 = 2.
*   totalStepsCount = 6 + 1 = 7.
*
* plantIndex = 3 (plants[3] = 3):
*   currentCanWater (2) < plants[3] (3). Refill needed!
*   totalStepsCount = 7 + (2 * 3) = 7 + 6 = 13.
*   currentCanWater = 5.
*   currentCanWater = 5 - 3 = 2.
*   totalStepsCount = 13 + 1 = 14.
*
* Loop ends. Return totalStepsCount = 14.
* Time Complexity: O(N)
* Space Complexity: O(1)
*/
var wateringPlants = function (plants, capacity) {
    let currentCanWater = capacity;
    let totalStepsCount = 0;

    for (let plantIndex = 0; plantIndex < plants.length; plantIndex++) {
        if (currentCanWater < plants[plantIndex]) {
            totalStepsCount += 2 * plantIndex;
            currentCanWater = capacity;
        }
        currentCanWater -= plants[plantIndex];
        totalStepsCount++;
    }

    return totalStepsCount;
};