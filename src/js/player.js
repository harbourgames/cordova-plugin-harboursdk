
import UI from "./ui";

export const player = {
  init,
  isLoggedIn,
  checkLoginStatus,
  login,
  onLoginButtonPress,
  setLoginCallback,

  getID,
  getName,
  getPhoto,
  getEmail,
  getDataAsync,
  setDataAsync,
  getStatsAsync,
  setStatsAsync,
  incrementStatsAsync,
  flushDataAsync,
  getConnectedPlayersAsync,
  getSignedPlayerInfoAsync,
  canSubscribeBotAsync,
  subscribeBotAsync,
};

let g_facebookAppId;
let g_isLoggedIn = false;
let g_uid;
let g_email;
let g_name;
let g_photoUrl;
let g_signedRequest;
let g_accessToken;
let g_loginSuccessCallback;

function init(opts) {
  g_facebookAppId = opts.facebookAppId;
}
function isLoggedIn() {
  return g_isLoggedIn;
}
function checkLoginStatus(done) {
  if (window.facebookConnectPlugin) {
    window.facebookConnectPlugin.getLoginStatus(response => {
      if (response.status === "connected") {
        g_uid = response.authResponse.userID;
        g_signedRequest = response.authResponse.signedRequest;
        g_accessToken = response.authResponse.accessToken;
        _postLogin(() => done());
      } else {
        g_isLoggedIn = false;
        done && done();
      }
    },err => {
      g_isLoggedIn = false;
      done && done();
    });
  } else {
    done && done();
  }
}
function login(done) {
  if (window.facebookConnectPlugin) {
    const scopes = ['email'];
    window.facebookConnectPlugin.login(scopes,response => {
      let err;
      if (response && response.status === "connected") {
        g_uid = response.authResponse.userID;
        g_signedRequest = response.authResponse.signedRequest;
        g_accessToken = response.authResponse.accessToken;
        _postLogin(done);
      } else {
        err = response.status;
        done && done(err);
      }
    },err => {
      done && done(err);
    });
  } else {
    done && done('no_facebook_plugin');
  }
}
function _postLogin(done) {
  if (window.facebookConnectPlugin) {
    const fields = "email,name,picture.type(large)";
    window.facebookConnectPlugin.api(`/me?fields=${fields}`,[],response => {
      let err;
      if (!response || response.error) {
        err = response ? response.error : 'no_response';
      } else {
        g_email = response.email;
        g_name = response.name;
        g_photoUrl = _getUrl(response.picture);
        g_isLoggedIn = true;
        g_loginSuccessCallback && g_loginSuccessCallback();
        g_loginSuccessCallback = null;
        UI.removeLoginButton();
      }
      done && done(err);
    },err => {
      done && done(err);
    });
  } else {
    done && done('no_facebook_plugin');
  }
}

function onLoginButtonPress() {
  login();
}
function setLoginCallback(cb) {
  g_loginSuccessCallback = cb;
}

function getID() {
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
function getDataAsync() {

}
function setDataAsync() {

}
function getStatsAsync() {

}
function setStatsAsync() {

}
function incrementStatsAsync() {

}
function flushDataAsync() {

}
function getConnectedPlayersAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}
function getSignedPlayerInfoAsync() {
  return Promise.resolve({
    getSignature: () => g_signedRequest,
    getPlayerID: getID,
    getAppID: () => g_facebookAppId,
    getAccessToken: () => g_accessToken,
  });
}
function canSubscribeBotAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}
function subscribeBotAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}

function _getUrl(obj) {
  return obj && obj.data && obj.data.url;
}
