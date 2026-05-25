/**
 * Watering Plants Ii
 * Intuition: The problem describes two people watering plants from opposite ends simultaneously, which is a classic scenario for a two-pointer approach. We need to simulate their actions, keeping track of their current water levels and the number of refills, with special handling for when they meet at the same plant.
 * Approach: 1. Initialize two pointers, one for Alice starting from the left (index 0) and one for Bob starting from the right (index `plants.length - 1`). 2. Maintain their current water levels and separate refill counts. 3. Iterate with a `while` loop as long as the left pointer is less than the right pointer. 4. Inside the loop, Alice waters her plant: check if she needs to refill, update her water, and advance her pointer. Bob waters his plant: check if he needs to refill, update his water, and advance his pointer. 5. After the loop, if the pointers have met at the same index (indicating an odd number of plants), determine who waters the middle plant based on their remaining water (Alice if `currentWaterA >= currentWaterB`, otherwise Bob). Increment the appropriate refill count if needed. 6. Return the total sum of Alice's and Bob's refill counts.
 * Dry Run: plants = [1,2,4,4,5], capacityA = 6, capacityB = 5
 * Initial: leftPlantIndex=0, rightPlantIndex=4, aliceRefills=0, bobRefills=0, aliceCurrentWater=6, bobCurrentWater=5, originalCapacityA=6, originalCapacityB=5
 *
 * Loop (leftPlantIndex < rightPlantIndex):
 * Iteration 1: (0 < 4) is true
 *   Alice: plants[0]=1. aliceCurrentWater(6) >= 1. aliceCurrentWater = 6-1=5. leftPlantIndex=1.
 *   Bob: plants[4]=5. bobCurrentWater(5) >= 5. bobCurrentWater = 5-5=0. rightPlantIndex=3.
 *   State: leftPlantIndex=1, rightPlantIndex=3, aliceRefills=0, bobRefills=0, aliceCurrentWater=5, bobCurrentWater=0
 *
 * Iteration 2: (1 < 3) is true
 *   Alice: plants[1]=2. aliceCurrentWater(5) >= 2. aliceCurrentWater = 5-2=3. leftPlantIndex=2.
 *   Bob: plants[3]=4. bobCurrentWater(0) < 4. bobRefills=1. bobCurrentWater = originalCapacityB (5). bobCurrentWater = 5-4=1. rightPlantIndex=2.
 *   State: leftPlantIndex=2, rightPlantIndex=2, aliceRefills=0, bobRefills=1, aliceCurrentWater=3, bobCurrentWater=1
 *
 * Loop condition (2 < 2) is false. Loop terminates.
 *
 * Post-loop check (leftPlantIndex === rightPlantIndex):
 *   (2 === 2) is true. Middle plant is plants[2]=4.
 *   Compare water: aliceCurrentWater(3) vs bobCurrentWater(1).
 *   aliceCurrentWater(3) >= bobCurrentWater(1) is true. Alice waters.
 *   Check refill for Alice: aliceCurrentWater(3) < plants[2](4) is true. aliceRefills=1.
 *   Final refills: aliceRefills=1, bobRefills=1.
 *
 * Return aliceRefills + bobRefills = 1 + 1 = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumRefill = function (plants, capacityA, capacityB) {
  let leftPlantIndex = 0;
  let rightPlantIndex = plants.length - 1;
  let aliceRefillsCount = 0;
  let bobRefillsCount = 0;
  let aliceCurrentWater = capacityA;
  let bobCurrentWater = capacityB;
  let initialCapacityA = capacityA;
  let initialCapacityB = capacityB;

  while (leftPlantIndex < rightPlantIndex) {
    if (aliceCurrentWater < plants[leftPlantIndex]) {
      aliceRefillsCount++;
      aliceCurrentWater = initialCapacityA;
    }
    aliceCurrentWater -= plants[leftPlantIndex];
    leftPlantIndex++;

    if (bobCurrentWater < plants[rightPlantIndex]) {
      bobRefillsCount++;
      bobCurrentWater = initialCapacityB;
    }
    bobCurrentWater -= plants[rightPlantIndex];
    rightPlantIndex--;
  }

  if (leftPlantIndex === rightPlantIndex) {
    let middlePlantNeeds = plants[leftPlantIndex];
    if (aliceCurrentWater >= bobCurrentWater) {
      if (aliceCurrentWater < middlePlantNeeds) {
        aliceRefillsCount++;
      }
    } else {
      if (bobCurrentWater < middlePlantNeeds) {
        bobRefillsCount++;
      }
    }
  }

  return aliceRefillsCount + bobRefillsCount;
};
