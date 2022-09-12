//import { chromium } from "playwright"
const { chromium } = require('playwright')

const checkResult = async () => {
    const browser = await chromium.launch({headless:false})
    const page = await browser.newPage()
    const url = 'https://www.livescore.com/en/football/argentina/primera-division/boca-juniors-vs-river-plate/766543/'

    let hasStarted = false
    let result = ""

    const resultInterval = setInterval(async () => {
        await page.goto(url)

        let scoreOrTime = await page.textContent('#score-or-time')
        let matchStatus = await page.textContent("#SEV__status")

        if (!hasStarted) {
            hasStarted = scoreOrTime.includes("17:00") === false
            if (hasStarted) console.log("The match has started")
            else console.log("Still waiting...")
        }
        else {
            const notChangeResult = scoreOrTime === result
            if (!notChangeResult) {
                result = scoreOrTime
                console.log("⚽ Gol!!!   -   New score", result)
            }
        }

        if (matchStatus === "Full Time") clearInterval(resultInterval)

    }, 60000)
}

checkResult()