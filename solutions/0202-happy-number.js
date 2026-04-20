/**
 * Happy Number
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
*/
var isHappy = function (n) {
    let firstPointer = n;
    let secondPointer = calculateSumOfSquares(n);

    while (secondPointer !== 1 && firstPointer !== secondPointer) {
        firstPointer = calculateSumOfSquares(firstPointer);
        secondPointer = calculateSumOfSquares(calculateSumOfSquares(secondPointer));
    }

    return secondPointer === 1;
};

const calculateSumOfSquares = (currentNumber) => {
    let sumResult = 0;
    let temporaryNumber = currentNumber;
    while (temporaryNumber > 0) {
        let digitExtracted = temporaryNumber % 10;
        sumResult += digitExtracted * digitExtracted;
        temporaryNumber = Math.floor(temporaryNumber / 10);
    }
    return sumResult;
};