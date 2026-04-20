/**
 * Minimum Index Sum Of Two Lists
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
