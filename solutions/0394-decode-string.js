/**
 * Decode String
 * Time Complexity: O(M)
 * Space Complexity: O(M + N)
 */
var decodeString = function (s) {
    const stringPointer = { value: 0 };

    const parseSegment = (inputStr, currentIdx) => {
        let currentBuild = "";
        let currentMultiplier = 0;

        while (currentIdx.value < inputStr.length) {
            const charUnit = inputStr[currentIdx.value];

            if (charUnit >= '0' && charUnit <= '9') {
                currentMultiplier = currentMultiplier * 10 + Number(charUnit);
            } else if (charUnit === '[') {
                currentIdx.value++;
                const nestedContent = parseSegment(inputStr, currentIdx);
                currentBuild += nestedContent.repeat(currentMultiplier);
                currentMultiplier = 0;
            } else if (charUnit === ']') {
                return currentBuild;
            } else {
                currentBuild += charUnit;
            }
            currentIdx.value++;
        }
        return currentBuild;
    };

    return parseSegment(s, stringPointer);
};