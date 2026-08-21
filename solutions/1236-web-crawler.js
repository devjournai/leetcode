/**
 * Web Crawler
 * Intuition: Stay on the start URL's hostname and BFS through htmlParser.getUrls, visiting each URL once.
 * Approach: 1. Hostname = startUrl.split('/')[2]. 2. Queue BFS; skip visited. 3. Enqueue neighbors with the same hostname. 4. Return the visit list.
 * Dry Run: start http://news.com/a, links to same host /b and other.com → collect only news.com URLs.
 * Time Complexity: O(N * L + M * L)
 * Space Complexity: O(N * L)
 */
var crawl = function (startUrl, htmlParser) {
  function extractHostname(inputUrl) {
    return inputUrl.split("/")[2];
  }

  const initialHostname = extractHostname(startUrl);
  const visitedUrlsTracker = new Set();
  const traversalQueue = [startUrl];
  const collectedUrls = [];

  while (traversalQueue.length > 0) {
    const currentProcessedUrl = traversalQueue.shift();

    if (visitedUrlsTracker.has(currentProcessedUrl)) {
      continue;
    }

    visitedUrlsTracker.add(currentProcessedUrl);
    collectedUrls.push(currentProcessedUrl);

    const obtainedLinks = htmlParser.getUrls(currentProcessedUrl);

    for (const discoveredLink of obtainedLinks) {
      if (!visitedUrlsTracker.has(discoveredLink)) {
        const discoveredLinkHostname = extractHostname(discoveredLink);
        if (discoveredLinkHostname === initialHostname) {
          traversalQueue.push(discoveredLink);
        }
      }
    }
  }

  return collectedUrls;
};
