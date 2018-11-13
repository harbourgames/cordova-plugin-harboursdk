'use strict';

function asyncSeries(list, callback) {
  function _run(index, list, callback) {
    var item = list[index];

    if (item) {
      item(function (err) {
        if (err) {
          callback(err);
        } else {
          _run(index + 1, list, callback);
        }
      });
    } else {
      callback();
    }
  }

  _run(0, list, callback);
}
function resolveStyles() {
  var obj = {};

  function _addStyle(arg) {
    if (Array.isArray(arg)) {
      arg.forEach(_addStyle);
    } else {
      for (var key in arg) {
        obj[key] = arg[key];
      }
    }
  }

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  _addStyle(args);

  var s = "";

  for (var key in obj) {
    var val = obj[key];
    s += key + ":" + val + ";";
  }

  return s;
}

var context = {
  getID: getID,
  chooseAsync: chooseAsync,
  switchAsync: switchAsync,
  createAsync: createAsync,
  getType: getType,
  isSizeBetween: isSizeBetween,
  getPlayersAsync: getPlayersAsync
};

function getID() {
  return null;
}

function getType() {
  return "SOLO";
}

function chooseAsync() {
  return Promise.reject({
    code: "USER_CANCEL"
  });
}

function createAsync() {
  return Promise.reject({
    code: "USER_CANCEL"
  });
}

function switchAsync() {
  return Promise.reject({
    code: "USER_CANCEL"
  });
}

function isSizeBetween() {
  return null;
}

function getPlayersAsync() {
  return Promise.reject({
    code: "CLIENT_UNSUPPORTED_OPERATION"
  });
}

function getLeaderboardAsync() {
  return Promise.reject({
    code: "CLIENT_UNSUPPORTED_OPERATION"
  });
}

var payments = {
  onReady: onReady,
  getCatalogAsync: getCatalogAsync,
  purchaseAsync: purchaseAsync,
  consumePurchaseAsync: consumePurchaseAsync
};

function onReady() {}

function getCatalogAsync() {}

function purchaseAsync() {}

function consumePurchaseAsync() {}

var UI = {
  addLoader: addLoader,
  removeLoader: removeLoader,
  setLoaderText: setLoaderText,
  addLoginButton: addLoginButton,
  removeLoginButton: removeLoginButton,
  addBlockError: addBlockError
};
var styles = {
  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: "black center center no-repeat",
    "background-size": "cover",
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center"
  },
  cover: {
    "z-index": "0",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center"
  },
  middleLoader: {
    "z-index": "1",
    position: "relative",
    width: "100px",
    height: "100px",
    "border-radius": "50%",
    overflow: "hidden"
  },
  icon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "10px",
    "border-radius": "50%",
    background: "#333 center center no-repeat",
    "background-size": "cover"
  },
  spinner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    border: "10px solid",
    "border-color": "blue black blue black",
    "border-radius": "50%",
    animation: "harbour-loader-spinner 2s linear infinite"
  },
  loaderText: {
    "z-index": "1",
    "margin-top": "20px",
    color: "white",
    "font-size": "16px",
    "font-weight": "bold",
    "font-family": "Helvetica, Arial, sans-serif"
  },
  loginButton: {
    position: "absolute",
    bottom: "60px",
    "margin-left": "auto",
    "margin-right": "auto",
    height: "40px",
    width: "236px",
    background: "#4267b2",
    "border-radius": "4px",
    cursor: "pointer",
    display: "flex",
    "flex-direction": "row",
    "justify-content": "center",
    "align-items": "center"
  },
  loginIcon: {
    position: 'absolute',
    top: "8px",
    left: "10px",
    width: "24px",
    height: "24px"
  },
  loginText: {
    "margin-left": "24px",
    "margin-top": "2px",
    color: "white",
    "font-family": "Helvetica, Arial, sans-serif",
    "font-size": "16px"
  },
  errorText: {
    "z-index": "1",
    "margin-top": "10px",
    padding: "20px",
    color: "red",
    "font-size": "16px",
    "font-family": "Helvetica, Arial, sans-serif",
    "text-align": "center"
  }
};

function addLoader(opts) {
  var loader_style;

  if (opts && opts.backgroundImage) {
    var _style = {
      "background-image": "url(" + opts.backgroundImage + ")"
    };
    loader_style = resolveStyles([styles.loader, _style]);
  } else {
    loader_style = resolveStyles(styles.loader);
  }

  var icon_style;

  if (opts && opts.iconImage) {
    var _style2 = {
      "background-image": "url(" + opts.iconImage + ")"
    };
    icon_style = resolveStyles([styles.icon, _style2]);
  } else {
    icon_style = resolveStyles(styles.icon);
  }

  var html = "<div id=\"harbour-loader\" style=\"".concat(loader_style, "\">\n  <div style=\"").concat(resolveStyles(styles.cover), "\"></div>\n    <div style=\"").concat(resolveStyles(styles.middleLoader), "\">\n      <div style=\"").concat(resolveStyles(styles.spinner), "\"></div>\n      <div style=\"").concat(icon_style, "\"></div>\n    </div>\n    <div id=\"harbour-loader-text\" style=\"").concat(resolveStyles(styles.loaderText), "\">0% Loaded</div>\n\n</div>");
  var temp = document.createElement("div");
  temp.innerHTML = html;
  document.body.appendChild(temp.firstChild);
  var css = "@keyframes harbour-loader-spinner {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n";
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}

