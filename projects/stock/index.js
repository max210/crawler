// 爬取股价

const puppeteer = require('puppeteer')

const URL = 'http://quote.cfi.cn/'
const companyList = [
  {
    id: '600741',
    name: '华域汽车',
    targetPrice: 27
  },
  {
    id: '002508',
    name: '老板电器',
    targetPrice: 30
  },
  {
    id: '600585',
    name: '海螺水泥',
    targetPrice: 43
  }
]

async function task() {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(URL, { waitUntil: 'networkidle2' })
    await page.waitFor('#searchcode')

    let result = ''
    for (let i = 0; i < companyList.length; i++) {
      await page.type('#searchcode', companyList[i].id, { delay: 100 })
      await page.click('#submit')
      await page.waitFor('#last')
      const price = await page.$eval('#last', el => el.innerText)
      result += `
        ${companyList[i].name}（${companyList[i].targetPrice}） 现价：${price && price.slice(0, -1)}
      `
    }

    console.log(result)
    await browser.close()  //关闭browser实例
  } catch (e) {
    console.log('err', e)
  }
}

task()
