import bgLarge from '@/assets/image/bg_large.jpg';
import bgMedium from '@/assets/image/bg_medium.jpg';
import bgSmall from '@/assets/image/bg_small.jpg';
import netflixLogo from '@/assets/image/netflix-logo';
import { initDownloadButton } from '@/utils/download';

const section1 = /* HTML */ `
    <section class="relative min-h-screen w-full bg-black">
        <header class="absolute left-0 right-0 top-0 z-20">
            <div
                class="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8"
            >
                <div class="flex-1">${netflixLogo}</div>
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <button
                            class="flex items-center gap-2 rounded border border-white/30 bg-black/30 px-4 py-1 text-sm text-white"
                        >
                            English &#9662;
                        </button>
                    </div>
                    <button
                        class="rounded bg-red-600 px-4 py-1 font-medium text-white hover:bg-red-700"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </header>

        <picture class="absolute inset-0">
            <source media="(max-width: 640px)" srcset="${bgSmall}" />
            <source media="(max-width: 1024px)" srcset="${bgMedium}" />
            <img
                src="${bgLarge}"
                alt=""
                class="h-full w-full object-cover brightness-75"
            />
        </picture>
        <div
            class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black"
        ></div>

        <div
            class="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center text-white"
        >
            <div class="max-w-3xl">
                <h1 class="mb-4 text-3xl font-bold sm:text-5xl">
                    Your Entertainment Universe Awaits
                </h1>
                <p class="mb-3 text-lg font-medium sm:text-2xl">
                    Stream exclusive shows, blockbuster movies, and more
                </p>
                <p class="mb-8 text-base sm:text-xl">
                    Download our app now and unlock a
                    <span class="font-bold text-red-500"
                        >30 days of premium access</span
                    >
                    — absolutely free!
                </p>

                <div class="mx-auto flex max-w-xl justify-center">
                    <button
                        id="downloadBtn"
                        class="group flex items-center justify-center rounded bg-red-600 px-8 py-3 font-semibold transition-all hover:bg-red-700"
                    >
                        Download Now
                        <span
                            class="ml-1 transition-transform group-hover:translate-x-1"
                            >&rarr;</span
                        >
                    </button>
                </div>
            </div>
        </div>
    </section>
`;

export default section1;
export { initDownloadButton };
