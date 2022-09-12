//import { chromium } from "playwright"
const { chromium } = require('playwright')

const getMatches = async () => {
    const browser = await chromium.launch({ headless: false })
    const page = await browser.newPage()
    const url = 'https://www.ole.com.ar/'

    await page.goto(url)
    console.log("Va a hacer algo")
    const divCounts = await page.$$eval('div', (divs) => {
        console.log("cantidad", divs.length)
        return divs.length
    });
    console.log(divCounts)

}
 
getMatches()