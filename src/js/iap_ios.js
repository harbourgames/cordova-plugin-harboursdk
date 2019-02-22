
export const payments = {
  init,
  onReady,
  getCatalogAsync,
  purchaseAsync,
  consumePurchaseAsync,
};

const ERROR_MAP = {
  '6777006': { code: 'USER_INPUT' },
};

let g_storeKit;
let g_ready = false;
const g_readyList = [];

let g_skuList;
let g_productList;

let g_purchaseDone;

function init(opts) {
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
    restoreCompleted: _onRestoreCompleted,
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
  const { productID } = params;
  const product = g_productList.find(product => product.productID === productID);
  if (product) {
    g_storeKit.purchase(productID,1);
    return new Promise((resolve,reject) => {
      g_purchaseDone = (err,purchase) => {
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
  g_storeKit.load(g_skuList,valid_list => {
    g_productList = valid_list.map(_transformProduct);
    g_ready = true;
    g_readyList.forEach(cb => cb());
    g_readyList.length = 0;
  },err => {
    console.error("HarbourSDK.iap_ios: load error:",err);
  });
}
function _transformProduct(product) {
  return {
    title: product.title,
    productID: product.id,
    description: product.description,
    imageURL: null,
    price: product.price,
    priceCurrencyCode: product.currency,
  };
}

function _onPurchasing(product_id) {
  const transaction_id = g_storeKit.transactionForProduct[product_id];
  if (transaction_id) {
    _onPurchase(transaction_id,product_id);
  }
}
function _onPurchase(transaction_id,product_id) {
  if (product_id && transaction_id) {
    // store and localstorage, because the kit doesnt
    g_storeKit.transactionForProduct[product_id] = transaction_id;
    window.localStorage.sk_transactionForProduct = JSON.stringify(g_storeKit.transactionForProduct);
  }

  const receipt_b64 = g_storeKit.receiptForTransaction[transaction_id];
  if (g_purchaseDone && transaction_id && receipt_b64) {
    let is_sandbox = false;
    try {
      const receipt = atob(receipt_b64);
      is_sandbox = receipt && receipt.indexOf('"environment" = "Sandbox"') !== -1;
    } catch (e) {
      // noop
    }
    const data = {
      signedRequest: receipt_b64,
      purchaseToken: transaction_id,
      paymentID: transaction_id,
      productID: product_id,
      storeType: 'itunes',
      isSandbox: is_sandbox,
    };
    g_purchaseDone(null,data);
    g_purchaseDone = null;
  }
}
function _onPurchaseEnqueued() {
  //console.log("onPurchaseEnqueued:",product_id);
}
function _onFinish(transaction_id,product_id) {
  if (g_storeKit.transactionForProduct[product_id] === transaction_id) {
    delete g_storeKit.transactionForProduct[product_id];
    window.localStorage.sk_transactionForProduct = JSON.stringify(g_storeKit.transactionForProduct);
  }
}
function _onRestore() {
  //console.log("onRestore:",product_id);
}
function _onReceiptsRefreshed() {
  //console.log("onReceiptsRefreshed:",product_id);
}
function _onRestoreFailed() {
  //console.log("onRestoreFailed:",err);
}
function _onRestoreCompleted() {
  //console.log("onRestoreCompleted:",product_id);
}
