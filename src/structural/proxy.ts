interface Internet {
  connectTo(host: string): void;
}

class RealInternet implements Internet {
  connectTo(host: string): void {
    console.log("Opened connection to " + host);
  }
}

class ProxyInternet implements Internet {
  private static readonly bannedSites: string[] = [];
  private readonly internet = new RealInternet();

  static {
    this.bannedSites.push("banned.com");
  }

  connectTo(host: string): void {
    if (
      ProxyInternet.bannedSites.find((site) => {
        return site === host;
      })
    ) {
      console.log("Access Denied!", host);
      return;
    }
    this.internet.connectTo(host);
  }
}

function connect(): void {
  console.log("connect():");
  const internet = new ProxyInternet();
  internet.connectTo("google.com");
  internet.connectTo("banned.com");
  console.log("---");
}

connect();

class Video {
  constructor(protected name: string) {}
}

interface VideoDownloader {
  getVideo(videoName: string): Video | undefined;
}

class RealVideoDownloader implements VideoDownloader {
  getVideo(videoName: string): Video {
    console.log("RealVideoDownloader:");
    console.log("Connecting to https://www.youtube.com/");
    console.log("Downloading Video");
    console.log("Retrieving Video Metadata");
    console.log("---");
    return new Video(videoName);
  }
}

function downloadVideos(): void {
  console.log("downloadVideos():");
  const videoDownloader = new RealVideoDownloader();
  videoDownloader.getVideo("geekific");
  videoDownloader.getVideo("geekific");
  videoDownloader.getVideo("likeNsub");
  videoDownloader.getVideo("likeNsub");
  videoDownloader.getVideo("geekific");
  console.log("---");
}

downloadVideos();

class ProxyVideoDownloader implements VideoDownloader {
  private readonly videoCache = new Map<string, Video>();
  private readonly downloader = new RealVideoDownloader();

  getVideo(videoName: string): Video | undefined {
    console.log("ProxyVideoDownloader:");
    if (!this.videoCache.has(videoName)) {
      this.videoCache.set(videoName, this.downloader.getVideo(videoName));
    } else {
      console.log("cached video");
      console.log("---");
    }
    return this.videoCache.get(videoName);
  }
}

function downloadVideosProxy(): void {
  console.log("downloadVideosProxy():");
  const videoDownloader = new ProxyVideoDownloader();
  videoDownloader.getVideo("geekific");
  videoDownloader.getVideo("geekific");
  videoDownloader.getVideo("likeNsub");
  videoDownloader.getVideo("likeNsub");
  videoDownloader.getVideo("geekific");
  console.log("---");
}

downloadVideosProxy();
