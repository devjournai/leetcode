/**
 * Total Hamming Distance
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var totalHammingDistance = function (nums) {
    let sumOfAllDistances = 0;
    const arrayLength = nums.length;

    for (let bitPosition = 0; bitPosition < 32; bitPosition++) {
        let countOfOnes = 0;

        nums.forEach(function (currentNum) {
            if (((currentNum >> bitPosition) & 1) === 1) {
                countOfOnes++;
            }
        });

        const countOfZeros = arrayLength - countOfOnes;
        sumOfAllDistances += countOfOnes * countOfZeros;
    }

    return sumOfAllDistances;
};