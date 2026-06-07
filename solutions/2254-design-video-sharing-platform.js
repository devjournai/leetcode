/**
 * Design Video Sharing Platform
 * Intuition: Manage videos by ID, allowing upload, removal, and various statistics tracking. Efficiently reuse video IDs to maintain a compact ID space.
 * Approach:
 * 1. Use a JavaScript `Map` (`videoRecords`) to store video objects (which include content, views, likes, and dislikes) keyed by their unique integer videoId. This provides O(1) average time complexity for accessing video data by ID.
 * 2. Implement a min-heap (`reusableVideoIdHeap`) using a JavaScript array to store deleted video IDs that are available for reuse. This allows efficient retrieval of the smallest available ID for new uploads and efficient insertion of deleted IDs back into the pool.
 * 3. Maintain a counter (`nextAvailableVideoId`) to generate new, strictly increasing video IDs when the `reusableVideoIdHeap` is empty.
 * 4. Implement core min-heap operations (`_heapifyUp`, `_heapifyDown`, `heapInsertId`, `heapExtractSmallestId`) as methods within the `VideoSharingPlatform` class prototype. `_heapifyUp` ensures the heap property is maintained when a new element is added, while `_heapifyDown` maintains it after the smallest element is removed. `heapInsertId` and `heapExtractSmallestId` wrap these heapify calls.
 * 5. The `upload` method first checks the `reusableVideoIdHeap` for an available ID. If found, it extracts the smallest ID; otherwise, it uses `nextAvailableVideoId` and increments it. The video content and initial statistics are then stored in `videoRecords`.
 * 6. The `remove` method deletes the video's data from `videoRecords` and adds its ID to the `reusableVideoIdHeap`.
 * 7. The `watch` method retrieves video data, increments the view count, and returns the requested substring of the video content, carefully handling `startMinute` and `endMinute` bounds.
 * 8. `like`, `dislike`, `getLikesAndDislikes`, and `getViews` methods access video data from `videoRecords` to update or retrieve the requested statistics, returning default error values (e.g., -1 or [-1]) if the videoId does not exist.
 * Dry Run:
 * Initial state:
 *   this.videoRecords = Map {}
 *   this.nextAvailableVideoId = 0
 *   this.reusableVideoIdHeap = []
 *
 * 1. upload("vid_A"):
 *    - reusableVideoIdHeap.length is 0.
 *    - selectedVideoId = this.nextAvailableVideoId (0).
 *    - this.nextAvailableVideoId becomes 1.
 *    - videoRecords.set(0, {videoContent: "vid_A", viewCount: 0, likeCount: 0, dislikeCount: 0}).
 *    - Returns 0.
 *
 * 2. upload("vid_B"):
 *    - reusableVideoIdHeap.length is 0.
 *    - selectedVideoId = this.nextAvailableVideoId (1).
 *    - this.nextAvailableVideoId becomes 2.
 *    - videoRecords.set(1, {videoContent: "vid_B", viewCount: 0, likeCount: 0, dislikeCount: 0}).
 *    - Returns 1.
 *
 * 3. remove(0):
 *    - videoRecords.has(0) is true.
 *    - videoRecords.delete(0).
 *    - heapInsertId(0): reusableVideoIdHeap.push(0) -> [0]. _heapifyUp(0) performs no change.
 *    - reusableVideoIdHeap is [0].
 *
 * 4. upload("vid_C"):
 *    - reusableVideoIdHeap.length is 1.
 *    - selectedVideoId = heapExtractSmallestId():
 *        - smallestVideoId = 0.
 *        - reusableVideoIdHeap becomes [].
 *        - Returns 0.
 *    - videoRecords.set(0, {videoContent: "vid_C", viewCount: 0, likeCount: 0, dislikeCount: 0}).
 *    - Returns 0.
 *
 * 5. watch(1, 0, 3): (Assume "vid_B" length is 5)
 *    - videoRecords.has(1) is true.
 *    - currentVideoData (for videoId 1) viewCount becomes 1.
 *    - videoLength = 5. actualEndingMinute = Math.min(3, 5-1) = Math.min(3, 4) = 3.
 *    - Returns "vid_B".substring(0, 3+1) -> "vid_".
 *
 * 6. like(1):
 *    - videoRecords.has(1) is true.
 *    - currentVideoData (for videoId 1) likeCount becomes 1.
 *
 * 7. getLikesAndDislikes(1):
 *    - videoRecords.has(1) is true.
 *    - Returns [1, 0].
 *
 * 8. getViews(0):
 *    - videoRecords.has(0) is true.
 *    - Returns 0.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(N * (C + S))
 */
var VideoSharingPlatform = function () {
  this.videoRecords = new Map();
  this.nextAvailableVideoId = 0;
  this.reusableVideoIdHeap = [];
};

