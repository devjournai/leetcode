/**
 * Group Shifted Strings
 * Time Complexity: O(N * L)
 * Space Complexity: O(N * L)
*/
var groupStrings = function (inputStrings) {
    const classifiedGroups = new Map();

    const getShiftPattern = (processingString) => {
        const stringLengthValue = processingString.length;
        if (stringLengthValue === 1) {
            return 'lengthOne';
        }

        const computedDiffs = [];
        for (let charIterator = 1; charIterator < stringLengthValue; charIterator++) {
            const currentAsciiValue = processingString.charCodeAt(charIterator);
            const previousAsciiValue = processingString.charCodeAt(charIterator - 1);
            let diffRaw = currentAsciiValue - previousAsciiValue;
            const diffNormalized = (diffRaw + 26) % 26;
            computedDiffs.push(diffNormalized);
        }
        return computedDiffs.join(',');
    };

    for (const currentInputItem of inputStrings) {
        const stringPattern = getShiftPattern(currentInputItem);
        if (!classifiedGroups.has(stringPattern)) {
            classifiedGroups.set(stringPattern, []);
        }
        const existingGroupList = classifiedGroups.get(stringPattern);
        existingGroupList.push(currentInputItem);
    }

    const finalResultArray = Array.from(classifiedGroups.values());
    return finalResultArray;
};