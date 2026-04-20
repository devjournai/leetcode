/**
 * License Key Formatting
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var licenseKeyFormatting = function (s, k) {
    let alphanumericString = s.replace(/-/g, '').toUpperCase();
    let reformattedParts = [];
    let charactersInCurrentSegment = 0;

    for (let characterIndex = alphanumericString.length - 1; characterIndex >= 0; characterIndex--) {
        reformattedParts.push(alphanumericString[characterIndex]);
        charactersInCurrentSegment++;

        if (charactersInCurrentSegment === k && characterIndex > 0) {
            reformattedParts.push('-');
            charactersInCurrentSegment = 0;
        }
    }

    return reformattedParts.reverse().join('');
};