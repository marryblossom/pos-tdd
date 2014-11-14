function getProduct(barcode) {
  var allItems = loadAllItems();
  for (var product in allItems) {
    if (barcode == allItems[product].barcode) {
      return allItems[product];
    }
  }
}

function formatPrint(price) {
  return price.toFixed(2);
}

 //Use to split input item which has '-'.
  function splitItem(item) {
     var addItem = {
       barcode: '',
       num: 0,
     };
    var strs = item.split('-');
    addItem.barcode = strs[0];
    addItem.num = !strs[1] ? 1 : Number(strs[1]);
    return addItem;
  }


function calculatorTotle(barcode, num) {
    switch (getPromotion(barcode)) {
      case 'BUY_TWO_GET_ONE_FREE':
        var freeNum = promotionB2G1F(num);
        return getProduct(barcode).price * (num - freeNum);
      default:
        return getProduct(barcode).price * num;

    }
}

function calculatorFree(barcode, num) {
    switch (getPromotion(barcode)) {
      case 'BUY_TWO_GET_ONE_FREE':
        var freeNum = promotionB2G1F(num);
        return getProduct(barcode).price * (freeNum);
      default:
        return getProduct(barcode).price * 0;
    }
  }

  function countFreeNum(barcode, num) {
    switch (getPromotion(barcode)) {
      case 'BUY_TWO_GET_ONE_FREE':
        return promotionB2G1F(num);
      default:
        return 0;
    }
  }

  function getPromotion(barcode) {
    var promotions = loadPromotions();
    for (var promotion in promotions) {
      return isInPromotion(promotions[promotion], barcode);
    }
    return null;
  }

  function isInPromotion(promotion, barcode) {
    for (var i = 0; i < promotion.barcodes.length; i++) {
      if (barcode == promotion.barcodes[i]) {
        return promotion.type;
      }
    }
  }

  function promotionB2G1F(num) {
    return Math.floor(num / 3);
  }

function printInventory(inputs) {
  var list = new HashMap();
  for (var input in inputs) {
    var item = splitItem(inputs[input]);
    !list.containsKey(item.barcode) ?
      list.put(item.barcode, item.num) :
      list.modify(item.barcode, item.num);
  }
  var result = '***<没钱赚商店>购物清单***\n';
  var keySet = list.keySet();
  for (var i in keySet) {
    result += '名称：' + getProduct(keySet[i]).name + '，数量：' +
    list.get(keySet[i]) + getProduct(keySet[i]).unit + '，单价：' +
    formatPrint(getProduct(keySet[i]).price) + '(元)，小计：' +
    formatPrint(calculatorTotle(keySet[i], list.get(keySet[i]))) + '(元)\n';
  }
  result += '----------------------\n' + '挥泪赠送商品：\n';
  for (var i in keySet) {
    if (getPromotion(keySet[i]) != null) {
      result += '名称：' + getProduct(keySet[i]).name + '，数量：' +
      countFreeNum(keySet[i], list.get(keySet[i])) + getProduct(keySet[i]).unit + '\n';
    }
  }
  result += '----------------------\n';
  var sum = 0;
  for (var i in keySet) {
    sum += calculatorTotle(keySet[i], list.get(keySet[i]));
  }
  result += '总计：' + formatPrint(sum) + '(元)\n';
  var freeSum = 0;
  for (var i in keySet) {
    if (getPromotion(keySet[i]) != null) {
      freeSum += calculatorFree(keySet[i], list.get(keySet[i]));
    }
  }
  result += '节省：' + formatPrint(freeSum) + '(元)\n';
  result += '**********************';
  console.log(result);
}
