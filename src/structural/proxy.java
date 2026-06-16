public interface Internet {
    void connectTo(String host);
}

public class RealInternet implements Internet {
    @Override
    public void connectTo(String host) {
        System.out.println("Opened connection to " + host);
    }
}

public class ProxyInternet implements Internet {
    private static final List<String> bannedSites;
    private final Internet internet = new RealInternet();

    static {
        bannedSites = new ArrayList<>();
        bannedSites.add("banned.com");
    }

    @Override
    public void connectTo(String host) {
        if (bannedSites.contains(host)) {
            System.out.println("Access Denied!");
            return;
        }
        internet.connectTo(host);
    }
}

public static void main(String[] args) {
    Internet internet = new ProxyInternet();
    internet.connectTo("google.com");
    internet.connectTo("banned.com");
}

public static void main(final String[] arguments) {
    VideoDownloader videoDownloader = new RealVideoDownloader();
    videoDownloader.getVideo("geekific");
    videoDownloader.getVideo("geekific");
    videoDownloader.getVideo("likeNsub");
    videoDownloader.getVideo("likeNsub");
    videoDownloader.getVideo("geekific");
}

public interface VideoDownloader {
    Video getVideo(String videoName);
}

public class RealVideoDownloader implements VideoDownloader {
    @Override
    public Video getVideo(String videoName) {
        System.out.println("Connecting to https://www.youtube.com/");
        System.out.println("Downloading Video");
        System.out.println("Retrieving Video Metadata");
        return new Video(videoName);
    }
}

public class ProxyVideoDownloader implements VideoDownloader {
    private final Map<String, Video> videoCache = new HashMap<>();
    private final VideoDownloader downloader = new RealVideoDownloader();

    @Override
    public Video getVideo(String videoName) {
        if (!videoCache.containsKey(videoName)) {
            videoCache.put(videoName, downloader.getVideo(videoName));
        }
        return videoCache.get(videoName);
    }
}