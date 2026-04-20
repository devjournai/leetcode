/**
 * 3sum Smaller
 * Time Complexity: O(N^2)
 * Space Complexity: O(log N)
*/
var threeSumSmaller = function (nums, target) {
    nums.sort((alpha, beta) => alpha - beta);

    const arrayLength = nums.length;
    let totalTripletsCount = 0;

    for (let firstElementIndex = 0; firstElementIndex < arrayLength - 2; firstElementIndex++) {
        let leftBoundary = firstElementIndex + 1;
        let rightBoundary = arrayLength - 1;

        while (leftBoundary < rightBoundary) {
            const currentSumOfThree = nums[firstElementIndex] + nums[leftBoundary] + nums[rightBoundary];

            if (currentSumOfThree < target) {
                totalTripletsCount += (rightBoundary - leftBoundary);
                leftBoundary++;
            } else {
                rightBoundary--;
            }
        }
    }

    return totalTripletsCount;
};