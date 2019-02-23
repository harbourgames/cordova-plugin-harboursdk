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
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'transparent center center no-repeat',
    'background-size': 'cover',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    'font-family': 'Helvetica, Arial, sans-serif',
    'font-weight': 'normal'
  },
  cover: {
    'z-index': '0',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(0,0,0,0.3)',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center'
  },
  middleLoader: {
    'z-index': '1',
    position: 'relative',
    width: '100px',
    height: '100px',
    'border-radius': '50%',
    overflow: 'hidden'
  },
  icon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: '10px',
    'border-radius': '50%',
    background: '#333 center center no-repeat',
    'background-size': 'cover'
  },
  spinner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    border: '10px solid',
    'border-color': 'blue black blue black',
    'border-radius': '50%',
    animation: 'harbour-loader-spinner 2s linear infinite'
  },
  loaderText: {
    'z-index': '1',
    'margin-top': '20px',
    color: 'white',
    'font-size': '16px',
    'font-weight': 'bold',
    'font-family': 'inherit',
    'text-shadow': '0 0 5px black'
  },
  loginButton: {
    position: 'absolute',
    bottom: '60px',
    'margin-left': 'auto',
    'margin-right': 'auto',
    height: '40px',
    width: '236px',
    background: '#4267b2',
    'border-radius': '4px',
    cursor: 'pointer',
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'center',
    'align-items': 'center'
  },
  loginIcon: {
    position: 'absolute',
    top: '8px',
    left: '10px',
    width: '24px',
    height: '24px'
  },
  buttonText: {
    'margin-left': '24px',
    'margin-top': '2px',
    color: 'white',
    'font-size': '16px',
    'font-family': 'inherit'
  },
  errorText: {
    'z-index': '1',
    'margin-top': '10px',
    padding: '20px',
    color: 'red',
    'font-size': '16px',
    'font-family': 'inherit',
    'text-align': 'center',
    'text-shadow': '0 0 5px black'
  }
};

function addLoader(opts) {
  var loader_style;

  if (opts && opts.backgroundImage) {
    var _style = {
      'background-image': 'url(' + opts.backgroundImage + ')'
    };
    loader_style = resolveStyles([styles.loader, _style]);
  } else {
    loader_style = resolveStyles(styles.loader);
  }

  var icon_style;

  if (opts && opts.iconImage) {
    var _style2 = {
      'background-image': 'url(' + opts.iconImage + ')'
    };
    icon_style = resolveStyles([styles.icon, _style2]);
  } else {
    icon_style = resolveStyles(styles.icon);
  }

  var html = "<div id='harbour-loader' style='".concat(loader_style, "'>\n  <div class='harbour-cover' style='").concat(resolveStyles(styles.cover), "'></div>\n  <div class='harbour-loader' style='").concat(resolveStyles(styles.middleLoader), "'>\n    <div class='harbour-spinner' style='").concat(resolveStyles(styles.spinner), "'></div>\n    <div class='harbour-spinner-icon' style='").concat(icon_style, "'></div>\n  </div>\n  <div id='harbour-loader-text' style='").concat(resolveStyles(styles.loaderText), "'>0% Loaded</div>\n</div>");
  var temp = document.createElement('div');
  temp.innerHTML = html;
  document.body.appendChild(temp.firstChild);
  var css = "@keyframes harbour-loader-spinner {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n";
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}

function removeLoader() {
  var el = document.getElementById('harbour-loader');
  document.body.removeChild(el);
}

function setLoaderText(text) {
  var text_el = document.getElementById('harbour-loader-text');
  text_el.innerText = text;
}

function addLoginButton() {
  var html = "<div id='harbour-loader-login-button' style='".concat(resolveStyles(styles.loginButton), "' onclick='window.HarbourSDK.player.onLoginButtonPress()'>\n  <svg xmlns='http://www.w3.org/2000/svg' style='").concat(resolveStyles(styles.loginIcon), "' viewBox='0 0 216 216' color='#FFFFFF'>\n    <path fill='#FFFFFF' d='\n M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9\n 11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1\n 11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2\n 15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3\n 11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z'>\n    </path>\n  </svg>\n  <div style='").concat(resolveStyles(styles.buttonText), "'>Continue With Facebook</div>\n</div>");

  _appendHtmlToLoader(html);
}

function removeLoginButton() {
  var login = document.getElementById('harbour-loader-login-button');
  var loader = document.getElementById('harbour-loader');
  login && loader && loader.removeChild(login);
}

function addBlockError() {
  var html = "<div style='".concat(resolveStyles(styles.errorText), "'>\n  Error communicating with Facebook.<br/>\n  This site requires Facebook login.<br/>\n  Please check your adblocker or reload the page.\n</div>");

  _appendHtmlToLoader(html);
}

