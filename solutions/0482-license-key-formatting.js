/**
 * License Key Formatting
 * Intuition: Dashes do not count. Uppercase the remaining characters and regroup from the right into chunks of size k, with the first group allowed to be shorter.
 * Approach: 1. Strip `-` and uppercase. 2. Walk that string from the end, pushing chars onto `reformattedParts`; after every k characters (if more remain to the left) push a `-`. 3. Reverse the parts and join.
 * Dry Run: s = "5F3Z-2e-9-w", k = 4.
 *   - Alphanumeric "5F3Z2E9W". From the right: W,9,E,2 then `-`, then Z,3,F,5. Reverse join → "5F3Z-2E9W".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var licenseKeyFormatting = function (s, k) {
  let alphanumericString = s.replace(/-/g, "").toUpperCase();
  let reformattedParts = [];
  let charactersInCurrentSegment = 0;

  for (
    let characterIndex = alphanumericString.length - 1;
    characterIndex >= 0;
    characterIndex--
  ) {
    reformattedParts.push(alphanumericString[characterIndex]);
    charactersInCurrentSegment++;

    if (charactersInCurrentSegment === k && characterIndex > 0) {
      reformattedParts.push("-");
      charactersInCurrentSegment = 0;
    }
  }

  return reformattedParts.reverse().join("");
};
