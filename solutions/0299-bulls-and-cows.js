/**
 * Bulls And Cows
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var getHint = function (secret, guess) {
    let currentBulls = 0;
    let potentialCows = 0;

    const secretDigitsFrequency = new Array(10).fill(0);
    const guessDigitsFrequency = new Array(10).fill(0);

    const commonLength = secret.length;

    for (let currentIterationIndex = 0; currentIterationIndex < commonLength; currentIterationIndex++) {
        const secretCharacter = secret[currentIterationIndex];
        const guessCharacter = guess[currentIterationIndex];

        if (secretCharacter === guessCharacter) {
            currentBulls++;
        } else {
            secretDigitsFrequency[parseInt(secretCharacter)]++;
            guessDigitsFrequency[parseInt(guessCharacter)]++;
        }
    }

    for (let digitIndex = 0; digitIndex <= 9; digitIndex++) {
        potentialCows += Math.min(secretDigitsFrequency[digitIndex], guessDigitsFrequency[digitIndex]);
    }

    return `${currentBulls}A${potentialCows}B`;
};