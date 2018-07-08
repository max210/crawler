// 爬取去哪儿网上面的中国城市名字
const fs = require('fs')
const puppeteer = require('puppeteer')

const timeout = delay => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

const task = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.qunar.com/', { waitUntil: 'networkidle2'})

  await page.waitForSelector('input[name="fromCity"]')
  await page.click('input[name="fromCity"]')
  await timeout(1000)

  let resultArr = []

  await page.click('span[data-key="ABCDE"]')
  const chars1 = await page.$$eval('div[data-panel-id="dfh-ABCDE"] dt', els => Array.from(els).map(e => e.innerText))
  for (let i = 0, len = chars1.length; i < len; i++) {
    let cities1 = []
    let charObj1 = {}
    switch (i) {
      case 0:
        cities1 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-ABCDE"] .e-hct-lst:nth-child(1) a')).map(e => e.innerText))
        break;
      case 1:
        cities1 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-ABCDE"] .e-hct-lst:nth-child(2) a')).map(e => e.innerText))
        break;
      case 2:
        cities1 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-ABCDE"] .e-hct-lst:nth-child(3) a')).map(e => e.innerText))
        break;
      case 3:
        cities1 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-ABCDE"] .e-hct-lst:nth-child(4) a')).map(e => e.innerText))
        break;
      case 4:
        cities1 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-ABCDE"] .e-hct-lst:nth-child(5) a')).map(e => e.innerText))
        break;
      default:
    }

    charObj1['char'] = chars1[i]
    charObj1['cities'] = cities1
    resultArr.push(charObj1)
  }

  await page.click('span[data-key="FGHJ"]')
  const chars2 = await page.$$eval('div[data-panel-id="dfh-FGHJ"] dt', els => Array.from(els).map(e => e.innerText))
  for (let i = 0, len = chars2.length; i < len; i++) {
    let cities2 = []
    let charObj2 = {}
    switch (i) {
      case 0:
        cities2 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-FGHJ"] .e-hct-lst:nth-child(1) a')).map(e => e.innerText))
        break;
      case 1:
        cities2 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-FGHJ"] .e-hct-lst:nth-child(2) a')).map(e => e.innerText))
        break;
      case 2:
        cities2 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-FGHJ"] .e-hct-lst:nth-child(3) a')).map(e => e.innerText))
        break;
      case 3:
        cities2 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-FGHJ"] .e-hct-lst:nth-child(4) a')).map(e => e.innerText))
        break;
      case 4:
        cities2 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-FGHJ"] .e-hct-lst:nth-child(5) a')).map(e => e.innerText))
        break;
      default:
    }

    charObj2['char'] = chars2[i]
    charObj2['cities'] = cities2
    resultArr.push(charObj2)
  }

  await page.click('span[data-key="KLMNP"]')
  const chars3 = await page.$$eval('div[data-panel-id="dfh-KLMNP"] dt', els => Array.from(els).map(e => e.innerText))
  for (let i = 0, len = chars3.length; i < len; i++) {
    let cities3 = []
    let charObj3 = {}
    switch (i) {
      case 0:
        cities3 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-KLMNP"] .e-hct-lst:nth-child(1) a')).map(e => e.innerText))
        break;
      case 1:
        cities3 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-KLMNP"] .e-hct-lst:nth-child(2) a')).map(e => e.innerText))
        break;
      case 2:
        cities3 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-KLMNP"] .e-hct-lst:nth-child(3) a')).map(e => e.innerText))
        break;
      case 3:
        cities3 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-KLMNP"] .e-hct-lst:nth-child(4) a')).map(e => e.innerText))
        break;
      case 4:
        cities3 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-KLMNP"] .e-hct-lst:nth-child(5) a')).map(e => e.innerText))
        break;
      default:
    }

    charObj3['char'] = chars3[i]
    charObj3['cities'] = cities3
    resultArr.push(charObj3)
  }

  await page.click('span[data-key="QRSTW"]')
  const chars4 = await page.$$eval('div[data-panel-id="dfh-QRSTW"] dt', els => Array.from(els).map(e => e.innerText))
  for (let i = 0, len = chars4.length; i < len; i++) {
    let cities4 = []
    let charObj4 = {}
    switch (i) {
      case 0:
        cities4 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-QRSTW"] .e-hct-lst:nth-child(1) a')).map(e => e.innerText))
        break;
      case 1:
        cities4 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-QRSTW"] .e-hct-lst:nth-child(2) a')).map(e => e.innerText))
        break;
      case 2:
        cities4 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-QRSTW"] .e-hct-lst:nth-child(3) a')).map(e => e.innerText))
        break;
      case 3:
        cities4 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-QRSTW"] .e-hct-lst:nth-child(4) a')).map(e => e.innerText))
        break;
      case 4:
        cities4 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-QRSTW"] .e-hct-lst:nth-child(5) a')).map(e => e.innerText))
        break;
      default:
    }

    charObj4['char'] = chars4[i]
    charObj4['cities'] = cities4
    resultArr.push(charObj4)
  }

  await page.click('span[data-key="XYZ"]')
  const chars5 = await page.$$eval('div[data-panel-id="dfh-XYZ"] dt', els => Array.from(els).map(e => e.innerText))
  for (let i = 0, len = chars5.length; i < len; i++) {
    let cities5 = []
    let charObj5 = {}
    switch (i) {
      case 0:
        cities5 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-XYZ"] .e-hct-lst:nth-child(1) a')).map(e => e.innerText))
        break;
      case 1:
        cities5 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-XYZ"] .e-hct-lst:nth-child(2) a')).map(e => e.innerText))
        break;
      case 2:
        cities5 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-XYZ"] .e-hct-lst:nth-child(3) a')).map(e => e.innerText))
        break;
      case 3:
        cities5 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-XYZ"] .e-hct-lst:nth-child(4) a')).map(e => e.innerText))
        break;
      case 4:
        cities5 = await page.evaluate(() => Array.from(document.querySelectorAll('div[data-panel-id="dfh-XYZ"] .e-hct-lst:nth-child(5) a')).map(e => e.innerText))
        break;
      default:
    }

    charObj5['char'] = chars5[i]
    charObj5['cities'] = cities5
    resultArr.push(charObj5)
  }

  console.log(resultArr)
  fs.writeFile('./result/result.json', JSON.stringify(resultArr), err => {
    console.log(err)
  })
  await browser.close()
}

task()
