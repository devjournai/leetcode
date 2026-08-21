/**
 * Design Authentication Manager
 * Intuition: Store each token's expiry as currentTime + timeToLive. Renew only if expiry is still in the future; counting can drop already-expired ids.
 * Approach: 1. Constructor keeps `lifetimeSeconds` and `tokenRegistry`. 2. `generate` sets expiry to currentTime + TTL. 3. `renew` refreshes only when stored expiry > currentTime. 4. `countUnexpiredTokens` counts (and deletes) entries with expiry > currentTime.
 * Dry Run: TTL=5; generate("aaa",1); count at t=4 → 1; renew("aaa",4); count at t=7 → 1; count at t=10 → 0.
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