function removeLoader() {
  var el = document.getElementById("harbour-loader");
  document.body.removeChild(el);
}

function setLoaderText(text) {
  var text_el = document.getElementById("harbour-loader-text");
  text_el.innerText = text;
}

function addLoginButton() {
  var html = "<div id=\"harbour-loader-login-button\" style=\"".concat(resolveStyles(styles.loginButton), "\" onclick=\"window.HarbourSDK.player.onLoginButtonPress()\">\n  <svg xmlns=\"http://www.w3.org/2000/svg\" style=\"").concat(resolveStyles(styles.loginIcon), "\" viewBox=\"0 0 216 216\" color=\"#FFFFFF\">\n    <path fill=\"#FFFFFF\" d=\"\n M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9\n 11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1\n 11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2\n 15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3\n 11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z\">\n    </path>\n  </svg>\n  <div style=\"").concat(resolveStyles(styles.loginText), "\">Continue With Facebook</div>\n</div>");

  _appendHtmlToLoader(html);
}

function removeLoginButton() {
  var login = document.getElementById("harbour-loader-login-button");
  var loader = document.getElementById("harbour-loader");
  login && loader && loader.removeChild(login);
}

function addBlockError() {
  var html = "<div style=\"".concat(resolveStyles(styles.errorText), "\">\n  Error communicating with Facebook.<br/>\n  This site requires Facebook login.<br/>\n  Please check your adblocker or reload the page.\n</div>");

  _appendHtmlToLoader(html);
}

function _appendHtmlToLoader(html) {
  var loader = document.getElementById("harbour-loader");
  var temp = document.createElement("div");
  temp.innerHTML = html;
  loader.appendChild(temp.firstChild);
}

var player = {
  isLoggedIn: isLoggedIn,
  checkLoginStatus: checkLoginStatus,
  login: login,
  onLoginButtonPress: onLoginButtonPress,
  setLoginCallback: setLoginCallback,
  getID: getID$1,
  getName: getName,
  getPhoto: getPhoto,
  getEmail: getEmail,
  getDataAsync: getDataAsync,
  setDataAsync: setDataAsync,
  getStatsAsync: getStatsAsync,
  setStatsAsync: setStatsAsync,
  incrementStatsAsync: incrementStatsAsync,
  flushDataAsync: flushDataAsync,
  getConnectedPlayersAsync: getConnectedPlayersAsync,
  getSignedPlayerInfoAsync: getSignedPlayerInfoAsync,
  canSubscribeBotAsync: canSubscribeBotAsync,
  subscribeBotAsync: subscribeBotAsync
};
var g_isLoggedIn = true;
var g_uid = "12345";
var g_email = "foo@bar.com";
var g_name = "Player 1";
var g_photoUrl = "";
var g_signedRequest = "fake";

function isLoggedIn() {
  return g_isLoggedIn;
}

function checkLoginStatus(done) {
  done(null, g_isLoggedIn);
}

function login() {}

function onLoginButtonPress() {
}

function setLoginCallback(cb) {
}

function getID$1() {
  return g_uid;
}

function getName() {
  return g_name;
}

function getPhoto() {
  return g_photoUrl;
}

function getEmail() {
  return g_email;
}

function getDataAsync() {}

function setDataAsync() {}

function getStatsAsync() {}

function setStatsAsync() {}

function incrementStatsAsync() {}

function flushDataAsync() {}

function getConnectedPlayersAsync() {
  return Promise.reject({
    code: "CLIENT_UNSUPPORTED_OPERATION"
  });
}

function getSignedPlayerInfoAsync() {
  return Promise.resolve({
    getSignature: function getSignature() {
      return g_signedRequest;
    },
    getPlayerID: getID$1
  });
}

function canSubscribeBotAsync() {
  return Promise.reject({
    code: "CLIENT_UNSUPPORTED_OPERATION"
  });
}

function subscribeBotAsync() {
  return Promise.reject({
    code: "CLIENT_UNSUPPORTED_OPERATION"
  });
}

var HarbourSDK = {
  player: player,
  context: context,
  payments: payments,
  getLocale: getLocale,
  initializeAsync: initializeAsync,
  setLoadingProgress: setLoadingProgress,
  startGameAsync: startGameAsync,
  quit: quit,
  updateAsync: updateAsync,
  getEntryPointData: getEntryPointData,
  getEntryPointAsync: getEntryPointAsync,
  setSessionData: setSessionData,
  getPlatform: getPlatform,
  getSDKVersion: getSDKVersion,
  getSupportedAPIs: getSupportedAPIs,
  shareAsync: shareAsync,
  switchGameAsync: switchGameAsync,
  logEvent: logEvent,
  onPause: onPause,
  getInterstitialAdAsync: getInterstitialAdAsync,
  getRewardedVideoAsync: getRewardedVideoAsync,
  getLeaderboardAsync: getLeaderboardAsync,
  debugHeyzap: debugHeyzap
};
module.exports = HarbourSDK;
var g_heyzapPublisherId;
var g_heyzapInitialized = false;

