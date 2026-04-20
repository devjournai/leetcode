/**
 * Design Authentication Manager
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var AuthenticationManager = function (timeToLive) {
  this.lifetimeSeconds = timeToLive;
  this.tokenRegistry = new Map();
};

AuthenticationManager.prototype.generate = function (tokenId, currentTime) {
  const newExpirationMoment = currentTime + this.lifetimeSeconds;
  this.tokenRegistry.set(tokenId, newExpirationMoment);
};

AuthenticationManager.prototype.renew = function (tokenId, currentTime) {
  if (this.tokenRegistry.has(tokenId)) {
    const storedExpiryTime = this.tokenRegistry.get(tokenId);
    if (storedExpiryTime > currentTime) {
      const refreshedExpiration = currentTime + this.lifetimeSeconds;
      this.tokenRegistry.set(tokenId, refreshedExpiration);
    }
  }
};

AuthenticationManager.prototype.countUnexpiredTokens = function (currentTime) {
  let activeTokensCount = 0;
  for (const [tokenIdentifier, expirationTimestamp] of this.tokenRegistry) {
    if (expirationTimestamp > currentTime) {
      activeTokensCount++;
    } else {
      this.tokenRegistry.delete(tokenIdentifier);
    }
  }
  return activeTokensCount;
};
