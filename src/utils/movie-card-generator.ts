import type { Movie } from '@/types/movie';

export const generateMovieCards = (
    movies: Movie[],
    startIndex: number,
    itemsPerView: number
): string => {
    return movies
        .slice(startIndex, startIndex + itemsPerView)
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
};
