
import { asyncSeries, } from "./tools/util.js";
import UI from "./ui";
import { player } from "./player";
import { payments } from "./payments";

let g_facebookAppId;
let g_requiresLogin;
let g_heyzapPublisherId;

export function getAppID() {
  return g_facebookAppId;
}
export function initializeAsync(opts) {
  g_facebookAppId = opts.facebookAppId;
  g_requiresLogin = opts.requiresLogin || false;
  g_heyzapPublisherId = opts.heyzapPublisherId;
  player.init(opts);

  return new Promise(resolve => {
    UI.addLoader(opts);
    resolve();

    asyncSeries([
      done => _deviceReady(() => {
        done();
        setTimeout(() => {
          if (window.navigator && window.navigator.splashscreen) {
            window.navigator.splashscreen.hide();
          }
        },100);
      }),
      player.checkLoginStatus,
    ],
    () => {
      if (!player.isLoggedIn() && g_requiresLogin) {
        UI.addLoginButton();
      }
      _heyzapInit();
      payments.init(opts);
    });
  });
}
export function setLoadingProgress(progress) {
  return new Promise(resolve => {
    UI.setLoaderText(progress.toFixed() + "% Loaded");
    resolve();
  });
}
export function startGameAsync() {
  return new Promise(resolve => {

    function _startGame() {
      UI.removeLoader();
      resolve();
    }

    if (player.isLoggedIn() || !g_requiresLogin) {
      _startGame();
    } else {
      UI.setLoaderText("Login to Continue");
      player.setLoginCallback(_startGame);
    }
  });
}
function _heyzapInit(done) {
  if (g_heyzapPublisherId) {
    window.HeyzapAds.start(g_heyzapPublisherId).then(() => {
      window.HarbourSDK.heyzapInitialized = true;
      done && done();
    },err => {
      console.error("HarbourSDK: Heyzap init failed:",err);
      done && done();
    });
  } else {
    done && done();
  }
}

function _deviceReady(done) {
  document.addEventListener('deviceready',() => done(),false);
}
