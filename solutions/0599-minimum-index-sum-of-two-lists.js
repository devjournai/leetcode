/**
 * Minimum Index Sum Of Two Lists
 * Intuition: Common restaurants with the smallest `index1+index2` are the answer (ties keep all). Map list1 names to indices, then scan list2 and track the running min sum.
 * Approach: 1. Fill `restaurantIndexMap` from `list1`. 2. `minTotalIndex = Infinity`, `finalRestaurantList = []`. 3. For each `candidateRestaurantName` in `list2`, if mapped, `calculatedIndexTotal = firstListPosition + candidateRestaurantIndex`. 4. Smaller sum replaces the list; equal sum pushes. 5. Return `finalRestaurantList`.
 * Dry Run: list1=["Shogun","Tapioca"], list2=["Piatti","Shogun"].
 *   - Shogun at 0 and 1, sum 1. Only common. Return ["Shogun"].
 * Time Complexity: O(L1 + L2)
 * Space Complexity: O(L1)
 */
var findRestaurant = function (list1, list2) {
  const restaurantIndexMap = new Map();
  const firstListLength = list1.length;

  for (
    let firstListCounter = 0;
    firstListCounter < firstListLength;
    firstListCounter++
  ) {
    const currentListName = list1[firstListCounter];
    restaurantIndexMap.set(currentListName, firstListCounter);
  }

  let minTotalIndex = Infinity;
  let finalRestaurantList = [];

  const secondListLength = list2.length;
  for (
    let secondListCounter = 0;
    secondListCounter < secondListLength;
    secondListCounter++
  ) {
    const candidateRestaurantName = list2[secondListCounter];
    const candidateRestaurantIndex = secondListCounter;

    if (restaurantIndexMap.has(candidateRestaurantName)) {
      const firstListPosition = restaurantIndexMap.get(candidateRestaurantName);
      const calculatedIndexTotal = firstListPosition + candidateRestaurantIndex;

      if (calculatedIndexTotal < minTotalIndex) {
        minTotalIndex = calculatedIndexTotal;
        finalRestaurantList = [candidateRestaurantName];
      } else if (calculatedIndexTotal === minTotalIndex) {
        finalRestaurantList.push(candidateRestaurantName);
      }
    }
  }

  return finalRestaurantList;
};
