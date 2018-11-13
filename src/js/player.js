
export const player = {
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

let g_isLoggedIn = true;
let g_uid = "12345";
let g_email = "foo@bar.com";
let g_name = "Player 1";
let g_photoUrl = "";
let g_signedRequest = "fake";
let g_loginSuccessCallback;

function isLoggedIn() {
  return g_isLoggedIn;
}
function checkLoginStatus(done) {
  done(null,g_isLoggedIn);
}

function login() {
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
