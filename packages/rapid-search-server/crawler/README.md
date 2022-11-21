**startCrawler** (takes seed urls which are used if queue is empty) -> startScanWorkers -> startScanQueue -> **scanPage** (does page analysis):

- extractPageInformation()
- savePageInformation()
- extractPageLinks()
- addLinksToQueue()
- TBD: measureScoreA
- TBD: measureScoreB
