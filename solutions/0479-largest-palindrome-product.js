/**
 * Largest Palindrome Product
 * Time Complexity: O(10^n * n)
 * Space Complexity: O(n)
*/
var largestPalindrome = function (n) {
    if (n === 1) {
        return 9;
    }

    const largestNdigit = 10 ** n - 1;
    const smallestNdigit = 10 ** (n - 1);
    const powerOfTenN = BigInt(10 ** n);

    for (let currentOffsetSum = 1; currentOffsetSum <= largestNdigit - smallestNdigit + 1; currentOffsetSum++) {
        const potentialLeftHalf = largestNdigit - currentOffsetSum + 1;

        const stringRepresentation = String(potentialLeftHalf);
        const reversedRepresentation = stringRepresentation.split('').reverse().join('');
        const potentialRightHalfReversed = BigInt(reversedRepresentation);

        const sumOfSquareCheck = BigInt(currentOffsetSum) * BigInt(currentOffsetSum);
        const fourTimesProduct = 4n * potentialRightHalfReversed;
        const discriminantValue = sumOfSquareCheck - fourTimesProduct;

        if (discriminantValue < 0n) {
            continue;
        }

        const sqrtRootCandidate = BigInt(Math.floor(Math.sqrt(Number(discriminantValue))));

        const rootCheckOne = sqrtRootCandidate * sqrtRootCandidate;
        const rootCheckTwo = (sqrtRootCandidate + 1n) * (sqrtRootCandidate + 1n);

        if (rootCheckOne !== discriminantValue && rootCheckTwo !== discriminantValue) {
            continue;
        }

        const actualLeftOffset = (BigInt(currentOffsetSum) + sqrtRootCandidate) / 2n;
        const actualRightOffset = (BigInt(currentOffsetSum) - sqrtRootCandidate) / 2n;

        const factorOne = powerOfTenN - actualLeftOffset;
        const factorTwo = powerOfTenN - actualRightOffset;

        if (factorOne >= BigInt(smallestNdigit) && factorTwo >= BigInt(smallestNdigit) &&
            factorOne <= BigInt(largestNdigit) && factorTwo <= BigInt(largestNdigit)) {

            const constructedPalindrome = BigInt(potentialLeftHalf) * powerOfTenN + potentialRightHalfReversed;
            return Number(constructedPalindrome % 1337n);
        }
    }
    return -1;
};