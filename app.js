const puppeteer = require('puppeteer');
const cron = require('node-cron');
const config = require('./config');

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

const makeRequest = async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://www.tokopedia.com/login', {
        waitUntil: 'load'
    });

    console.log('login page loaded')

    await page.type('#email', config.hakama.username);
    await page.type('#password', config.hakama.password);
    await page.click('#login-submit');

    console.log('logged in to Tokopedia')

    await page.waitForNavigation({
        waitUntil: 'load'
    });

    for (let i = 0; i < productsUrl.length; i++) {
        const url = productsUrl[i];

        await page.goto(`${url}`);

        try {
            await page.waitForSelector('.rvm-button-promo');
            await page.click('.rvm-button-promo');
        } catch (error) {
            console.log('no selectors found');
        }

        console.log(url, 'is done')
    }

    browser.close();
}

cron.schedule('15 * * * *', () => {
    console.log('Running task...');
    makeRequest();
});


// (async () => {

//     // const browser = await puppeteer.launch({
//     //     headless: false,
//     // });
//     const browser = await puppeteer.launch({
//         args: ['--no-sandbox', '--disable-setuid-sandbox']
//     });
//     const page = await browser.newPage();
//     await page.goto('https://www.tokopedia.com/login', {
//         waitUntil: 'load'
//     });

//     console.log('login page loaded')

//     await page.type('#email', config.hakama.username);
//     await page.type('#password', config.hakama.password);
//     await page.click('#login-submit');

//     console.log('logged in to Tokopedia')

//     await page.waitForNavigation({ waitUntil: 'load' });

//     for (let i = 0; i < productsUrl.length; i++) {
//         const url = productsUrl[i];

//         await page.goto(`${url}`);

//         try {
//             await page.waitForSelector('.rvm-button-promo');
//             await page.click('.rvm-button-promo');
//         } catch (error) {
//             console.log('no selectors found');
//         }

//         console.log(url, 'is done')
//     }

//     browser.close();

//     // await page.goto('https://www.tokopedia.com/otakotakselaras/otak-otak-selaras-otak-otak-pandu-asli-bandung');

//     // try {
//     //     await page.waitForSelector('.rvm-button-promo');
//     //     await page.click('.rvm-button-promo');
//     // } catch (error) {
//     //     console.log('no selectors found');
//     // }

//     // browser.close();

// })();