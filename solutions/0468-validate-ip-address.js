/**
 * Validate Ip Address
 * Time Complexity: O(L)
 * Space Complexity: O(L)
*/
var validIPAddress = function (queryIP) {
    const checkIPv4 = (ipv4Candidate) => {
        const partsDelimiter = '.';
        const ipv4Parts = ipv4Candidate.split(partsDelimiter);
        const segmentCount = ipv4Parts.length;

        if (segmentCount !== 4) {
            return false;
        }

        for (let idxOne = 0; idxOne < segmentCount; idxOne++) {
            const currentPart = ipv4Parts[idxOne];
            const partLength = currentPart.length;

            if (partLength === 0 || partLength > 3) {
                return false;
            }

            if (partLength > 1 && currentPart[0] === '0') {
                return false;
            }

            let partNumericValue = 0;
            const zeroCode = '0'.charCodeAt(0);
            const nineCode = '9'.charCodeAt(0);

            for (let charIndex = 0; charIndex < partLength; charIndex++) {
                const segmentChar = currentPart[charIndex];
                const charCode = segmentChar.charCodeAt(0);

                if (charCode < zeroCode || charCode > nineCode) {
                    return false;
                }
                partNumericValue = partNumericValue * 10 + (charCode - zeroCode);
            }

            if (partNumericValue < 0 || partNumericValue > 255) {
                return false;
            }
        }

        return true;
    };

    const checkIPv6 = (ipv6Candidate) => {
        const segmentDelimiter = ':';
        const ipv6Segments = ipv6Candidate.split(segmentDelimiter);
        const componentCount = ipv6Segments.length;

        if (componentCount !== 8) {
            return false;
        }

        const zeroAscii = '0'.charCodeAt(0);
        const nineAscii = '9'.charCodeAt(0);
        const aLowerAscii = 'a'.charCodeAt(0);
        const fLowerAscii = 'f'.charCodeAt(0);
        const aUpperAscii = 'A'.charCodeAt(0);
        const fUpperAscii = 'F'.charCodeAt(0);

        for (let idxTwo = 0; idxTwo < componentCount; idxTwo++) {
            const currentSegment = ipv6Segments[idxTwo];
            const segmentCharLength = currentSegment.length;

            if (segmentCharLength === 0 || segmentCharLength > 4) {
                return false;
            }

            for (let segCharIndex = 0; segCharIndex < segmentCharLength; segCharIndex++) {
                const hexChar = currentSegment[segCharIndex];
                const hexCharCode = hexChar.charCodeAt(0);

                const isDigit = hexCharCode >= zeroAscii && hexCharCode <= nineAscii;
                const isLowerHex = hexCharCode >= aLowerAscii && hexCharCode <= fLowerAscii;
                const isUpperHex = hexCharCode >= aUpperAscii && hexCharCode <= fUpperAscii;

                if (!isDigit && !isLowerHex && !isUpperHex) {
                    return false;
                }
            }
        }

        return true;
    };

    const dotPresence = queryIP.includes('.');
    const colonPresence = queryIP.includes(':');

    if (dotPresence && !colonPresence) {
        const resultIPv4 = checkIPv4(queryIP);
        if (resultIPv4) {
            return "IPv4";
        }
    } else if (colonPresence && !dotPresence) {
        const resultIPv6 = checkIPv6(queryIP);
        if (resultIPv6) {
            return "IPv6";
        }
    }

    return "Neither";
};