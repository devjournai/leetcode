/**
 * Filter Restaurants By Vegan Friendly Price And Distance
 * Intuition: Filter by vegan/price/distance then sort by rating then id, both descending.
 * Approach: 1. Keep restaurants with vegan >= filter, price and distance within caps. 2. Sort by rating desc, then id desc. 3. Map to ids.
 * Dry Run: restaurants [[1,4,1,40,10],[2,8,0,50,5]], veganFriendly=0, maxPrice=50, maxDistance=10 → ids [2,1].
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var filterRestaurants = function (
  restaurants,
  veganFriendly,
  maxPrice,
  maxDistance
) {
  const eligiblePlaces = restaurants.filter((singlePlace) => {
    const placeVeganFriendlyStatus = singlePlace[2];
    const placePriceValue = singlePlace[3];
    const placeDistanceValue = singlePlace[4];

    const veganConditionMet = placeVeganFriendlyStatus >= veganFriendly;
    const priceConditionMet = placePriceValue <= maxPrice;
    const distanceConditionMet = placeDistanceValue <= maxDistance;

    return veganConditionMet && priceConditionMet && distanceConditionMet;
  });

  const sortedPlaces = eligiblePlaces.sort((firstPlace, secondPlace) => {
    const firstPlaceRating = firstPlace[1];
    const secondPlaceRating = secondPlace[1];
    const firstPlaceId = firstPlace[0];
    const secondPlaceId = secondPlace[0];

    if (firstPlaceRating === secondPlaceRating) {
      return secondPlaceId - firstPlaceId;
    } else {
      return secondPlaceRating - firstPlaceRating;
    }
  });

  const finalRestaurantIdentifiers = sortedPlaces.map((orderedPlace) => {
    const orderedPlaceId = orderedPlace[0];
    return orderedPlaceId;
  });

  return finalRestaurantIdentifiers;
};
