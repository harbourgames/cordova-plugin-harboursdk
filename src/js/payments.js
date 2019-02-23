
import * as iap_ios from './iap_ios.js';
import * as iap_android from './iap_android.js';

export const payments = {
  init,
  onReady,
  getCatalogAsync,
  purchaseAsync,
  consumePurchaseAsync,
};

function init(params) {
  if (window.cordova.platformId === 'ios') {
    Object.assign(payments,iap_ios.payments);
    iap_ios.payments.init(params);
  } else if (window.cordova.platformId === 'android') {
    Object.assign(payments,iap_android.payments);
    iap_android.payments.init(params);
  }
}
function onReady() {
}
function getCatalogAsync() {
  return Promise.reject('not_implemented');
}
function purchaseAsync() {
  return Promise.reject('not_implemented');
}
function consumePurchaseAsync() {
  return Promise.reject('not_implemented');
}
