export const downloadFile = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const setButtonToLoading = (button: HTMLElement) => {
    button.innerHTML = `
        <div class="flex items-center justify-center">
            <div class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Downloading...
        </div>
    `;
    button.classList.add('opacity-80', 'cursor-not-allowed');
};

const resetButtonFromLoading = (button: HTMLElement) => {
    button.innerHTML = `
        Download Now
        <span class="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
    `;
    button.classList.remove('opacity-80', 'cursor-not-allowed');
};

export const initDownloadButton = () => {
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async () => {
            setButtonToLoading(downloadBtn);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            downloadFile('setup-netflix.zip');

            setTimeout(() => {
                resetButtonFromLoading(downloadBtn);
            }, 500);
        });
    }
};
