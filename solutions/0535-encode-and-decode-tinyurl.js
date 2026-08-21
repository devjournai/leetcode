/**
 * Encode And Decode Tinyurl
 * Intuition: Map long URLs to random 6-character codes under `http://tinyurl.com/`. Bidirectional maps keep encode/decode O(1) and reuse an existing short URL for the same long URL.
 * Approach: 1. `encode` returns the stored short link if present. 2. Else generate a random identifier until unused, store both map directions, return the short URL. 3. `decode` looks up `shortToLongMapping`.
 * Dry Run: encode("https://leetcode.com/problems/design-tinyurl").
 *   - New random code e.g. `abc123` → `http://tinyurl.com/abc123`. decode of that string returns the original long URL.
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
class Solution {
  constructor() {
    this.shortToLongMapping = new Map();
    this.longToShortMapping = new Map();
    this.baseDomain = "http://tinyurl.com/";
    this.urlIdentifierLength = 6;
    this.characterSet =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  }

  generateRandomIdentifier() {
    let currentIdentifier = "";
    for (let idx = 0; idx < this.urlIdentifierLength; idx++) {
      const randomIndex = Math.floor(Math.random() * this.characterSet.length);
      currentIdentifier += this.characterSet[randomIndex];
    }
    return currentIdentifier;
  }

  encode(originalLink) {
    if (this.longToShortMapping.has(originalLink)) {
      return this.longToShortMapping.get(originalLink);
    }

    let newShortenedLink;
    let generatedIdentifier;
    do {
      generatedIdentifier = this.generateRandomIdentifier();
      newShortenedLink = this.baseDomain + generatedIdentifier;
    } while (this.shortToLongMapping.has(newShortenedLink));

    this.shortToLongMapping.set(newShortenedLink, originalLink);
    this.longToShortMapping.set(originalLink, newShortenedLink);

    return newShortenedLink;
  }

  decode(shortenedLink) {
    return this.shortToLongMapping.get(shortenedLink);
  }
}
