const fs = require('fs')
const puppeteer = require('puppeteer')
const xlsx = require('node-xlsx')
const { sleep, autoScroll } = require('../../utils')

const INDEX_URL = ''

async function task() {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()
    await page.goto(INDEX_URL, { waitUntil: 'networkidle2' })
    await page.setViewport({ width: 1200, height: 800 })
    await autoScroll(page)
    await sleep(3000)
    const data = await page.evaluate(() => Array.from(document.getElementsByTagName('a')).map(item => ([item.innerText, item.href])))
    const buffer = xlsx.build([{ name: 'sheet1', data }]) // Returns a buffer
    fs.writeFile('./文件.xlsx', new Uint8Array(buffer), err => {
      if (err) throw err
      console.log('文件已被保存')
    })
    browser.close()
  } catch (e) {
    console.log('e', e)
  }
}

task()
