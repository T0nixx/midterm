import * as puppeteer from "puppeteer";

export async function getVillainImage(name: string): Promise<string> {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--window-size=1920,1080"]
    });
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
    await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    if (await page.$("#irc_cc")) {
        await page.waitForSelector(
            "#irc_cc > div:nth-child(2) > div.irc_t.i30052 > div.irc_mic > div.irc_mimg.irc_hic > a > img[src]"
        );
    }

    if (await page.$("#irc-ss")) {
        await page.waitForSelector(
            "#irc-ss > div:nth-child(3) > div.irc_t.i30052 > div.irc_mic > div.irc_mimg.irc_hic > a > div > img[src]"
        );
    }

    const result = await page.evaluate(() => {
        if (document.querySelector("#irc_cc")) {
            const ATypeImage = document.querySelector(
                "#irc_cc > div:nth-child(2) > div.irc_t.i30052 > div.irc_mic > div.irc_mimg.irc_hic > a > img"
            );
            return ATypeImage.getAttribute("src");
        }
        const BTypeImage = document.querySelector(
            "#irc-ss > div:nth-child(3) > div.irc_t.i30052 > div.irc_mic > div.irc_mimg.irc_hic > a > div > img"
        );

        return BTypeImage.getAttribute("src");
    });

    await browser.close();

    return result;
}
