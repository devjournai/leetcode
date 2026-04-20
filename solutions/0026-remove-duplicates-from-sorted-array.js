/**
 * Remove Duplicates From Sorted Array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var removeDuplicates = function (nums) {
    if (nums.length === 0) {
        return 0;
    }

    let writerIndex = 0;
    let readerIndex = 1;

    while (readerIndex < nums.length) {
        if (nums[readerIndex] !== nums[writerIndex]) {
            writerIndex++;
            nums[writerIndex] = nums[readerIndex];
        }
        readerIndex++;
    }

    return writerIndex + 1;
};