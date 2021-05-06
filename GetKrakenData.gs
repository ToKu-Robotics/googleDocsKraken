
function getCryptoCurr() {
  var cryptos = [
    {
      name: 'Ethereum Classic',
      short: 'ETC',
      krakenName: 'XETC',
      eurResult: 'XETCZEUR',
      inEUR: 0
    },
    {
      name: 'Bitcoin',
      short: 'XBT',
      krakenName: 'XXBTC',
      eurResult: 'XXBTZEUR',
      inEUR: 0
    },
    {
      name: 'Ethereum',
      short: 'ETH',
      krakenName: 'XETH',
      eurResult: 'XETHZEUR',
      inEUR: 0
    },
    {
      name: 'Dogecoin',
      short: 'DOGE',
      krakenName: 'XDG',
      eurResult: 'XDGEUR',
      inEUR: 0
    },
    {
      name: 'Ripple',
      short: 'XRP',
      krakenName: 'XXRP',
      eurResult: 'XXRPZEUR',
      inEUR: 0
    },
    {
      name: 'Litecoin',
      short: 'LTC',
      krakenName: 'XLTC',
      eurResult: 'XLTCZEUR',
      inEUR: 0
    },
    {
      name: 'WAVES',
      short: 'WAVES',
      krakenName: 'WAVES',
      eurResult: 'WAVESEUR',
      inEUR: 0
    },
    {
      name: 'NANO',
      short: 'NANO',
      krakenName: 'NANO',
      eurResult: 'NANOEUR',
      inEUR: 0
    }
  ]
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var newSheet = activeSpreadsheet.getSheetByName("Kurse");
  if (newSheet === null) {
    yourNewSheet = activeSpreadsheet.insertSheet();
    yourNewSheet.setName("Kurse");
  }
  let index = 0;
  cryptos.forEach(currency => {
    index++
    var currencyDetails = UrlFetchApp.fetch(`https://api.kraken.com/0/public/Ticker?pair=${currency.short}EUR`);
    let inEur = JSON.parse(currencyDetails.getContentText());
    
    inEur = inEur.result
    inEur = inEur[currency.eurResult]
    inEur = inEur.a[0].split('.');
    inEur = `${inEur[0]},${inEur[1]}`
    currency.inEUR = inEur
    
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var newSheet = activeSpreadsheet.getSheetByName("Kurse");
    newSheet.getRange(index,1).setValue(currency.name);
    newSheet.getRange(index,2).setValue(currency.inEUR);

    
  })
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Kraken')
      .addItem('Aktualisieren','getCryptoCurr')
      .addToUi();
}

function getShorts() {
  var response = UrlFetchApp.fetch("https://api.kraken.com/0/public/Assets")
  Logger.log(response.getContentText());
}
