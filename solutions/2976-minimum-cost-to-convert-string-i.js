/**
 * Minimum Cost to Convert String I
 * Time Complexity: O(N + A^3)
 * Space Complexity: O(A^2)
 */
var minimumCost = function (source, target, original, changed, cost) {
    const alphabetSize = 26;
    const charMap = new Array(alphabetSize).fill().map(() => new Array(alphabetSize).fill(Infinity));

    for (let currentCharIndex = 0; currentCharIndex < alphabetSize; currentCharIndex++) {
        charMap[currentCharIndex][currentCharIndex] = 0;
    }

    for (let transformationIndex = 0; transformationIndex < original.length; transformationIndex++) {
        const originChar = original[transformationIndex].charCodeAt(0) - 97;
        const destChar = changed[transformationIndex].charCodeAt(0) - 97;
        const currentChangeCost = cost[transformationIndex];
        charMap[originChar][destChar] = Math.min(charMap[originChar][destChar], currentChangeCost);
    }

    for (let middleChar = 0; middleChar < alphabetSize; middleChar++) {
        for (let startChar = 0; startChar < alphabetSize; startChar++) {
            for (let endChar = 0; endChar < alphabetSize; endChar++) {
                if (charMap[startChar][middleChar] !== Infinity && charMap[middleChar][endChar] !== Infinity) {
                    charMap[startChar][endChar] = Math.min(
                        charMap[startChar][endChar],
                        charMap[startChar][middleChar] + charMap[middleChar][endChar]
                    );
                }
            }
        }
    }

    let accumulatedCost = 0;
    for (let stringPosition = 0; stringPosition < source.length; stringPosition++) {
        if (source[stringPosition] !== target[stringPosition]) {
            const sourceCharAscii = source[stringPosition].charCodeAt(0) - 97;
            const targetCharAscii = target[stringPosition].charCodeAt(0) - 97;

            const specificConversionCost = charMap[sourceCharAscii][targetCharAscii];
            if (specificConversionCost === Infinity) {
                return -1;
            }
            accumulatedCost += specificConversionCost;
        }
    }

    return accumulatedCost;
};