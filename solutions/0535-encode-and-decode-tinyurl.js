/**
 * Encode And Decode Tinyurl
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
