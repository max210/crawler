// 爬取股价
const puppeteer = require('puppeteer')
const schedule = require('node-schedule')
const axios = require('axios')
const companyList = require('./companyConfig')

const INDEX_URL = 'http://finance.sina.com.cn/realstock/company/sh000001/nc.shtml'
const NOTICE_URL = 'https://oapi.dingtalk.com/robot/send?access_token=2d15d060f3251d9b25de2c4dae05be3ca6ec4a11718a0cc048490f127cde3e00'

const scheduleJobRule = { dayOfWeek: [new schedule.Range(1, 5)], hour: 14, minute: 0, second: 0 }
const MAX_RETRY_TIME = 5
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

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

async function task() {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()
    await page.goto(INDEX_URL, { waitUntil: 'networkidle2' })
    await page.waitForSelector('#price', { timeout: 60000, visible: true })
    await page.waitForSelector('#changeP', { timeout: 60000, visible: true })
    const indexPrice = await page.$eval('#price', el => el.innerText)
    const upOrDown = await page.$eval('#changeP', el => el.innerText)
    const title = `上证：${indexPrice} ${upOrDown.slice(0, 1)}`

    let result = ''
    for (let i = 0; i < companyList.length; i++) {
      await page.type('#suggest_top', companyList[i].id, { delay: 100 })
      await page.keyboard.down('Enter')
      await page.waitForSelector('#price', { timeout: 60000, visible: true })
      await page.waitForSelector('#changeP', { timeout: 60000, visible: true })
      await sleep(2000)
      const price = await page.$eval('#price', el => el.innerText)
      const upOrDown = await page.$eval('#changeP', el => el.innerText)
      result += `
${companyList[i].name}${companyList[i].targetPrice}  现价: ${price && price.slice(0, -1)} ${upOrDown.slice(0, 1)}`
    }

    result = `${title} ${result}`

    sendMessage(result)
    await browser.close()  //关闭browser实例
    retryTime = 0
  } catch (e) {
    if (retryTime < MAX_RETRY_TIME) {
      retryTime += 1
      await browser.close()
      task()
    } else {
      sendMessage('获取失败')
    }
  }
}

schedule.scheduleJob(scheduleJobRule, task)
