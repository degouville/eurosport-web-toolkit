import Stopwatch from 'timer-stopwatch';

export default class AdobeHeartbeatAnalytics {
  constructor(heartbeatConfig, videoMetadata, programStartDateTime) {
    const { ADB } = window;
    const { MediaHeartbeat, MediaHeartbeatConfig, MediaHeartbeatDelegate } = ADB.va;

    const mediaConfig = this.generateMediaConfig(MediaHeartbeatConfig, heartbeatConfig, videoMetadata);
    const appMeasurement = window.s_c_il[1];
    this.mediaDelegate = new MediaHeartbeatDelegate();
    this.mediaHeartbeat = new MediaHeartbeat(this.mediaDelegate, mediaConfig, appMeasurement);
    this.mediaObject = this.generateMediaObject(MediaHeartbeat, videoMetadata);
    this.videoMetadata = videoMetadata;
    this.programStartDateTime = programStartDateTime;
    this.MediaHeartbeat = MediaHeartbeat;
    this.stopwatch = new Stopwatch();
  }

  generateMediaConfig = (MediaHeartbeatConfig, heartbeatConfig, videoMetadata) => {
    const mediaConfig = new MediaHeartbeatConfig();
    mediaConfig.trackingServer = heartbeatConfig.network;
    mediaConfig.playerName = heartbeatConfig.playerName;
    mediaConfig.channel = videoMetadata.contentchannel;
    mediaConfig.debugLogging = heartbeatConfig.debugLogging;
    mediaConfig.appVersion = heartbeatConfig.appVersion;
    mediaConfig.ssl = heartbeatConfig.ssl;
    return mediaConfig;
  };

  generateMediaObject = (MediaHeartbeat, videoMetadata) => {
    const standardVideoMetadata = {};
    standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.NETWORK] = videoMetadata.contentchannel;
    const mediaObject = MediaHeartbeat.createMediaObject(
      videoMetadata.title,
      videoMetadata.id,
      videoMetadata.duration,
      videoMetadata.streamtype
    );
    mediaObject.setValue(MediaHeartbeat.MediaObjectKey.StandardVideoMetadata, standardVideoMetadata);
    return mediaObject;
  };

  onReady = () => {
    const {
      videoMetadata: { customMetadata },
      mediaHeartbeat,
      mediaObject,
      mediaDelegate,
      programStartDateTime,
      stopwatch,
    } = this;

    const currentEpochTime = Math.round(Date.now() / 1000);
    const initialPlaybackTime = currentEpochTime - programStartDateTime;
    stopwatch.start();
    mediaDelegate.getCurrentPlaybackTime = this.calculateCurrentPlaybackTime(initialPlaybackTime, stopwatch);

    mediaHeartbeat && mediaHeartbeat.trackSessionStart(mediaObject, customMetadata);
  };

  calculateCurrentPlaybackTime = (initialPlaybackTime, stopwatch) => () => initialPlaybackTime + stopwatch.ms / 1000;

  onAdBreakStart = (name = 'preroll', position = 1) => {
    const { MediaHeartbeat, mediaHeartbeat } = this;

    const startTime = 0;
    const adBreakObject = MediaHeartbeat.createAdBreakObject(name, position, startTime);

    mediaHeartbeat && mediaHeartbeat.trackEvent(MediaHeartbeat.Event.AdBreakStart, adBreakObject);
  };

  onAdBreakComplete = () => {
    const { MediaHeartbeat, mediaHeartbeat, mediaDelegate, programStartDateTime, stopwatch } = this;

    mediaHeartbeat && mediaHeartbeat.trackEvent(MediaHeartbeat.Event.AdBreakComplete);
    stopwatch.start();
    const currentEpochTime = Math.round(Date.now() / 1000);
    const initialPlaybackTime = currentEpochTime - programStartDateTime;

    mediaDelegate.getCurrentPlaybackTime = this.calculateCurrentPlaybackTime(initialPlaybackTime, stopwatch);
  };

  onAdStart = ({ id, sequence, title, duration }) => {
    const { MediaHeartbeat, mediaHeartbeat, mediaDelegate } = this;

    mediaDelegate.getCurrentPlaybackTime = () => 0;
    const adObject = MediaHeartbeat.createAdObject(title, id, sequence, duration);
    const adCustomMetadata = {
      ad_campaign: 'N/A',
      ad_campaign_id: id,
      ad_brand: 'N/A',
    };

    mediaHeartbeat && mediaHeartbeat.trackEvent(MediaHeartbeat.Event.AdStart, adObject, adCustomMetadata);
  };

  onAdTime = ({ position }) => {
    const { mediaDelegate } = this;

    mediaDelegate.getCurrentPlaybackTime = () => Math.round(position);
  };

  onAdComplete = () => {
    const { MediaHeartbeat, mediaHeartbeat } = this;

    mediaHeartbeat && mediaHeartbeat.trackEvent(MediaHeartbeat.Event.AdComplete);
  };

  onPlay = () => {
    const { mediaHeartbeat, stopwatch } = this;

    stopwatch.start();
    mediaHeartbeat && mediaHeartbeat.trackPlay();
  };

  onPause = () => {
    const { mediaHeartbeat, stopwatch } = this;

    stopwatch.stop();
    mediaHeartbeat && mediaHeartbeat.trackPause();
  };

  onComplete = () => {
    const { mediaHeartbeat } = this;

    mediaHeartbeat && mediaHeartbeat.trackComplete();
  };

  onSessionEnd = () => {
    const { mediaHeartbeat } = this;

    mediaHeartbeat && mediaHeartbeat.trackSessionEnd();
  };
}
