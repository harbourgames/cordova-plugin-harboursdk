
import * as iap_ios from './iap_ios.js';

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
