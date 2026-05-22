/**
 * Range Frequency Queries
 * Intuition: To efficiently find frequencies in arbitrary ranges, pre-process the input array to store all indices for each unique value. Then, for a given query (left, right, value), use binary search on the value's sorted list of indices to find the count of indices falling within the [left, right] range.
 * Approach: 1. In the constructor, create a Map where keys are the numbers from the input array and values are sorted lists of their 0-indexed positions in the original array. 2. In the query method, retrieve the list of indices for the queried value. 3. Perform a binary search (lower bound) on this list to find the first index that is greater than or equal to `left`. 4. Perform another binary search (upper bound) on this list to find the last index that is less than or equal to `right`. 5. The frequency is the count of elements between these two found indices (inclusive). If either bound is not found, or if the lower bound index is greater than the upper bound index, the frequency is zero.
 * Dry Run:
 * RangeFreqQuery([12, 33, 4, 12, 33, 12])
 *
 * Constructor:
 * `valueToIndicesMap` will be:
 *   `12: [0, 3, 5]`
 *   `33: [1, 4]`
 *   `4: [2]`
 *
 * query(1, 4, 12):
 * `left = 1`, `right = 4`, `value = 12`
 * `targetValueOccurrences = [0, 3, 5]`
 *
 * First Binary Search (find first index `>= 1` in `targetValueOccurrences`):
 *   `searchOneLow = 0`, `searchOneHigh = 2`, `foundFirstIndex = -1`
 *   1. `searchOneMid = 1`. `currentValuePosition = targetValueOccurrences[1] = 3`. `3 >= 1` is true. `foundFirstIndex = 1`. `searchOneHigh = 0`.
 *   2. `searchOneLow = 0`, `searchOneHigh = 0`. `searchOneMid = 0`. `currentValuePosition = targetValueOccurrences[0] = 0`. `0 >= 1` is false. `searchOneLow = 1`.
 *   3. `searchOneLow = 1`, `searchOneHigh = 0`. Loop terminates.
 *   `foundFirstIndex` is `1`. (This refers to the index `1` within `targetValueOccurrences`, which stores the original array index `3`).
 *
 * Second Binary Search (find last index `<= 4` in `targetValueOccurrences`):
 *   `searchTwoLow = 0`, `searchTwoHigh = 2`, `foundLastIndex = -1`
 *   1. `searchTwoMid = 1`. `compareValuePosition = targetValueOccurrences[1] = 3`. `3 <= 4` is true. `foundLastIndex = 1`. `searchTwoLow = 2`.
 *   2. `searchTwoLow = 2`, `searchTwoHigh = 2`. `searchTwoMid = 2`. `compareValuePosition = targetValueOccurrences[2] = 5`. `5 <= 4` is false. `searchTwoHigh = 1`.
 *   3. `searchTwoLow = 2`, `searchTwoHigh = 1`. Loop terminates.
 *   `foundLastIndex` is `1`. (This refers to the index `1` within `targetValueOccurrences`, which stores the original array index `3`).
 *
 * Final Result Calculation:
 *   `foundFirstIndex` is `1`, `foundLastIndex` is `1`.
 *   Since neither is -1, result is `foundLastIndex - foundFirstIndex + 1 = 1 - 1 + 1 = 1`.
 *   The value 12 appears once (`arr[3]`) in `arr[1...4]`.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var RangeFreqQuery = function (arr) {
    this.valueToIndicesMap = new Map();

    let currentIndex = 0;
    let totalLength = arr.length;
    while (currentIndex < totalLength) {
        let currentValue = arr[currentIndex];
        if (!this.valueToIndicesMap.has(currentValue)) {
            this.valueToIndicesMap.set(currentValue, []);
        }
        let valueIndicesList = this.valueToIndicesMap.get(currentValue);
        valueIndicesList.push(currentIndex);
        currentIndex++;
    }
};

RangeFreqQuery.prototype.query = function (left, right, value) {
    if (!this.valueToIndicesMap.has(value)) {
        return 0;
    }

    const targetValueOccurrences = this.valueToIndicesMap.get(value);
    const occurrenceCount = targetValueOccurrences.length;

    let searchOneLow = 0;
    let searchOneHigh = occurrenceCount - 1;
    let foundFirstIndex = -1;

    while (searchOneLow <= searchOneHigh) {
        let searchOneMid = Math.floor((searchOneLow + searchOneHigh) / 2);
        let currentValuePosition = targetValueOccurrences[searchOneMid];
        if (currentValuePosition >= left) {
            foundFirstIndex = searchOneMid;
            searchOneHigh = searchOneMid - 1;
        } else {
            searchOneLow = searchOneMid + 1;
        }
    }

    let searchTwoLow = 0;
    let searchTwoHigh = occurrenceCount - 1;
    let foundLastIndex = -1;

    while (searchTwoLow <= searchTwoHigh) {
        let searchTwoMid = Math.floor((searchTwoLow + searchTwoHigh) / 2);
        let compareValuePosition = targetValueOccurrences[searchTwoMid];
        if (compareValuePosition <= right) {
            foundLastIndex = searchTwoMid;
            searchTwoLow = searchTwoMid + 1;
        } else {
            searchTwoHigh = searchTwoMid - 1;
        }
    }

    if (foundFirstIndex === -1 || foundLastIndex === -1) {
        return 0;
    }

    let resultFrequency = foundLastIndex - foundFirstIndex + 1;
    return resultFrequency;
};