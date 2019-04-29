import * as puppeteer from 'puppeteer';

export async function getVillainImage(name: string): Promise<string> {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.google.com");
    
    await page.waitForSelector(
        "#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input"
    );
    await page.click(
        "#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input"
    );

    await page.keyboard.type(name);
    await page.evaluate(() => {
        const submitButton: any = document.querySelector(
            "#tsf > div:nth-child(2) > div > div.UUbT9 > div.aajZCb > div > center > input[type=submit]:nth-child(1)"
        );
        submitButton.click();
    });

    // 이미지 탭 클릭
    await page.waitForSelector("#hdtb-msb-vis > div:nth-child(2) > a");
    await page.click("#hdtb-msb-vis > div:nth-child(2) > a");
    // 첫번째 사진 클릭
    await page.waitForSelector("#rg_s > div:nth-child(2) > a");
    await page.click("#rg_s > div:nth-child(2) > a");
    // 이미지의 url 따오기
    await page.waitForSelector(
        "#irc_cc > div:nth-child(2) > div.irc_t.i30052 > div.irc_mic > div.irc_mimg.irc_hic > a > img[src]"
    );
    const result = await page.$eval(
        "#irc_cc > div:nth-child(2) > div.irc_t.i30052 > div.irc_mic > div.irc_mimg.irc_hic > a > img",
        el => {
            return el.getAttribute("src");
        }
    );

    await browser.close();

    return result;
}