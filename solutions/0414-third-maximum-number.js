/**
 * Third Maximum Number
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var thirdMax = function (nums) {
    let largestDistinct = Number.NEGATIVE_INFINITY;
    let secondLargestDistinct = Number.NEGATIVE_INFINITY;
    let thirdLargestDistinct = Number.NEGATIVE_INFINITY;

    let loopIndex = 0;
    let numbersCount = nums.length;

    while (loopIndex < numbersCount) {
        let currentNumber = nums[loopIndex];

        if (currentNumber === largestDistinct || currentNumber === secondLargestDistinct || currentNumber === thirdLargestDistinct) {
            loopIndex++;
            continue;
        }

        if (currentNumber > largestDistinct) {
            thirdLargestDistinct = secondLargestDistinct;
            secondLargestDistinct = largestDistinct;
            largestDistinct = currentNumber;
        } else if (currentNumber > secondLargestDistinct) {
            thirdLargestDistinct = secondLargestDistinct;
            secondLargestDistinct = currentNumber;
        } else if (currentNumber > thirdLargestDistinct) {
            thirdLargestDistinct = currentNumber;
        }

        loopIndex++;
    }

    if (thirdLargestDistinct === Number.NEGATIVE_INFINITY) {
        return largestDistinct;
    } else {
        return thirdLargestDistinct;
    }
};