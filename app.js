const puppeteer = require('puppeteer');
const cron = require('node-cron');
const config = require('./config');

let productsUrl = [
    'https: //www.tokopedia.com/hakama/t-shirt-motif-jepang-kaos-distro-premium-kakusareta-daruma-by-hakama-99d3',
    'https: //www.tokopedia.com/hakama/t-shirt-motif-jepang-kaos-distro-premium-golden-daruma-by-hakama-d3d4',
    'https: //www.tokopedia.com/hakama/t-shirt-motif-jepang-kaos-distro-premium-daruma-kaze-by-hakama-bd63',
    'https: //www.tokopedia.com/hakama/t-shirt-motif-jepang-kaos-distro-premium-tonbo-secrets-by-hakama-87c2',
    'https: //www.tokopedia.com/hakama/t-shirt-motif-jepang-kaos-distro-premium-koike-twelve-by-hakama-28a1',
    'https: //www.tokopedia.com/hakama/t-shirt-motif-jepang-kaos-distro-premium-origami-wado-by-hakama-navy-l',
    'https: //www.tokopedia.com/hakama/t-shirt-motif-jepang-kaos-distro-premium-daruma-musketeers-by-hakama-putih-l',
    'https: //www.tokopedia.com/hakama/t-shirt-motif-premium-kaos-distro-premium-blue-hokusai-by-hakama-putih-m',
    'https: //www.tokopedia.com/hakama/t-shirt-motif-jepang-kaos-distro-premium-golden-hokusai-by-hakama-abu-abu-m',
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

cron.schedule('20 * * * *', () => {
    const now = new Date();
    console.log('=======================================')
    console.log('Running task at ' + now);
    promote();
});