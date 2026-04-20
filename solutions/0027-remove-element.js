/**
 * Remove Element
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var removeElement = function (nums, val) {
    let writePointer = 0;
    let iteratePointer = 0;
    let arrayLength = nums.length;

    while (iteratePointer < arrayLength) {
        if (nums[iteratePointer] !== val) {
            nums[writePointer] = nums[iteratePointer];
            writePointer++;
        }
        iteratePointer++;
    }

    return writePointer;
};