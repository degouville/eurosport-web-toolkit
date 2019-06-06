export default class Stopwatch {
  static defaultRefreshInterval = 100;

  constructor(refreshInterval = Stopwatch.defaultRefreshInterval) {
    this.refreshInterval = refreshInterval;
  }

  refreshInterval;

  refreshIntervalId = null;

  ms = 0;

  start = () => {
    if (this.refreshIntervalId) return;
    this.refreshIntervalId = setInterval(this.onInterval, this.refreshInterval);
  };

  onInterval = () => {
    this.ms += this.refreshInterval;
  };

  stop = () => {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
      this.refreshIntervalId = null;
    }
  };

  reset = () => {
    this.stop();
    this.ms = 0;
  };
}
