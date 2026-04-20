/**
 * Encode String With Shortest Length
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^3)
 */
var encode = function (s) {
    const stringLength = s.length;
    const dpStore = Array.from({ length: stringLength }, () => new Array(stringLength).fill(''));

    for (let subLength = 1; subLength <= stringLength; subLength++) {
        for (let startIdx = 0; startIdx <= stringLength - subLength; startIdx++) {
            const endIdx = startIdx + subLength - 1;
            const currentSubstr = s.slice(startIdx, endIdx + 1);

            dpStore[startIdx][endIdx] = currentSubstr;

            for (let partitionIdx = startIdx; partitionIdx < endIdx; partitionIdx++) {
                const leftPart = dpStore[startIdx][partitionIdx];
                const rightPart = dpStore[partitionIdx + 1][endIdx];
                const combinedPart = leftPart + rightPart;

                if (combinedPart.length < dpStore[startIdx][endIdx].length) {
                    dpStore[startIdx][endIdx] = combinedPart;
                }
            }

            for (let subpatternLen = 1; subpatternLen < subLength; subpatternLen++) {
                if (subLength % subpatternLen === 0) {
                    const foundPattern = s.slice(startIdx, startIdx + subpatternLen);
                    const repeatCount = subLength / subpatternLen;

                    let isRepeatable = true;
                    for (let patternSegment = 1; patternSegment < repeatCount; patternSegment++) {
                        const nextSegmentStart = startIdx + patternSegment * subpatternLen;
                        const nextSegmentEnd = nextSegmentStart + subpatternLen;
                        if (s.slice(nextSegmentStart, nextSegmentEnd) !== foundPattern) {
                            isRepeatable = false;
                            break;
                        }
                    }

                    if (isRepeatable) {
                        const encodedVersion = `${repeatCount}[${dpStore[startIdx][startIdx + subpatternLen - 1]}]`;
                        if (encodedVersion.length < dpStore[startIdx][endIdx].length) {
                            dpStore[startIdx][endIdx] = encodedVersion;
                        }
                    }
                }
            }
        }
    }

    return dpStore[0][stringLength - 1];
};