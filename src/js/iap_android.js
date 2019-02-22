
export const payments = {
  init,
  onReady,
  getCatalogAsync,
  purchaseAsync,
  consumePurchaseAsync,
};

let g_inappbilling;
let g_ready = false;
const g_readyList = [];
const g_tokenToProductMap = {};

function init() {
  g_inappbilling = window.inappbilling;

  const opts = {};
  const skus = [];
  g_inappbilling.init(() => {
    g_ready = true;
    g_readyList.forEach(cb => cb());
  },err => {
    console.error("iap_android init err:",err);
  },opts,skus);
}
function onReady(done) {
  if (g_ready) {
    done();
  } else {
    g_readyList.push(done);
  }
}
function getCatalogAsync() {
  return new Promise((resolve,reject) => {
    g_inappbilling.getAvailableProducts(list => {
      resolve(list);
    },err => {
      reject(err);
    });
  });
}

function purchaseAsync(params) {
  const { productID, developerPayload } = params;

  return new Promise((resolve,reject) => {
    g_inappbilling.buy(purchase => {
      resolve(_transformPurchase(purchase));
    },err => {
      if (typeof err === 'string' && err.indexOf('response: 7:Error') !== -1) {
        _getOwnedPurchase(productID,(err,purchase) => {
          if (err) {
            console.error("buy second err:",err);
          } else {
            resolve(_transformPurchase(purchase));
          }
        });
      } else {
        console.error("buy err:",err);
        reject(err);
      }
    },productID,developerPayload);
  });
}
function consumePurchaseAsync(purchase_token) {
  return new Promise((resolve,reject) => {
    const product_id = g_tokenToProductMap[purchase_token];
    g_inappbilling.consumePurchase(() => {
      resolve();
    },err => {
      console.error("consumePurchase err:",err);
      reject(err);
    },product_id,purchase_token);
  });
}

function _transformPurchase(purchase) {
  const { purchaseToken, productId } = purchase;
  g_tokenToProductMap[purchaseToken] = productId;

  return {
    purchaseToken,
    paymentID: purchase.orderId,
    productID: productId,
    storeType: 'play',
    isSandbox: true,
    purchaseTime: purchase.purchaseTime,
    playReceipt: purchase.receipt,
    playSignature: purchase.signature,
    playPurchaseState: purchase.purchaseState,
  };
}

function _getOwnedPurchase(product_id,done) {
  g_inappbilling.getPurchases(list => {
    const purchase = list.find(item => item.productId === product_id);
    if (purchase) {
      done(null,purchase);
    } else {
      done('failed_get_owned');
    }
  },err => {
    console.error("_getOwnedPurchase: err:",err);
    done(err);
  });
}
