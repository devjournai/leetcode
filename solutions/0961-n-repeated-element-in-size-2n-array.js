/**
 * N-Repeated Element in Size 2N Array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var repeatedNTimes = function(nums) {
    let indexIterator = 0;

    while (indexIterator < nums.length) {
        let firstComparedElement = nums[indexIterator];

        if (indexIterator + 1 < nums.length) {
            let secondComparedElement = nums[indexIterator + 1];
            if (firstComparedElement === secondComparedElement) {
                return firstComparedElement;
            }
        }
        
        if (indexIterator + 2 < nums.length) {
            let thirdComparedElement = nums[indexIterator + 2];
            if (firstComparedElement === thirdComparedElement) {
                return firstComparedElement;
            }
        }
        
        if (indexIterator + 3 < nums.length) {
            let fourthComparedElement = nums[indexIterator + 3];
            if (firstComparedElement === fourthComparedElement) {
                return firstComparedElement;
            }
        }
        
        indexIterator = indexIterator + 1;
    }
    return -1; 
};