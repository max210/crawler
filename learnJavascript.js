//爬取阮一峰老师的《JavaScript 标准参考教程（alpha）》生成pdf文件，仅供学习用，如有侵权或造成不便，请联系～

const puppeteer = require('puppeteer')

// 设定一个延迟函数
function timeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

;(async () => {
  const browser = await puppeteer.launch()  //生成一个浏览器实例
  const page = await browser.newPage()  //生成一个页面
  await page.goto('http://javascript.ruanyifeng.com/', {waitUntil: 'networkidle2'})
  await page.waitForSelector('a')  //待页面加载了a标签再往下执行

  let indexPage = await page.evaluate(() => {
    let $ = window.$  //在console中看到有jquery，所以偷懒用jquery选择元素
    let items = $('.columns > ul li a')  //用jquery取出a标签
    let itemsList = Array.prototype.slice.call(items)  //转化为一个真正的数组

    return itemsList.map(item => {  //返回一个新数组
      return {
        name: item.innerText,
        href: item.href
      }
    })
  })

  // 遍历生成的新数组，依次打印这些页面，可能有点慢
  for (var i = 0; i < 4; i++) {
    const page = await browser.newPage()
    await page.goto(`${indexPage[i].href}`, {waitUntil: 'networkidle2'})
    await timeout(2000)  //以防页面加载不好，延迟2s
    await page.pdf({path: `./${indexPage[i].name}.pdf`})  //生产对应名称的pdf文件
  }

  await browser.close()  //关闭browser实例
})()
