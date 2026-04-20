/**
 * String Compression
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var compress = function (chars) {
    let writeCurrentIndex = 0;
    let scanCurrentIndex = 0;
    const originalLength = chars.length;

    while (scanCurrentIndex < originalLength) {
        const charUnderExamination = chars[scanCurrentIndex];
        let groupFirstIndex = scanCurrentIndex;

        while (scanCurrentIndex < originalLength && chars[scanCurrentIndex] === charUnderExamination) {
            scanCurrentIndex++;
        }

        let currentGroupCounter = scanCurrentIndex - groupFirstIndex;

        chars[writeCurrentIndex] = charUnderExamination;
        writeCurrentIndex++;

        if (currentGroupCounter > 1) {
            const numericString = String(currentGroupCounter);
            let digitCharIndex = 0;
            while (digitCharIndex < numericString.length) {
                chars[writeCurrentIndex] = numericString[digitCharIndex];
                writeCurrentIndex++;
                digitCharIndex++;
            }
        }
    }

    return writeCurrentIndex;
};