/**
 * Design A File Sharing System
 * Time Complexity: O(M)
 * Space Complexity: O(M)
 */
var FileSharing = function (m) {
  this.chunkOwnerMapList = new Array(m + 1).fill().map(() => new Set());
  this.userChunkOwnershipMap = new Map();
  this.availableUserIdsSet = new Set();
  this.nextNewUserId = 1;
};

FileSharing.prototype.join = function (ownedChunks) {
  let newlyAssignedUserId;

  if (this.availableUserIdsSet.size > 0) {
    const sortedAvailableIdsArray = Array.from(this.availableUserIdsSet).sort(
      (a, b) => a - b,
    );
    newlyAssignedUserId = sortedAvailableIdsArray[0];
    this.availableUserIdsSet.delete(newlyAssignedUserId);
  } else {
    newlyAssignedUserId = this.nextNewUserId;
    this.nextNewUserId++;
  }

  const userOwnedChunkSet = new Set(ownedChunks);
  this.userChunkOwnershipMap.set(newlyAssignedUserId, userOwnedChunkSet);

  for (const currentChunkIdForJoin of ownedChunks) {
    this.chunkOwnerMapList[currentChunkIdForJoin].add(newlyAssignedUserId);
  }

  return newlyAssignedUserId;
};

FileSharing.prototype.leave = function (userID) {
  const chunksHeldByLeavingUser = this.userChunkOwnershipMap.get(userID);

  if (chunksHeldByLeavingUser) {
    for (const singleChunkIdForLeave of chunksHeldByLeavingUser) {
      this.chunkOwnerMapList[singleChunkIdForLeave].delete(userID);
    }
    this.userChunkOwnershipMap.delete(userID);
    this.availableUserIdsSet.add(userID);
  }
};

FileSharing.prototype.request = function (userID, chunkID) {
  const chunkOwnersSet = this.chunkOwnerMapList[chunkID];
  const sortedChunkOwners = Array.from(chunkOwnersSet).sort((a, b) => a - b);

  const isChunkAvailable = sortedChunkOwners.length > 0;
  if (isChunkAvailable) {
    this.userChunkOwnershipMap.get(userID).add(chunkID);
    this.chunkOwnerMapList[chunkID].add(userID);
  }

  return sortedChunkOwners;
};
