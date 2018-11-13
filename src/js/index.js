
import { asyncSeries, } from './tools/util.js';

import { context } from './context';
import { getLeaderboardAsync } from './leaderboard';
import { payments } from './payments';
import { player } from './player'
import UI from './ui';

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
};
module.exports = HarbourSDK;

let g_heyzapPublisherId;
let g_heyzapInitialized = false;

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
function initializeAsync(opts) {
  g_heyzapPublisherId = opts.heyzapPublisherId;

  return new Promise(resolve => {
    asyncSeries([
      _deviceReady,
      _heyzapInit,
    ],err => {
      UI.addLoader(opts);
      resolve();
    });
  });
}
function setLoadingProgress(progress) {
  return new Promise(resolve => {
    UI.setLoaderText(progress.toFixed() + '% Loaded');
    resolve();
  });
}
function startGameAsync() {
  return new Promise(resolve => {
    UI.removeLoader();
    resolve();
  });
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
function logEvent(eventName,value,parameters) {
  console.log('logEvent:',eventName,value,parameters);
  return null;
}
function onPause(callback) {
  window.onblur = callback;
}
function getInterstitialAdAsync() {
  if (g_heyzapInitialized) {
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
  if (g_heyzapInitialized) {
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
  if (!g_heyzapInitialized) {
    console.error("HarbourSDK: debugHeyzap before init");
  }

  return window.HeyzapAds.showMediationTestSuite();
}

function _deviceReady(done) {
  document.addEventListener('deviceready',() => done(),false);
}

function _heyzapInit(done) {
  if (g_heyzapPublisherId) {
    window.HeyzapAds.start(g_heyzapPublisherId).then(() => {
      g_heyzapInitialized = true;
      done();
    },err => {
      console.error("HarbourSDK: Heyzap init failed:",err);
      done();
    });
  } else {
    done();
  }
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
