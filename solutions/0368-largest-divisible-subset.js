/**
 * Largest Divisible Subset
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var largestDivisibleSubset = function (nums) {
    if (nums.length === 0) {
        return [];
    }

    nums.sort((firstNum, secondNum) => firstNum - secondNum);

    const dpStates = new Array(nums.length).fill(null).map(() => ({
        subsetLength: 1,
        previousElementIndex: -1
    }));

    let overallMaxLength = 1;
    let indexOfMaxSubsetEnd = 0;

    for (let currentNumberIndex = 0; currentNumberIndex < nums.length; currentNumberIndex++) {
        for (let previousNumberIndex = 0; previousNumberIndex < currentNumberIndex; previousNumberIndex++) {
            if (nums[currentNumberIndex] % nums[previousNumberIndex] === 0) {
                let candidateLength = dpStates[previousNumberIndex].subsetLength + 1;

                if (candidateLength > dpStates[currentNumberIndex].subsetLength) {
                    dpStates[currentNumberIndex].subsetLength = candidateLength;
                    dpStates[currentNumberIndex].previousElementIndex = previousNumberIndex;
                }
            }
        }

        if (dpStates[currentNumberIndex].subsetLength > overallMaxLength) {
            overallMaxLength = dpStates[currentNumberIndex].subsetLength;
            indexOfMaxSubsetEnd = currentNumberIndex;
        }
    }

    const finalSubset = [];
    let currentIndexToTrace = indexOfMaxSubsetEnd;

    while (currentIndexToTrace !== -1) {
        finalSubset.unshift(nums[currentIndexToTrace]);
        currentIndexToTrace = dpStates[currentIndexToTrace].previousElementIndex;
    }

    return finalSubset;
};