function getLocale() {
  var locale = 'en-US';

  if (window.navigator) {
    if (window.navigator.language) {
      locale = window.navigator.language;
    } else if (window.navigator.languages && window.navigator.languages[0]) {
      locale = window.navigator.languages[0];
    }
  }

  return locale;
}

function initializeAsync(opts) {
  g_heyzapPublisherId = opts.heyzapPublisherId;
  return new Promise(function (resolve) {
    asyncSeries([_deviceReady, _heyzapInit], function (err) {
      UI.addLoader(opts);
      resolve();
    });
  });
}

function setLoadingProgress(progress) {
  return new Promise(function (resolve) {
    UI.setLoaderText(progress.toFixed() + '% Loaded');
    resolve();
  });
}

function startGameAsync() {
  return new Promise(function (resolve) {
    UI.removeLoader();
    resolve();
  });
}

function quit() {
  window.close();
}

function updateAsync() {
  return Promise.reject({
    code: 'CLIENT_UNSUPPORTED_OPERATION'
  });
}

function getEntryPointData() {
  return {};
}

function getEntryPointAsync() {
  return Promise.resolve(null);
}

function setSessionData() {}

function getPlatform() {
  return 'WEB';
}

function getSDKVersion() {
  return '6.2';
}

function getSupportedAPIs() {
  var api_list = [];

  for (var prop in HarbourSDK) {
    api_list.push(prop);
  }

  for (var _prop in HarbourSDK.player) {
    api_list.push('player.' + _prop);
  }

  for (var _prop2 in HarbourSDK.context) {
    api_list.push('context.' + _prop2);
  }

  for (var _prop3 in HarbourSDK.payment) {
    api_list.push('payment.' + _prop3);
  }

  return api_list;
}

function shareAsync() {
  return Promise.reject({
    code: 'USER_CANCEL'
  });
}

function switchGameAsync() {
  return Promise.reject({
    code: 'CLIENT_UNSUPPORTED_OPERATION'
  });
}

function logEvent(eventName, value, parameters) {
  console.log('logEvent:', eventName, value, parameters);
  return null;
}

function onPause(callback) {
  window.onblur = callback;
}

function getInterstitialAdAsync() {
  if (g_heyzapInitialized) {
    return new Promise(function (resolve, reject) {
      window.HeyzapAds.VideoAd.fetch().then(function () {
        resolve({
          getPlacmentId: function getPlacmentId() {
            return 'video';
          },
          loadAsync: function loadAsync() {
            return Promise.resolve();
          },
          showAsync: _showVideoAd
        });
      }, function (err) {
        reject({
          code: 'ADS_NO_FILL'
        });
      });
    });
  } else {
    return Promise.reject({
      code: 'CLIENT_UNSUPPORTED_OPERATION'
    });
  }
}

function getRewardedVideoAsync() {
  if (g_heyzapInitialized) {
    return new Promise(function (resolve, reject) {
      window.HeyzapAds.IncentivizedAd.fetch().then(function () {
        resolve({
          getPlacmentId: function getPlacmentId() {
            return 'reward';
          },
          loadAsync: function loadAsync() {
            return Promise.resolve();
          },
          showAsync: _showRewardedAd
        });
      }, function (err) {
        reject({
          code: 'ADS_NO_FILL'
        });
      });
    });
  } else {
    return Promise.reject({
      code: 'CLIENT_UNSUPPORTED_OPERATION'
    });
  }
}

function debugHeyzap() {
  if (!g_heyzapInitialized) {
    console.error("HarbourSDK: debugHeyzap before init");
  }

  return window.HeyzapAds.showMediationTestSuite();
}

function _deviceReady(done) {
  document.addEventListener('deviceready', function () {
    return done();
  }, false);
}

function _heyzapInit(done) {
  if (g_heyzapPublisherId) {
    window.HeyzapAds.start(g_heyzapPublisherId).then(function () {
      g_heyzapInitialized = true;
      done();
    }, function (err) {
      console.error("HarbourSDK: Heyzap init failed:", err);
      done();
    });
  } else {
    done();
  }
}

function _showVideoAd() {
  return new Promise(function (resolve, reject) {
    window.HeyzapAds.VideoAd.show().then(function () {
      resolve();
    }, function (err) {
      reject({
        code: 'NETWORK_FAILURE'
      });
    });
  });
}

function _showRewardedAd() {
  return new Promise(function (resolve, reject) {
    window.HeyzapAds.IncentivizedAd.show().then(function () {
      resolve();
    }, function (err) {
      reject({
        code: 'NETWORK_FAILURE'
      });
    });
  });
}
//# sourceMappingURL=harbour-cordova-sdk.js.map
