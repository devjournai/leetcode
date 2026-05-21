/**
* Minimized Maximum Of Products Distributed To Any Store
* Intuition: This problem asks to minimize a maximum value, which is a classic indicator for applying binary search on the answer. We can search for the minimum possible value 'x' (the maximum products any store receives) such that all products can be distributed.
* Approach:
*   1. Define a search space for the possible maximum number of products `x` a store can receive. The lower bound `searchLowerBound` is 1 (a store must receive at least 1 product if it receives any). The upper bound `searchUpperBound` is the maximum value present in the `quantities` array (in the worst case, one store might have to take all products of a single type).
*   2. Perform a binary search within this `[searchLowerBound, searchUpperBound]` range. In each iteration, calculate `currentCandidateMax = Math.floor((searchLowerBound + searchUpperBound) / 2)`.
*   3. For the `currentCandidateMax`, determine the `totalStoresRequired` to distribute all products from `productAmounts`. Iterate through `productAmounts` using an index `productIndex`. For each `productAmountItem` at `productIndex`, the number of stores needed is `Math.ceil(productAmountItem / currentCandidateMax)`. Sum these up.
*   4. Compare `totalStoresRequired` with the available `storeCount`.
*      - If `totalStoresRequired <= storeCount`, it means `currentCandidateMax` is a feasible maximum. We try to find an even smaller maximum, so we update `searchUpperBound = currentCandidateMax`.
*      - If `totalStoresRequired > storeCount`, it means `currentCandidateMax` is too restrictive (too few products allowed per store). We need to allow more products per store, so we update `searchLowerBound = currentCandidateMax + 1`.
*   5. The binary search continues until `searchLowerBound` equals `searchUpperBound`. This final value represents the minimized maximum number of products any store receives.
* Dry Run:
*   n = 6, quantities = [11, 7]
*   storeCount = 6, productAmounts = [11, 7]
*   searchLowerBound = 1
*   maxValueInQuantities = Math.max(11, 7) = 11
*   searchUpperBound = 11
*
*   Iteration 1:
*     searchLowerBound = 1, searchUpperBound = 11
*     currentCandidateMax = Math.floor((1 + 11) / 2) = 6
*     totalStoresRequired = 0
*     productAmounts[0] (11): storesNeededForType = Math.ceil(11 / 6) = 2
*     totalStoresRequired = 2
*     productAmounts[1] (7): storesNeededForType = Math.ceil(7 / 6) = 2
*     totalStoresRequired = 2 + 2 = 4
*     Since totalStoresRequired (4) <= storeCount (6): searchUpperBound = 6
*
*   Iteration 2:
*     searchLowerBound = 1, searchUpperBound = 6
*     currentCandidateMax = Math.floor((1 + 6) / 2) = 3
*     totalStoresRequired = 0
*     productAmounts[0] (11): storesNeededForType = Math.ceil(11 / 3) = 4
*     totalStoresRequired = 4
*     productAmounts[1] (7): storesNeededForType = Math.ceil(7 / 3) = 3
*     totalStoresRequired = 4 + 3 = 7
*     Since totalStoresRequired (7) > storeCount (6): searchLowerBound = 3 + 1 = 4
*
*   Iteration 3:
*     searchLowerBound = 4, searchUpperBound = 6
*     currentCandidateMax = Math.floor((4 + 6) / 2) = 5
*     totalStoresRequired = 0
*     productAmounts[0] (11): storesNeededForType = Math.ceil(11 / 5) = 3
*     totalStoresRequired = 3
*     productAmounts[1] (7): storesNeededForType = Math.ceil(7 / 5) = 2
*     totalStoresRequired = 3 + 2 = 5
*     Since totalStoresRequired (5) <= storeCount (6): searchUpperBound = 5
*
*   Iteration 4:
*     searchLowerBound = 4, searchUpperBound = 5
*     currentCandidateMax = Math.floor((4 + 5) / 2) = 4
*     totalStoresRequired = 0
*     productAmounts[0] (11): storesNeededForType = Math.ceil(11 / 4) = 3
*     totalStoresRequired = 3
*     productAmounts[1] (7): storesNeededForType = Math.ceil(7 / 4) = 2
*     totalStoresRequired = 3 + 2 = 5
*     Since totalStoresRequired (5) <= storeCount (6): searchUpperBound = 4
*
*   Iteration 5:
*     searchLowerBound = 4, searchUpperBound = 4
*     Loop terminates because searchLowerBound (4) is not less than searchUpperBound (4).
*
*   Return searchLowerBound (4).
* Time Complexity: O(M * log(MaxQ))
* Space Complexity: O(1)
*/
var minimizedMaximum = function (n, quantities) {
    let storeCount = n;
    let productAmounts = quantities;

    let searchLowerBound = 1;
    let maxValueInQuantities = 0;
    if (productAmounts.length > 0) {
        maxValueInQuantities = Math.max(...productAmounts);
    } else {
        return 0;
    }

    let searchUpperBound = maxValueInQuantities;

    while (searchLowerBound < searchUpperBound) {
        let currentCandidateMax = Math.floor((searchLowerBound + searchUpperBound) / 2);
        let totalStoresRequired = 0;

        for (let productIndex = 0; productIndex < productAmounts.length; productIndex++) {
            let productAmountItem = productAmounts[productIndex];
            totalStoresRequired += Math.ceil(productAmountItem / currentCandidateMax);
        }

        if (totalStoresRequired <= storeCount) {
            searchUpperBound = currentCandidateMax;
        } else {
            searchLowerBound = currentCandidateMax + 1;
        }
    }

    return searchLowerBound;
};