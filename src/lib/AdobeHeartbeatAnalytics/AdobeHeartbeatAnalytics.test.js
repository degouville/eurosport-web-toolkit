import {
  dataLayer,
  mediaHeartbeatMockCreator,
  heartbeatConfig,
  requiredMetadata,
  programStartDateTime,
  customMetadata,
} from './AdobeHeartbeatAnalytics.mock';
import AdobeHeartbeatAnalytics from './AdobeHeartbeatAnalytics';

describe('lib/AdobeHeartbeatAnalytics', () => {
  const trackSessionStartSpy = jest.fn();
  const trackEventSpy = jest.fn();
  const trackPlaySpy = jest.fn();
  const trackPauseSpy = jest.fn();
  const trackCompleteSpy = jest.fn();
  const trackSessionEndSpy = jest.fn();
  const setValueSpy = jest.fn();

  let analytics;

  beforeAll(() => {
    window.s_c_il = [{}, {}];
    window.dataLayer = dataLayer;
    window.ADB = {
      va: {
        MediaHeartbeat: mediaHeartbeatMockCreator({
          trackSessionStartSpy,
          trackEventSpy,
          trackPlaySpy,
          trackPauseSpy,
          trackCompleteSpy,
          trackSessionEndSpy,
          setValueSpy,
        }),
        MediaHeartbeatConfig: jest.fn(),
        MediaHeartbeatDelegate: jest.fn(),
      },
    };

    // Given
    analytics = new AdobeHeartbeatAnalytics(heartbeatConfig, requiredMetadata, programStartDateTime);
  });

  describe('calculateCurrentPlaybackTime', () => {
    it('should return the initialPlaybackTime with the stopwatch time added on', () => {
      const initialPlaybackTime = 2000;
      const stopwatch = {
        ms: 1000,
      };

      // Then
      const expectedPlaybackTime = analytics.calculateCurrentPlaybackTime(initialPlaybackTime, stopwatch)();

      // Expect
      expect(expectedPlaybackTime).toEqual(2001);
    });
  });

  describe('onReady', () => {
    it('should call MHB trackSessionStart with correct params', () => {
      // Then
      analytics.onReady(customMetadata);

      // Expect
      expect(trackSessionStartSpy).toHaveBeenCalledWith({ setValue: setValueSpy }, customMetadata);
    });
  });

  describe('onAdBreakStart', () => {
    it('should call MHB trackEvent with correct params', () => {
      // Then
      analytics.onAdBreakStart();

      // Expect
      expect(trackEventSpy).toHaveBeenCalledWith('adBreakStart', 'createAdBreakObject');
    });
  });

  describe('onAdBreakComplete', () => {
    it('should call MHB trackEvent with correct params', () => {
      // Then
      analytics.onAdBreakComplete();

      // Expect
      expect(trackEventSpy).toHaveBeenCalledWith('adBreakComplete');
    });
  });

  describe('onAdStart', () => {
    it('should call MHB trackEvent with correct params', () => {
      // Given
      const id = 1;
      const adCustomMetadata = {
        ad_campaign: 'N/A',
        ad_campaign_id: id,
        ad_brand: 'N/A',
      };

      // Then
      analytics.onAdStart({ id });

      // Expect
      expect(trackEventSpy).toHaveBeenCalledWith('adStart', 'createAdObject', adCustomMetadata);
    });
  });

  describe('onAdComplete', () => {
    it('should call MHB trackEvent with correct params', () => {
      // Then
      analytics.onAdComplete();

      // Expect
      expect(trackEventSpy).toHaveBeenCalledWith('adComplete');
    });
  });

  describe('onPlay', () => {
    it('should call MHB trackPlay', () => {
      // Then
      analytics.onPlay();

      // Expect
      expect(trackPlaySpy).toHaveBeenCalled();
    });
  });

  describe('onPause', () => {
    it('should call MHB trackPause', () => {
      // Then
      analytics.onPause();

      // Expect
      expect(trackPauseSpy).toHaveBeenCalled();
    });
  });

  describe('onComplete', () => {
    it('should call MHB trackComplete', () => {
      // Then
      analytics.onComplete();

      // Expect
      expect(trackCompleteSpy).toHaveBeenCalled();
    });
  });

  describe('onSessionEnd', () => {
    it('should call MHB trackSessionEnd', () => {
      // Then
      analytics.onSessionEnd();

      // Expect
      expect(trackSessionEndSpy).toHaveBeenCalled();
    });
  });

  describe('onSeek', () => {
    it('should call trackEvent with correct params', () => {
      // Then
      analytics.onSeek();

      // Expect
      expect(trackEventSpy).toHaveBeenCalledWith('seekStart');
    });
  });

  describe('onSeeked', () => {
    it('should call trackEvent with correct params', () => {
      // Then
      analytics.onSeeked();

      // Expect
      expect(trackEventSpy).toHaveBeenCalledWith('seekComplete');
    });
  });
});
