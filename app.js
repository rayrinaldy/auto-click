const puppeteer = require('puppeteer');
const cron = require('node-cron');
const config = require('./config');
const now = new Date();

let productsUrl = [
    'https://www.tokopedia.com/hakama/t-shirt-kaos-baju-origami-wado-by-hakama-navy-m',
    'https://www.tokopedia.com/hakama/t-shirt-kaos-baju-koike-twelve-12-by-hakama-putih-m',
    'https://www.tokopedia.com/hakama/t-shirt-kaos-baju-daruma-musketeers-by-hakama-putih-m',
    'https://www.tokopedia.com/hakama/t-shirt-kaos-baju-blue-hokusai-by-hakama-putih-m',
    'https://www.tokopedia.com/hakama/t-shirt-kaos-baju-tonbo-secrets-by-hakama-abu-abu-m',
    'https://www.tokopedia.com/hakama/t-shirt-kaos-baju-golden-hokusai-by-hakama-abu-abu-m',
    'https://www.tokopedia.com/hakama/t-shirt-kaos-baju-daruma-kaze-by-hakama-hitam-m',
    'https://www.tokopedia.com/hakama/t-shirt-kaos-baju-golden-daruma-by-hakama-navy-m',
    'https://www.tokopedia.com/hakama/t-shirt-kaos-baju-kakusareta-daruma-by-hakama-putih-m'
];

let otakotakUrl = [
    'https://www.tokopedia.com/otakotakselaras/otak-otak-selaras-otak-otak-pandu-asli-bandung'
]

const promoteHakama = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.tokopedia.com/login', {
        waitUntil: 'load'
    });

    console.log('login page loaded')

    await page.type('#email', config.hakama.username);
    await page.type('#password', config.hakama.password);
    await page.click('#login-submit');

    console.log('Hakama logged in to Tokopedia')

    await page.waitForNavigation({
        waitUntil: 'networkidle2',
    });

    for (let i = 0; i < productsUrl.length; i++) {
        const url = productsUrl[i];

        await page.goto(`${url}`, {
            waitUntil: 'networkidle2',
            timeout: 0
        });

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

const promoteOtakOtak = async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto('https://www.tokopedia.com/login', {
        waitUntil: 'load'
    });

    console.log('login page loaded')

    await page.type('#email', config.otakotak.username);
    await page.type('#password', config.otakotak.password);
    await page.click('#login-submit');

    console.log('Otak Otak Selaras logged in to Tokopedia')

    await page.waitForNavigation({
        waitUntil: 'networkidle2',
    });

   for (let i = 0; i < otakotakUrl.length; i++) {
       const url = otakotakUrl[i];

       await page.goto(`${url}`, {
            waitUntil: 'networkidle2',
            timeout: 0
        });

       try {
           await page.waitForSelector('.rvm-button-promo');
           await page.click('.rvm-button-promo');
       } catch (error) {
           console.log('no selectors found');
       }

       console.log(url, 'promote completed')
   }

    browser.close();
}

const promote = async() => {
    await promoteHakama();
    await console.log('---------------------------------')
    await promoteOtakOtak();
}

cron.schedule('6 * * * *', () => {
    console.log('=======================================')
    console.log('Running task at' + now);
    promote();
});