VideoSharingPlatform.prototype._heapifyUp = function (startIndex) {
  let currentIndex = startIndex;
  while (currentIndex > 0) {
    let parentIndex = Math.floor((currentIndex - 1) / 2);
    if (
      this.reusableVideoIdHeap[currentIndex] <
      this.reusableVideoIdHeap[parentIndex]
    ) {
      let temporaryValue = this.reusableVideoIdHeap[currentIndex];
      this.reusableVideoIdHeap[currentIndex] =
        this.reusableVideoIdHeap[parentIndex];
      this.reusableVideoIdHeap[parentIndex] = temporaryValue;
      currentIndex = parentIndex;
    } else {
      break;
    }
  }
};

VideoSharingPlatform.prototype._heapifyDown = function (initialIndex) {
  let traversalIndex = initialIndex;
  let heapSize = this.reusableVideoIdHeap.length;
  while (true) {
    let leftChildIndex = 2 * traversalIndex + 1;
    let rightChildIndex = 2 * traversalIndex + 2;
    let smallestElementIndex = traversalIndex;

    if (
      leftChildIndex < heapSize &&
      this.reusableVideoIdHeap[leftChildIndex] <
        this.reusableVideoIdHeap[smallestElementIndex]
    ) {
      smallestElementIndex = leftChildIndex;
    }

    if (
      rightChildIndex < heapSize &&
      this.reusableVideoIdHeap[rightChildIndex] <
        this.reusableVideoIdHeap[smallestElementIndex]
    ) {
      smallestElementIndex = rightChildIndex;
    }

    if (smallestElementIndex !== traversalIndex) {
      let holdingValue = this.reusableVideoIdHeap[traversalIndex];
      this.reusableVideoIdHeap[traversalIndex] =
        this.reusableVideoIdHeap[smallestElementIndex];
      this.reusableVideoIdHeap[smallestElementIndex] = holdingValue;
      traversalIndex = smallestElementIndex;
    } else {
      break;
    }
  }
};

VideoSharingPlatform.prototype.heapInsertId = function (freshId) {
  this.reusableVideoIdHeap.push(freshId);
  this._heapifyUp(this.reusableVideoIdHeap.length - 1);
};

VideoSharingPlatform.prototype.heapExtractSmallestId = function () {
  if (this.reusableVideoIdHeap.length === 0) {
    return undefined;
  }
  if (this.reusableVideoIdHeap.length === 1) {
    return this.reusableVideoIdHeap.pop();
  }

  let smallestVideoId = this.reusableVideoIdHeap[0];
  this.reusableVideoIdHeap[0] = this.reusableVideoIdHeap.pop();
  this._heapifyDown(0);
  return smallestVideoId;
};

VideoSharingPlatform.prototype.upload = function (videoSegment) {
  let selectedVideoId;
  if (this.reusableVideoIdHeap.length > 0) {
    selectedVideoId = this.heapExtractSmallestId();
  } else {
    selectedVideoId = this.nextAvailableVideoId;
    this.nextAvailableVideoId++;
  }

  this.videoRecords.set(selectedVideoId, {
    videoContent: videoSegment,
    viewCount: 0,
    likeCount: 0,
    dislikeCount: 0,
  });

  return selectedVideoId;
};

VideoSharingPlatform.prototype.remove = function (videoIdentification) {
  if (this.videoRecords.has(videoIdentification)) {
    this.videoRecords.delete(videoIdentification);
    this.heapInsertId(videoIdentification);
  }
};

VideoSharingPlatform.prototype.watch = function (
  identificationOfVideo,
  beginningMinute,
  endingMinute,
) {
  if (!this.videoRecords.has(identificationOfVideo)) {
    return "-1";
  }

  const currentVideoData = this.videoRecords.get(identificationOfVideo);
  currentVideoData.viewCount++;

  const videoLength = currentVideoData.videoContent.length;
  const actualEndingMinute = Math.min(endingMinute, videoLength - 1);
  return currentVideoData.videoContent.substring(
    beginningMinute,
    actualEndingMinute + 1,
  );
};

VideoSharingPlatform.prototype.like = function (specificVideoId) {
  if (this.videoRecords.has(specificVideoId)) {
    this.videoRecords.get(specificVideoId).likeCount++;
  }
};

VideoSharingPlatform.prototype.dislike = function (targetVideoId) {
  if (this.videoRecords.has(targetVideoId)) {
    this.videoRecords.get(targetVideoId).dislikeCount++;
  }
};

VideoSharingPlatform.prototype.getLikesAndDislikes = function (queriedVideoId) {
  if (!this.videoRecords.has(queriedVideoId)) {
    return [-1];
  }

  const requestedVideoDetails = this.videoRecords.get(queriedVideoId);
  return [requestedVideoDetails.likeCount, requestedVideoDetails.dislikeCount];
};

VideoSharingPlatform.prototype.getViews = function (queryVideoIdentifier) {
  if (!this.videoRecords.has(queryVideoIdentifier)) {
    return -1;
  }

  return this.videoRecords.get(queryVideoIdentifier).viewCount;
};
