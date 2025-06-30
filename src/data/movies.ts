import squidGame from '@/assets/image/movies/squid-game.webp';
import onePiece from '@/assets/image/movies/one-piece.webp';
import mercyForNone from '@/assets/image/movies/mercy-for-none.webp';
import kpopDemonHunter from '@/assets/image/movies/kpop-demon-hunter.webp';
import whenLifeGivesYouTangerines from '@/assets/image/movies/when-life-gives-you-tangerines.webp';
import mai from '@/assets/image/movies/mai.webp';
import squidGameConversation from '@/assets/image/movies/squid-game-in-conversation.webp';
import tomCruise from '@/assets/image/movies/tom-cruise.webp';
import type { Movie } from '@/types/movie';

export const movies: Movie[] = [
    { src: squidGame, alt: 'squid game', title: 'Squid Game' },
    { src: onePiece, alt: 'one piece', title: 'One Piece' },
    { src: mercyForNone, alt: 'mercy for none', title: 'Mercy for None' },
    {
        src: kpopDemonHunter,
        alt: 'kpop demon hunter',
        title: 'K-Pop Demon Hunter',
    },
    {
        src: whenLifeGivesYouTangerines,
        alt: 'when life gives you tangerines',
        title: 'When Life Gives You Tangerines',
    },
    { src: mai, alt: 'mai', title: 'Mai' },
    {
        src: squidGameConversation,
        alt: 'squid game in conversation',
        title: 'Squid Game: In Conversation',
    },
    { src: tomCruise, alt: 'tom cruise', title: 'Tom Cruise Collection' },
];
