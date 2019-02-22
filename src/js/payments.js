
import * as iap_ios from './iap_ios.js';
import * as iap_android from './iap_android.js';

export let payments;

const default_payments = {
  init,
  onReady,
  getCatalogAsync,
  purchaseAsync,
  consumePurchaseAsync,
};

if (window.cordova.platformId === 'ios') {
  payments = iap_ios.payments;
} else if (window.cordova.platformId === 'android') {
  payments = iap_android.payments;
} else {
  payments = default_payments;
}

function init() {
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