function _appendHtmlToLoader(html) {
  var loader = document.getElementById('harbour-loader');
  var temp = document.createElement('div');
  temp.innerHTML = html;
  loader.appendChild(temp.firstChild);
}

var player = {
  init: init,
  isLoggedIn: isLoggedIn,
  checkLoginStatus: checkLoginStatus,
  login: login,
  onLoginButtonPress: onLoginButtonPress,
  setLoginCallback: setLoginCallback,
  getID: getID,
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
var g_facebookAppId;
var g_isLoggedIn = false;
var g_uid;
var g_email;
var g_name;
var g_photoUrl;
var g_signedRequest;
var g_accessToken;
var g_loginSuccessCallback;

function init(opts) {
  g_facebookAppId = opts.facebookAppId;
}

function isLoggedIn() {
  return g_isLoggedIn;
}

function checkLoginStatus(done) {
  if (window.facebookConnectPlugin) {
    window.facebookConnectPlugin.getLoginStatus(function (response) {
      if (response.status === "connected") {
        g_uid = response.authResponse.userID;
        g_signedRequest = response.authResponse.signedRequest;
        g_accessToken = response.authResponse.accessToken;

        _postLogin(function () {
          return done();
        });
      } else {
        g_isLoggedIn = false;
        done && done();
      }
    }, function (err) {
      g_isLoggedIn = false;
      done && done();
    });
  } else {
    done && done();
  }
}

function login(done) {
  if (window.facebookConnectPlugin) {
    var scopes = ['email'];
    window.facebookConnectPlugin.login(scopes, function (response) {
      var err;

      if (response && response.status === "connected") {
        g_uid = response.authResponse.userID;
        g_signedRequest = response.authResponse.signedRequest;
        g_accessToken = response.authResponse.accessToken;

        _postLogin(done);
      } else {
        err = response.status;
        done && done(err);
      }
    }, function (err) {
      done && done(err);
    });
  } else {
    done && done('no_facebook_plugin');
  }
}

function _postLogin(done) {
  if (window.facebookConnectPlugin) {
    var fields = "email,name,picture.type(large)";
    window.facebookConnectPlugin.api("/me?fields=".concat(fields), [], function (response) {
      var err;

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
    }, function (err) {
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
    getPlayerID: getID,
    getAppID: function getAppID() {
      return g_facebookAppId;
    },
    getAccessToken: function getAccessToken() {
      return g_accessToken;
    }
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

function _getUrl(obj) {
  return obj && obj.data && obj.data.url;
}

var payments = {
  init: init$1,
  onReady: onReady,
  getCatalogAsync: getCatalogAsync,
  purchaseAsync: purchaseAsync,
  consumePurchaseAsync: consumePurchaseAsync
};
var ERROR_MAP = {
  '6777006': {
    code: 'USER_INPUT'
  }
};
var g_storeKit;
var g_ready = false;
var g_readyList = [];
var g_skuList;
var g_productList;
var g_purchaseDone;

function init$1(opts) {
  g_skuList = opts.skuList;
  g_storeKit = window.storekit;
  g_storeKit.init({
    error: _onError,
    ready: _onReady,
    purchase: _onPurchase,
    purchaseEnqueued: _onPurchaseEnqueued,
    purchasing: _onPurchasing,
    finish: _onFinish,
    restore: _onRestore,
    receiptsRefreshed: _onReceiptsRefreshed,
    restoreFailed: _onRestoreFailed,
    restoreCompleted: _onRestoreCompleted
  });
}

function onReady(done) {
  if (g_ready) {
    done();
  } else {
    g_readyList.push(done);
  }
}

function getCatalogAsync() {
  return Promise.resolve(g_productList);
}

function purchaseAsync(params) {
  var productID = params.productID;
  var product = g_productList.find(function (product) {
    return product.productID === productID;
  });

  if (product) {
    g_storeKit.purchase(productID, 1);
    return new Promise(function (resolve, reject) {
      g_purchaseDone = function g_purchaseDone(err, purchase) {
        if (err) {
          reject(err);
        } else {
          resolve(purchase);
        }
      };
    });
  } else {
    return Promise.reject('bad_product_id');
  }
}

function consumePurchaseAsync(transaction_id) {
  g_storeKit.finish(transaction_id);
  return Promise.resolve();
}

function _onError(err) {
  if (g_purchaseDone) {
    g_purchaseDone(ERROR_MAP[err] || err);
    g_purchaseDone = null;
  }
}

function _onReady() {
  g_storeKit.load(g_skuList, function (valid_list) {
    g_productList = valid_list.map(_transformProduct);
    g_ready = true;
    g_readyList.forEach(function (cb) {
      return cb();
    });
    g_readyList.length = 0;
  }, function (err) {
    console.error("HarbourSDK.iap_ios: load error:", err);
  });
}

function _transformProduct(product) {
  return {
    title: product.title,
    productID: product.id,
    description: product.description,
    imageURL: null,
    price: product.price,
    priceCurrencyCode: product.currency
  };
}

function _onPurchasing(product_id) {
  var transaction_id = g_storeKit.transactionForProduct[product_id];

  if (transaction_id) {
    _onPurchase(transaction_id, product_id);
  }
}

function _onPurchase(transaction_id, product_id) {
  if (product_id && transaction_id) {
    // store and localstorage, because the kit doesnt
    g_storeKit.transactionForProduct[product_id] = transaction_id;
    window.localStorage.sk_transactionForProduct = JSON.stringify(g_storeKit.transactionForProduct);
  }

  var receipt_b64 = g_storeKit.receiptForTransaction[transaction_id];

  if (g_purchaseDone && transaction_id && receipt_b64) {
    var is_sandbox = false;

    try {
      var receipt = atob(receipt_b64);
      is_sandbox = receipt && receipt.indexOf('"environment" = "Sandbox"') !== -1;
    } catch (e) {// noop
    }

    var data = {
      signedRequest: receipt_b64,
      purchaseToken: transaction_id,
      paymentID: transaction_id,
      productID: product_id,
      storeType: 'itunes',
      isSandbox: is_sandbox
    };
    g_purchaseDone(null, data);
    g_purchaseDone = null;
  }
}

function _onPurchaseEnqueued() {//console.log("onPurchaseEnqueued:",product_id);
}

function _onFinish(transaction_id, product_id) {
  if (g_storeKit.transactionForProduct[product_id] === transaction_id) {
    delete g_storeKit.transactionForProduct[product_id];
    window.localStorage.sk_transactionForProduct = JSON.stringify(g_storeKit.transactionForProduct);
  }
}

function _onRestore() {//console.log("onRestore:",product_id);
}

function _onReceiptsRefreshed() {//console.log("onReceiptsRefreshed:",product_id);
}

function _onRestoreFailed() {//console.log("onRestoreFailed:",err);
}

function _onRestoreCompleted() {//console.log("onRestoreCompleted:",product_id);
}

var payments$1 = {
  init: init$2,
  onReady: onReady$1,
  getCatalogAsync: getCatalogAsync$1,
  purchaseAsync: purchaseAsync$1,
  consumePurchaseAsync: consumePurchaseAsync$1
};
var g_inappbilling;
var g_ready$1 = false;
var g_readyList$1 = [];
var g_tokenToProductMap = {};

function init$2(params) {
  g_inappbilling = window.inappbilling;
  var opts = {
    showLog: false
  };
  var skus = params.skuList || [];
  g_inappbilling.init(function () {
    g_ready$1 = true;
    g_readyList$1.forEach(function (cb) {
      return cb();
    });
  }, function (err) {
    console.error("iap_android init err:", err);
  }, opts, skus);
}

function onReady$1(done) {
  if (g_ready$1) {
    done();
  } else {
    g_readyList$1.push(done);
  }
}

function getCatalogAsync$1() {
  return new Promise(function (resolve, reject) {
    g_inappbilling.getAvailableProducts(function (list) {
      var product_list = list && list.map(_transformProduct$1);
      resolve(product_list);
    }, function (err) {
      reject(err);
    });
  });
}

function purchaseAsync$1(params) {
  var productID = params.productID,
      developerPayload = params.developerPayload;
  var additionalData = {};

  if (developerPayload === 'string') {
    additionalData.developerPayload = developerPayload;
  } else if (developerPayload) {
    additionalData.developerPayload = JSON.stringify(developerPayload);
  }

  return new Promise(function (resolve, reject) {
    g_inappbilling.buy(function (purchase) {
      resolve(_transformPurchase(purchase));
    }, function (err) {
      if (typeof err === 'string' && err.indexOf('response: 7:Error') !== -1) {
        _getOwnedPurchase(productID, function (err, purchase) {
          if (err) {
            console.error("buy second err:", err);
          } else {
            resolve(_transformPurchase(purchase));
          }
        });
      } else {
        if (typeof err === 'string' && err.indexOf('User canceled') !== -1) {
          err = {
            code: 'USER_INPUT'
          };
        } else {
          console.error("buy err:", err);
        }

        reject(err);
      }
    }, productID, additionalData);
  });
}

function consumePurchaseAsync$1(purchase_token) {
  return new Promise(function (resolve, reject) {
    var product_id = g_tokenToProductMap[purchase_token];
    g_inappbilling.consumePurchase(function () {
      resolve();
    }, function (err) {
      console.error("consumePurchase err:", err);
      reject(err);
    }, product_id, purchase_token);
  });
}

function _transformPurchase(purchase) {
  var purchaseToken = purchase.purchaseToken,
      productId = purchase.productId;
  g_tokenToProductMap[purchaseToken] = productId;
  return {
    purchaseToken: purchaseToken,
    paymentID: purchase.orderId,
    productID: productId,
    storeType: 'play',
    isSandbox: false,
    purchaseTime: purchase.purchaseTime,
    playReceipt: purchase.receipt,
    playSignature: purchase.signature,
    playPurchaseState: purchase.purchaseState
  };
}

function _transformProduct$1(product) {
  return {
    title: product.title,
    productID: product.productId,
    description: product.description,
    imageURL: null,
    price: product.price,
    priceCurrencyCode: product.price_currency_code
  };
}

function _getOwnedPurchase(product_id, done) {
  g_inappbilling.getPurchases(function (list) {
    var purchase = list.find(function (item) {
      return item.productId === product_id;
    });

    if (purchase) {
      done(null, purchase);
    } else {
      done('failed_get_owned');
    }
  }, function (err) {
    console.error("_getOwnedPurchase: err:", err);
    done(err);
  });
}

var payments$2 = {
  init: init$3,
  onReady: onReady$2,
  getCatalogAsync: getCatalogAsync$2,
  purchaseAsync: purchaseAsync$2,
  consumePurchaseAsync: consumePurchaseAsync$2
};

function init$3(params) {
  if (window.cordova.platformId === 'ios') {
    Object.assign(payments$2, payments);
    payments.init(params);
  } else if (window.cordova.platformId === 'android') {
    Object.assign(payments$2, payments$1);
    payments$1.init(params);
  }
}

function onReady$2() {}

function getCatalogAsync$2() {
  return Promise.reject('not_implemented');
}

function purchaseAsync$2() {
  return Promise.reject('not_implemented');
}

function consumePurchaseAsync$2() {
  return Promise.reject('not_implemented');
}

var g_facebookAppId$1;
var g_requiresLogin;
var g_heyzapPublisherId;
function initializeAsync(opts) {
  g_facebookAppId$1 = opts.facebookAppId;
  g_requiresLogin = opts.requiresLogin || false;
  g_heyzapPublisherId = opts.heyzapPublisherId;
  player.init(opts);
  return new Promise(function (resolve) {
    UI.addLoader(opts);
    resolve();
    asyncSeries([function (done) {
      return _deviceReady(function () {
        done();
        setTimeout(function () {
          if (window.navigator && window.navigator.splashscreen) {
            window.navigator.splashscreen.hide();
          }
        }, 100);
      });
    }, player.checkLoginStatus], function () {
      if (!player.isLoggedIn() && g_requiresLogin) {
        UI.addLoginButton();
      }

      _heyzapInit();

      payments$2.init(opts);
    });
  });
}
function setLoadingProgress(progress) {
  return new Promise(function (resolve) {
    UI.setLoaderText(progress.toFixed() + "% Loaded");
    resolve();
  });
}
function startGameAsync() {
  return new Promise(function (resolve) {
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
    window.HeyzapAds.start(g_heyzapPublisherId).then(function () {
      window.HarbourSDK.heyzapInitialized = true;
      done && done();
    }, function (err) {
      console.error("HarbourSDK: Heyzap init failed:", err);
      done && done();
    });
  } else {
    done && done();
  }
}

function _deviceReady(done) {
  document.addEventListener('deviceready', function () {
    return done();
  }, false);
}

var context = {
  getID: getID$1,
  chooseAsync: chooseAsync,
  switchAsync: switchAsync,
  createAsync: createAsync,
  getType: getType,
  isSizeBetween: isSizeBetween,
  getPlayersAsync: getPlayersAsync
};

function getID$1() {
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

var HarbourSDK = {
  player: player,
  context: context,
  payments: payments$2,
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
  debugHeyzap: debugHeyzap,
  getDeviceId: getDeviceId
};
module.exports = HarbourSDK;

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

function logEvent() {
  return null;
}

function onPause(callback) {
  window.onblur = callback;
}

function getInterstitialAdAsync() {
  if (window.HarbourSDK.heyzapInitialized) {
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
  if (window.HarbourSDK.heyzapInitialized) {
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
  if (!window.HarbourSDK.heyzapInitialized) {
    console.error("HarbourSDK: debugHeyzap before init");
  }

  return window.HeyzapAds.showMediationTestSuite();
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

function getDeviceId() {
  if (window.cordova && window.cordova.plugins && window.cordova.plugins.idfa) {
    return new Promise(function (resolve, reject) {
      window.cordova.plugins.idfa.getInfo().then(function (info) {
        resolve(info.idfa || info.aaid);
      }, function (err) {
        reject({
          code: 'NOT_AVAILABLE'
        });
      });
    });
  } else {
    return Promise.reject({
      code: 'NOT_AVAILABLE'
    });
  }
}
//# sourceMappingURL=harbour-cordova-sdk.js.map
