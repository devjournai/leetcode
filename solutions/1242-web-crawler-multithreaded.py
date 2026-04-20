from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse


class Solution:
    def crawl(self, startUrl: str, htmlParser) -> list[str]:
        visited = set([startUrl])
        base = urlparse(startUrl).netloc

        def dfs(url):
            for nxt in htmlParser.getUrls(url):
                if urlparse(nxt).netloc == base and nxt not in visited:
                    visited.add(nxt)
                    dfs(nxt)

        dfs(startUrl)
        return list(visited)