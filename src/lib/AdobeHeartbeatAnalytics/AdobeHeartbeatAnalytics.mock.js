export const analyticsData = {
  id: 'id',
  partner_code: 'partnerCode',
  profile: 'profile',
  provider: 'provider',
  stream_type: 'streamtype',
  transmission_type: 'transmissionType',
  embedded_status: '1',
  magazine: 'magazine',
  family: 'family',
  sport: 'sport',
  competition: 'competition',
  sport_event: 'sport_event',
  season: 'season',
  round: 'round',
  discipline: 'discipline',
  participants: 'participants',
  gender: 'gender',
  page_name: 'page_name',
  section: 'service',
  page_type: 'page_type',
  product: 'product',
  site: 'site',
  environment: 'environment',
  language_name: 'language_name',
  language_id: 'language_id',
  user_id: '',
  login_status: 0,
  sub_login_status: 0,
  sub_client_id: '',
  offer_type: 'z',
  perimeter: 'web',
};

export const heartbeatConfig = {
  network: 'discoverydp.hb.omtrdc.net',
  playerName: 'JWPlayer',
  appVersion: '',
  debugLogging: true,
  ssl: true,
};

export const videoMetadata = {
  id: '1',
  title: 'test',
  duration: 3600,
  streamType: '',
  contentchannel: 'british-eurosport',
  customMetadata: analyticsData,
};

export const programStartDateTime = 0;

export const dataLayer = [
  {
    content_id: 'content_id',
    partner_code: 'partner_code',
    profile: 'profile',
    provider: 'provider',
    page_name: 'a',
    service: 'b',
    page_type: 'c',
    product: 'd',
    site: 'e',
    environment: 'f',
    language_name: 'g',
    language_id: 'h',
    user_id: 'i',
    login_status: 'j',
    sub_login_status: 'k',
    sub_client_id: 'l',
  },
];

export const mediaHeartbeatMockCreator = ({
  trackSessionStartSpy,
  trackEventSpy,
  trackPlaySpy,
  trackPauseSpy,
  trackCompleteSpy,
  trackSessionEndSpy,
  setValueSpy,
}) => {
  const mockMHB = jest.fn();
  mockMHB.prototype.trackSessionStart = trackSessionStartSpy;
  mockMHB.prototype.trackEvent = trackEventSpy;
  mockMHB.prototype.trackPlay = trackPlaySpy;
  mockMHB.prototype.trackPause = trackPauseSpy;
  mockMHB.prototype.trackComplete = trackCompleteSpy;
  mockMHB.prototype.trackSessionEnd = trackSessionEndSpy;
  mockMHB.createMediaObject = jest.fn().mockReturnValue({
    setValue: setValueSpy,
  });
  mockMHB.VideoMetadataKeys = {
    NETWORK: 'network',
  };
  mockMHB.MediaObjectKey = {
    StandardVideoMetaData: null,
  };
  mockMHB.Event = {
    AdBreakStart: 'adBreakStart',
    AdBreakComplete: 'adBreakComplete',
    AdStart: 'adStart',
    AdComplete: 'adComplete',
  };
  mockMHB.createAdBreakObject = jest.fn().mockReturnValue('createAdBreakObject');
  mockMHB.createAdObject = jest.fn().mockReturnValue('createAdObject');
  return mockMHB;
};
