import '@/assets/css/style.css';
import section1, { initDownloadButton } from '@/section/section-1';
import section2 from '@/section/section-2';
import { movies } from '@/data/movies';
import section3 from '@/section/section-3';
import section4 from '@/section/section-4';
import MovieNavigation from '@/utils/movie-navigation';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /* HTML */ `
    <main>${section1} ${section2} ${section3} ${section4}</main>
`;

const movieNav = new MovieNavigation(movies);
movieNav.init();

initDownloadButton();
