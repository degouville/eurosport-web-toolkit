import Stopwatch from './stopwatch';

jest.useFakeTimers();

describe('Stopwatch', () => {
  const advanceTimersByTime = refreshInterval => jest.advanceTimersByTime(refreshInterval);

  it('Should increment the timer when it is started', () => {
    // Given
    const stopwatch = new Stopwatch(1000);

    // When
    advanceTimersByTime(1000);
    stopwatch.start();
    advanceTimersByTime(1000);

    // Then
    expect(stopwatch.ms).toEqual(1000);
  });

  it('Should stop incrementing the timer when stop is triggered', () => {
    // Given
    const stopwatch = new Stopwatch(1000);

    // When
    stopwatch.start();
    advanceTimersByTime(1000);
    stopwatch.stop();
    advanceTimersByTime(1000);

    // Then
    expect(stopwatch.ms).toEqual(1000);
  });

  it('Should resume if we start after a stop', () => {
    // Given
    const stopwatch = new Stopwatch(1000);

    // When
    stopwatch.start();
    advanceTimersByTime(1000);
    stopwatch.stop();
    advanceTimersByTime(1000);
    stopwatch.start();
    advanceTimersByTime(1000);

    // Then
    expect(stopwatch.ms).toEqual(2000);
  });

  it('Should do nothing when start is called for a running timer', () => {
    // Given
    const stopwatch = new Stopwatch(1000);

    // When
    stopwatch.start();
    advanceTimersByTime(1000);
    stopwatch.start();
    advanceTimersByTime(1000);

    // Then
    expect(stopwatch.ms).toEqual(2000);
  });

  it('Should increment the timer continuously when it is running', () => {
    // Given
    const stopwatch = new Stopwatch(1000);

    // When
    stopwatch.start();
    advanceTimersByTime(3000);

    // Then
    expect(stopwatch.ms).toEqual(3000);
  });

  it('Should reset to 0 and stop the timer when we call reset', () => {
    // Given
    const stopwatch = new Stopwatch(1000);

    // When
    stopwatch.start();
    advanceTimersByTime(3000);
    stopwatch.reset();
    advanceTimersByTime(3000);

    // Then
    expect(stopwatch.ms).toEqual(0);
  });

  it('Should have default value when no refreshInterval is provided', () => {
    // Given
    const stopwatch = new Stopwatch();

    // When
    stopwatch.start();
    advanceTimersByTime(Stopwatch.defaultRefreshInterval);

    // Then
    expect(stopwatch.ms).toEqual(Stopwatch.defaultRefreshInterval);
  });
});
