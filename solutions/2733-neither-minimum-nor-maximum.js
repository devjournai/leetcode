/**
    * Neither Minimum Nor Maximum
    * Intuition: If an array contains at least three distinct numbers, then the first three elements themselves must contain a number that is neither the smallest nor the largest among them. This number will also be neither the minimum nor the maximum of the entire array. If there are fewer than three elements, such a number cannot exist.
    * Approach: 1. Determine the length of the input array. If it is less than 3, return -1 as no such number can exist. 2. Otherwise, extract the first three elements from the array. 3. Create a new array containing these three elements. 4. Sort this new array of three elements in ascending order. 5. The element at the middle index (index 1) of the sorted triplet is guaranteed to be neither the minimum nor the maximum of the three, and thus serves as a valid solution for the problem. Return this element.
    * Dry Run: Input: nums = [3, 2, 1]
    * 1. `arrayLength` becomes 3.
    * 2. `arrayLength < 3` evaluates to false.
    * 3. `firstElement` is assigned 3 (nums[0]).
    * 4. `secondElement` is assigned 2 (nums[1]).
    * 5. `thirdElement` is assigned 1 (nums[2]).
    * 6. `initialValues` is created as `[3, 2, 1]`.
    * 7. `initialValues.sort((valA, valB) => valA - valB)` sorts `initialValues` in-place, making it `[1, 2, 3]`.
    * 8. `medianCandidate` is assigned `initialValues[1]`, which is 2.
    * 9. The function returns 2.
    * Time Complexity: O(1)
    * Space Complexity: O(1)
*/
var findNonMinOrMax = function(nums) {
    const arrayLength = nums.length;
    if (arrayLength < 3) {
        return -1;
    }

    const firstElement = nums[0];
    const secondElement = nums[1];
    const thirdElement = nums[2];

    const initialValues = [firstElement, secondElement, thirdElement];
    initialValues.sort((valA, valB) => valA - valB);

    const medianCandidate = initialValues[1];
    return medianCandidate;
};