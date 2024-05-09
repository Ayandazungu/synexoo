//Performance API Polyfills
(function () {
    var noop = function noop() {};
    if ("performance" in window === false) {
      window.performance = {};
    }
    window.performance.mark = performance.mark || noop;
    window.performance.measure = performance.measure || noop;
    if ("now" in window.performance === false) {
      var nowOffset = Date.now();
      if (performance.timing && performance.timing.navigationStart) {
        nowOffset = performance.timing.navigationStart;
      }
      window.performance.now = function now() {
        return Date.now() - nowOffset;
      };
    }
  })();

//Globals Definitions
(function () {
    var now = Date.now()
    window.initialTimestamps = {
      initialTimestamp: now,
      initialRequestTimestamp: Math.round(performance.timeOrigin ? performance.timeOrigin : now - performance.now())
    }

    window.thunderboltTag = "libs-releases-GA-local"
    window.thunderboltVersion = "1.13950.0"
  })();

//Polyfills check
if (
    typeof Promise === 'undefined' ||
    typeof Set === 'undefined' ||
    typeof Object.assign === 'undefined' ||
    typeof Array.from === 'undefined' ||
    typeof Symbol === 'undefined'
  ) {
    // send bi in order to detect the browsers in which polyfills are not working
    window.fedops.phaseStarted('missing_polyfills')
  }