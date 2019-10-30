// 爬取股价

const puppeteer = require('puppeteer')
const schedule = require('node-schedule')
const axios = require('axios')

const URL = 'http://quote.cfi.cn/'
const NOTICE_URL = 'https://oapi.dingtalk.com/robot/send?access_token=2d15d060f3251d9b25de2c4dae05be3ca6ec4a11718a0cc048490f127cde3e00'
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
const scheduleJobRule = { hour: 14, minute: 0, second: 0 }
const MAX_RETRY_TIME = 2
let retryTime = 0

function sendMessage(message) {
  axios.post(NOTICE_URL, {
    msgtype: 'text',
    text: {
      content: `通知：${message}`
    }
  })
  .catch(console.log)
}

async function task() {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(URL, { waitUntil: 'networkidle2' })
    await page.waitForSelector('#searchcode', { timeout: 60000, visible: true })

    let result = ''
    for (let i = 0; i < companyList.length; i++) {
      await page.type('#searchcode', companyList[i].id, { delay: 100 })
      await page.click('#submit')
      await page.waitForSelector('#last', { timeout: 60000, visible: true })
      const price = await page.$eval('#last', el => el.innerText)
      result += `
${companyList[i].name}（${companyList[i].targetPrice}） 现价：${price && price.slice(0, -1)}`
    }

    sendMessage(result)
    await browser.close()  //关闭browser实例
    retryTime = 0
  } catch (e) {
    if (retryTime < MAX_RETRY_TIME) {
      retryTime += 1
      task()
    } else {
      sendMessage('获取失败')
    }
  }
}

schedule.scheduleJob(scheduleJobRule, task)
