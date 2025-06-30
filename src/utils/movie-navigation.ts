import type { Movie } from '@/types/movie';

class MovieNavigation {
    private currentIndex = 0;
    private readonly itemsPerView = 5;
    private readonly movies: Movie[];
    private container: HTMLElement | null = null;
    private prevBtn: HTMLElement | null = null;
    private nextBtn: HTMLElement | null = null;

    constructor(movies: Movie[]) {
        this.movies = movies;
    }

    init(): void {
        this.container = document.getElementById('movie-container');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');

        if (!this.container || !this.prevBtn || !this.nextBtn) {
            console.log('movie navigation elements not found');
            return;
        }

        this.setupEventListeners();
        this.updateButtons();
    }

    private setupEventListeners(): void {
        this.prevBtn?.addEventListener('click', () => this.previous());
        this.nextBtn?.addEventListener('click', () => this.next());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previous();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.next();
            }
        });
    }

    private previous(): void {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = Math.max(
                0,
                this.movies.length - this.itemsPerView
            );
        }
        this.updateView();
    }

    private next(): void {
        if (this.currentIndex < this.movies.length - this.itemsPerView) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.updateView();
    }

    private updateView(): void {
        if (!this.container) return;

        this.container.style.opacity = '0';
        this.container.style.transform = 'translateX(20px)';

        setTimeout(() => {
            const newCards = this.generateMovieCards(this.currentIndex);
            this.container!.innerHTML = newCards;

            setTimeout(() => {
                this.container!.style.opacity = '1';
                this.container!.style.transform = 'translateX(0)';
            }, 50);
        }, 200);

        this.updateButtons();
    }

    private generateMovieCards(startIndex: number): string {
        return this.movies
            .slice(startIndex, startIndex + this.itemsPerView)
            .map((movie, index) => {
                const rank = startIndex + index + 1;
                const delay = index * 100;
                return `
                    <div class="relative min-w-[200px] group cursor-pointer overflow-hidden rounded-lg transform transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-white/20 opacity-0 translate-y-4" style="animation: fadeInUp 0.6s ease-out ${delay}ms forwards;">
                        <div class="relative">
                            <img src="${movie.src}" alt="${movie.alt}" class="w-full h-[300px] object-cover transition-all duration-500 ease-out group-hover:brightness-110" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-all duration-500 ease-out group-hover:from-black/60"></div>
                            <div class="absolute bottom-4 left-4 transform transition-all duration-500 ease-out group-hover:scale-110">
                                <div class="text-6xl font-bold text-white opacity-80 transition-all duration-500 ease-out group-hover:opacity-100">${rank}</div>
                            </div>
                        </div>
                    </div>
                `;
            })
            .join('');
    }

    private updateButtons(): void {
        if (!this.prevBtn || !this.nextBtn) return;

        const isAtStart = this.currentIndex === 0;
        const isAtEnd =
            this.currentIndex >= this.movies.length - this.itemsPerView;

        this.prevBtn.style.opacity = isAtStart ? '0.3' : '1';
        this.prevBtn.style.transform = isAtStart ? 'scale(0.9)' : 'scale(1)';
        this.prevBtn.style.transition = 'all 0.3s ease-out';

        this.nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
        this.nextBtn.style.transform = isAtEnd ? 'scale(0.9)' : 'scale(1)';
        this.nextBtn.style.transition = 'all 0.3s ease-out';
    }
}

export default MovieNavigation;
