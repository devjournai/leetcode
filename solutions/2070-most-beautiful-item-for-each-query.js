/**
 * Most Beautiful Item For Each Query
 * Intuition: To efficiently find the maximum beauty for items under a given price, we can first sort all items by their prices. Once sorted, for any query price, all relevant items (those with prices less than or equal to the query) will form a contiguous prefix of the sorted list. If we precompute the maximum beauty within each prefix, we can then use binary search to quickly locate the relevant items for each query and retrieve the precomputed maximum beauty.
 * Approach: 1. Create a shallow copy of the input `items` array and sort it in ascending order based on their prices. 2. Create a prefix maximum beauty array (`maxBeautyAccumulator`). Iterate through the sorted items and populate `maxBeautyAccumulator` such that `maxBeautyAccumulator[i]` stores the maximum beauty value encountered among `items[0]` through `items[i]`. 3. Initialize an `answerArray` of the same length as `queries` with zeros. 4. For each query price in the `queries` array, perform a binary search on the `sortedItemData` array to find the largest index `k` such that `sortedItemData[k][0]` (the price) is less than or equal to the current query price. 5. If such an index `k` is found, set the corresponding entry in `answerArray` to `maxBeautyAccumulator[k]`. Otherwise, it remains 0. 6. Return the `answerArray`.
 * Dry Run:
 * items = [[1,2],[3,2],[2,4],[5,3]], queries = [3,1]
 * 1. `sortedItemData = [[1,2], [2,4], [3,2], [5,3]]` (sorted copy of items)
 * 2. Compute `maxBeautyAccumulator`:
 *    `currentMaximumBeauty = 0`
 *    - For `sortedItemData[0] = [1,2]`: `currentMaximumBeauty = Math.max(0, 2) = 2`. `maxBeautyAccumulator = [2]`
 *    - For `sortedItemData[1] = [2,4]`: `currentMaximumBeauty = Math.max(2, 4) = 4`. `maxBeautyAccumulator = [2, 4]`
 *    - For `sortedItemData[2] = [3,2]`: `currentMaximumBeauty = Math.max(4, 2) = 4`. `maxBeautyAccumulator = [2, 4, 4]`
 *    - For `sortedItemData[3] = [5,3]`: `currentMaximumBeauty = Math.max(4, 3) = 4`. `maxBeautyAccumulator = [2, 4, 4, 4]`
 * 3. `answerArray = [0, 0]`
 * 4. Process queries:
 *    - `queryIndex = 0`, `currentQueryValue = 3`:
 *      Binary search on `sortedItemData` for largest index `k` where `sortedItemData[k][0] <= 3`.
 *      `lowBound = 0`, `highBound = 3`, `rightmostMatchIndex = -1`
 *      - `midPoint = 1`. `sortedItemData[1][0] = 2`. `2 <= 3` (true). `rightmostMatchIndex = 1`, `lowBound = 2`.
 *      - `lowBound = 2`, `highBound = 3`. `midPoint = 2`. `sortedItemData[2][0] = 3`. `3 <= 3` (true). `rightmostMatchIndex = 2`, `lowBound = 3`.
 *      - `lowBound = 3`, `highBound = 3`. `midPoint = 3`. `sortedItemData[3][0] = 5`. `5 <= 3` (false). `highBound = 2`.
 *      Loop ends. `rightmostMatchIndex = 2`.
 *      `answerArray[0] = maxBeautyAccumulator[2] = 4`. `answerArray = [4, 0]`
 *    - `queryIndex = 1`, `currentQueryValue = 1`:
 *      Binary search on `sortedItemData` for largest index `k` where `sortedItemData[k][0] <= 1`.
 *      `lowBound = 0`, `highBound = 3`, `rightmostMatchIndex = -1`
 *      - `midPoint = 1`. `sortedItemData[1][0] = 2`. `2 <= 1` (false). `highBound = 0`.
 *      - `lowBound = 0`, `highBound = 0`. `midPoint = 0`. `sortedItemData[0][0] = 1`. `1 <= 1` (true). `rightmostMatchIndex = 0`, `lowBound = 1`.
 *      Loop ends. `rightmostMatchIndex = 0`.
 *      `answerArray[1] = maxBeautyAccumulator[0] = 2`. `answerArray = [4, 2]`
 * 5. Return `[4, 2]`.
 * Time Complexity: O(N log N + M log N)
 * Space Complexity: O(N + M)
*/
var maximumBeauty = function (items, queries) {
    const sortedItemData = [...items].sort((firstItem, secondItem) => firstItem[0] - secondItem[0]);

    const maxBeautyAccumulator = new Array(sortedItemData.length);
    let currentMaximumBeauty = 0;

    for (let itemIndex = 0; itemIndex < sortedItemData.length; itemIndex++) {
        const [, itemBeautyValue] = sortedItemData[itemIndex];
        currentMaximumBeauty = Math.max(currentMaximumBeauty, itemBeautyValue);
        maxBeautyAccumulator[itemIndex] = currentMaximumBeauty;
    }

    const answerArray = new Array(queries.length).fill(0);

    for (let queryIndex = 0; queryIndex < queries.length; queryIndex++) {
        const currentQueryValue = queries[queryIndex];
        let lowBound = 0;
        let highBound = sortedItemData.length - 1;
        let rightmostMatchIndex = -1;

        while (lowBound <= highBound) {
            const midPoint = Math.floor(lowBound + (highBound - lowBound) / 2);
            const itemPricePoint = sortedItemData[midPoint][0];

            if (itemPricePoint <= currentQueryValue) {
                rightmostMatchIndex = midPoint;
                lowBound = midPoint + 1;
            } else {
                highBound = midPoint - 1;
            }
        }

        if (rightmostMatchIndex !== -1) {
            answerArray[queryIndex] = maxBeautyAccumulator[rightmostMatchIndex];
        }
    }

    return answerArray;
};