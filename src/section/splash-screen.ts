import splashImage from '@/assets/image/logo.webp';

const splashScreen = /* HTML */ `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <style>
            @keyframes netflix-logo-appear {
                0% {
                    transform: scale(0.2);
                    opacity: 0;
                    filter: blur(10px);
                }
                100% {
                    transform: scale(0.8);
                    opacity: 1;
                    filter: blur(0);
                }
            }

            @keyframes netflix-logo-pulse {
                0%,
                100% {
                    filter: drop-shadow(0 0 10px rgba(229, 9, 20, 0.5));
                }
                50% {
                    filter: drop-shadow(0 0 25px rgba(229, 9, 20, 0.8));
                }
            }

            @keyframes netflix-glow-pulse {
                0%,
                100% {
                    transform: scale(1.5);
                    opacity: 0.5;
                }
                50% {
                    transform: scale(1.8);
                    opacity: 0.9;
                }
            }

            @keyframes netflix-logo-zoom-out {
                0% {
                    transform: scale(0.8);
                    opacity: 1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }

            .netflix-logo {
                animation:
                    netflix-logo-appear 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)
                        forwards,
                    netflix-logo-pulse 3s ease-in-out infinite;
            }

            .netflix-glow {
                animation: netflix-glow-pulse 3s ease-in-out infinite;
                border-radius: 50%;
                background: radial-gradient(
                    circle,
                    rgba(229, 9, 20, 0.3) 0%,
                    rgba(229, 9, 20, 0) 80%
                );
                aspect-ratio: 1/1;
            }

            .zoom-out {
                animation: netflix-logo-zoom-out 0.8s
                    cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
        </style>
        <div
            id="netflix-loader"
            class="netflix-loader relative flex flex-col items-center justify-center"
        >
            <div class="absolute inset-0 flex items-center justify-center">
                <div
                    class="netflix-glow relative h-[300px] w-[300px] rounded-full"
                ></div>
            </div>
            <div
                class="netflix-logo relative z-10 flex h-[150px] w-[150px] items-center justify-center opacity-0"
            >
                <img
                    src="${splashImage}"
                    alt="Netflix"
                    class="h-full w-full object-contain"
                />
            </div>
        </div>

        <div
            class="fixed bottom-8 left-0 right-0 flex items-center justify-center text-white/70"
        >
            <span class="font-medium">LOADING</span>
            <div
                class="ml-2 h-4 w-4 animate-spin rounded-full border-[3px] border-white/30 border-t-white [animation-duration:1.2s]"
            ></div>
        </div>
    </div>
`;

export default splashScreen;
