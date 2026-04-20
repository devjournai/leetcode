/**
 * Integer Break
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
*/
var integerBreak = function (n) {
    if (n <= 3) {
        return n - 1;
    }

    const maxProductValues = new Array(n + 1).fill(0);

    maxProductValues[2] = 1;
    maxProductValues[3] = 2;

    for (let currentNumber = 4; currentNumber <= n; currentNumber++) {
        let currentMaxAchieved = 0;
        for (let firstPartValue = 1; firstPartValue <= Math.floor(currentNumber / 2); firstPartValue++) {
            let secondPartValue = currentNumber - firstPartValue;

            let productOption1 = firstPartValue * secondPartValue;
            let productOption2 = firstPartValue * maxProductValues[secondPartValue];
            let productOption3 = maxProductValues[firstPartValue] * secondPartValue;
            let productOption4 = maxProductValues[firstPartValue] * maxProductValues[secondPartValue];

            currentMaxAchieved = Math.max(currentMaxAchieved, productOption1, productOption2, productOption3, productOption4);
        }
        maxProductValues[currentNumber] = currentMaxAchieved;
    }

    return maxProductValues[n];
};