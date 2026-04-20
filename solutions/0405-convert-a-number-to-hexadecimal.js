/**
 * Convert A Number To Hexadecimal
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var toHex = function (num) {
    if (num === 0) {
        return "0";
    }

    const hexadecimalSymbols = "0123456789abcdef";
    let builtHexadecimal = "";
    let currentNumericalValue = num;

    for (let iterationCount = 0; iterationCount < 8; iterationCount++) {
        const currentQuad = currentNumericalValue & 0xF;
        builtHexadecimal = hexadecimalSymbols[currentQuad] + builtHexadecimal;
        currentNumericalValue >>>= 4;

        if (currentNumericalValue === 0) {
            break;
        }
    }

    return builtHexadecimal;
};