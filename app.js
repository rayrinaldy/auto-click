const puppeteer = require('puppeteer');

let productsUrl = [
    'https://www.tokopedia.com/hakama/t-shirt-origami-wado-navy-m',
    'https://www.tokopedia.com/hakama/t-shirt-koike-twelve-12-putih-m',
    'https://www.tokopedia.com/hakama/t-shirt-daruma-musketeers-putih-m',
    'https://www.tokopedia.com/hakama/t-shirt-blue-hokusai-putih-m',
    'https://www.tokopedia.com/hakama/t-shirt-tonbo-secrets-hitam-m',
    'https://www.tokopedia.com/hakama/t-shirt-golden-hokusai-abu-abu-m',
    'https://www.tokopedia.com/hakama/t-shirt-daruma-kaze-hitam-m',
    'https://www.tokopedia.com/hakama/t-shirt-golden-daruma-navy-m',
    'https://www.tokopedia.com/hakama/t-shirt-kakusareta-daruma-putih-m'
];

(async () => {

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.tokopedia.com/login', {
        waitUntil: 'load'
    });

    await page.type('#email', 'hakamaclothing@gmail.com');
    await page.type('#password', 'abcDE123@');
    await page.click('#login-submit');

    await page.waitForNavigation({ waitUntil: 'load' });

    for (let i = 0; i < productsUrl.length; i++) {
        const url = productsUrl[i];

        await page.goto(`${url}`);

        try {
            await page.waitForSelector('.rvm-button-promo');
            await page.click('.rvm-button-promo');
        } catch (error) {
            console.log('no selectors found');
        }

        console.log(url, 'url done')
    }

    // await page.goto(productsUrl[1], {
    //     waitUntil: 'load'
    // });

    // try {
    //     await page.waitForSelector('.rvm-button-promo');
    //     await page.click('.rvm-button-promo');
    // } catch (error) {
    //     console.log('no selectors found');
    // }

    // await page.screenshot({ path: './screenshot.jpg' });

    // browser.close();

})();