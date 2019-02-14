
import { initializeAsync, setLoadingProgress, startGameAsync } from './startup.js';
import { context } from './context';
import { getLeaderboardAsync } from './leaderboard';
import { payments } from './payments';
import { player } from './player'

const HarbourSDK = {
  player,
  context,
  payments,
  getLocale,
  initializeAsync,
  setLoadingProgress,
  startGameAsync,
  quit,
  updateAsync,
  getEntryPointData,
  getEntryPointAsync,
  setSessionData,
  getPlatform,
  getSDKVersion,
  getSupportedAPIs,
  shareAsync,
  switchGameAsync,
  logEvent,
  onPause,
  getInterstitialAdAsync,
  getRewardedVideoAsync,
  getLeaderboardAsync,
  debugHeyzap,
  getDeviceId,
};
module.exports = HarbourSDK;

function getLocale() {
  let locale = 'en-US';
  if (window.navigator) {
    if (window.navigator.language) {
      locale = window.navigator.language;
    } else if (window.navigator.languages && window.navigator.languages[0]) {
      locale = window.navigator.languages[0];
    }
  }
  return locale;
}

function quit() {
  window.close();
}
function updateAsync() {
  return Promise.reject({ code: 'CLIENT_UNSUPPORTED_OPERATION', });
}
function getEntryPointData() {
  return {};
}
function getEntryPointAsync() {
  return Promise.resolve(null);
}
function setSessionData() {
}
function getPlatform() {
  return 'WEB';
}
function getSDKVersion() {
  return '6.2';
}
function getSupportedAPIs() {
  const api_list = [];
  for (const prop in HarbourSDK) {
    api_list.push(prop);
  }
  for (const prop in HarbourSDK.player) {
    api_list.push('player.' + prop);
  }
  for (const prop in HarbourSDK.context) {
    api_list.push('context.' + prop);
  }
  for (const prop in HarbourSDK.payment) {
    api_list.push('payment.' + prop);
  }
  return api_list;
}
function shareAsync() {
  return Promise.reject({ code: 'USER_CANCEL', });
}
function switchGameAsync() {
  return Promise.reject({ code: 'CLIENT_UNSUPPORTED_OPERATION', });
}
function logEvent() {
  return null;
}
function onPause(callback) {
  window.onblur = callback;
}
function getInterstitialAdAsync() {
  if (window.HarbourSDK.heyzapInitialized) {
    return new Promise((resolve,reject) => {
      window.HeyzapAds.VideoAd.fetch().then(() => {
        resolve({
          getPlacmentId: () => 'video',
          loadAsync: () => Promise.resolve(),
          showAsync: _showVideoAd,
        });
      },err => {
        reject({ code: 'ADS_NO_FILL' });
      });
    });
  } else {
    return Promise.reject({ code: 'CLIENT_UNSUPPORTED_OPERATION', });
  }
}
function getRewardedVideoAsync() {
  if (window.HarbourSDK.heyzapInitialized) {
    return new Promise((resolve,reject) => {
      window.HeyzapAds.IncentivizedAd.fetch().then(() => {
        resolve({
          getPlacmentId: () => 'reward',
          loadAsync: () => Promise.resolve(),
          showAsync: _showRewardedAd,
        });
      },err => {
        reject({ code: 'ADS_NO_FILL' });
      })
    });
  } else {
    return Promise.reject({ code: 'CLIENT_UNSUPPORTED_OPERATION', });
  }
}
function debugHeyzap() {
  if (!window.HarbourSDK.heyzapInitialized) {
    console.error("HarbourSDK: debugHeyzap before init");
  }

  return window.HeyzapAds.showMediationTestSuite();
}

function _showVideoAd() {
  return new Promise((resolve,reject) => {
    window.HeyzapAds.VideoAd.show().then(() => {
      resolve();
    },err => {
      reject({ code: 'NETWORK_FAILURE' })
    });
  });
}
function _showRewardedAd() {
  return new Promise((resolve,reject) => {
    window.HeyzapAds.IncentivizedAd.show().then(() => {
      resolve();
    },err => {
      reject({ code: 'NETWORK_FAILURE' })
    });
  });
}
function getDeviceId() {
  if (window.cordova && window.cordova.plugins && window.cordova.plugins.idfa) {
    return new Promise((resolve,reject) => {
      window.cordova.plugins.idfa.getInfo().then(info => {
        resolve(info.idfa || info.aaid);
      },err => {
        reject({ code: 'NOT_AVAILABLE' });
      });
    });
  } else {
    return Promise.reject({ code: 'NOT_AVAILABLE', });
  }
}
