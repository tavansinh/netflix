import { movies } from '@/data/movies';
import { generateMovieCards } from '@/utils/movie-card-generator';

const section2 = /* HTML */ `
    <section class="bg-black py-8">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mb-6 flex items-center justify-between">
                <h2 class="text-3xl font-bold text-white">Trending Now</h2>
                <div class="flex gap-2">
                    <button
                        id="prev-btn"
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 font-bold text-white transition-all duration-300 ease-out hover:scale-110 hover:bg-white/40"
                    >
                        ←
                    </button>
                    <button
                        id="next-btn"
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 font-bold text-white transition-all duration-300 ease-out hover:scale-110 hover:bg-white/40"
                    >
                        →
                    </button>
                </div>
            </div>

            <div class="relative overflow-hidden">
                <div
                    id="movie-container"
                    class="flex gap-4 transition-all duration-700 ease-out"
                >
                    ${generateMovieCards(movies, 0, 5)}
                </div>
            </div>
        </div>
    </section>
`;

export default section2;
