// 爬取豆瓣电影上近期热门电影前60名电影预告片

const puppeteer = require('puppeteer')
const fs = require('fs')

const host = 'https://movie.douban.com/explore#!type=movie&tag=热门&sort=recommend&page_limit=20&page_start=0'

function timeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(host, { waitUntil: 'networkidle2' })
  await page.waitForSelector('.more')

  await page.click('.more')
  await timeout(2000)
  await page.click('.more')
  await timeout(2000)

  const links = await page.$$eval('.item', els => Array.from(els).map(e => e.href))
  const titles = await page.$$eval('.item p', els => Array.from(els).map(e => e.innerText))

  let result = []

  if (links.length === titles.length) {
    for (let i = 0; i < links.length; i++) {
      let videoLink = ''

      const page = await browser.newPage()
      await page.goto(links[i], { waitUntil: 'networkidle2' })
      timeout(2000)
      try {
        videoLink = await page.$eval('.related-pic-video', e => e.href)
      } catch (e) {
        videoLink = '暂无预告片'
      }
      console.log(videoLink)

      result.push({
        title: titles[i],
        videoLink: videoLink
      })
    }
  }

  fs.writeFile('./result/trailer.json', JSON.stringify(result), (err) => {
    console.log(err)
  })

  browser.close()

})()
