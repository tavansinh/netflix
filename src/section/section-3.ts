import tvIcon from '@/assets/image/icons/tv-icon';
import downloadIcon from '@/assets/image/icons/download-icon';
import sightIcon from '@/assets/image/icons/telescope-icon';
import profileIcon from '@/assets/image/icons/profile-icon';

const section3 = /* HTML */ `
    <section class="bg-black py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 class="animate-fade-in-up mb-12 text-4xl font-bold text-white">
                More Reasons to Join
            </h2>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div
                    class="hover:scale-102 animate-fade-in-up animation-delay-100 relative rounded-lg bg-gradient-to-br from-purple-900/60 via-purple-800/50 to-purple-950/70 p-6 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-purple-500/20"
                >
                    <h3 class="mb-4 text-xl font-semibold text-white">
                        Enjoy on your TV
                    </h3>
                    <p class="mb-6 text-gray-300">
                        Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple
                        TV, Blu-ray players, and more.
                    </p>
                    <div
                        class="absolute bottom-4 right-4 h-16 w-16 transition-transform duration-300 hover:scale-105"
                    >
                        ${tvIcon}
                    </div>
                </div>

                <div
                    class="hover:scale-102 animate-fade-in-up animation-delay-200 relative rounded-lg bg-gradient-to-br from-pink-900/60 via-pink-800/50 to-pink-950/70 p-6 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-pink-500/20"
                >
                    <h3 class="mb-4 text-xl font-semibold text-white">
                        Download your shows to watch offline
                    </h3>
                    <p class="mb-6 text-gray-300">
                        Save your favorites easily and always have something to
                        watch.
                    </p>
                    <div
                        class="absolute bottom-4 right-4 h-16 w-16 transition-transform duration-300 hover:scale-105"
                    >
                        ${downloadIcon}
                    </div>
                </div>

                <div
                    class="hover:scale-102 animate-fade-in-up animation-delay-300 relative rounded-lg bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-blue-950/70 p-6 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-blue-500/20"
                >
                    <h3 class="mb-4 text-xl font-semibold text-white">
                        Watch everywhere
                    </h3>
                    <p class="mb-6 text-gray-300">
                        Stream unlimited movies and TV shows on your phone,
                        tablet, laptop, and TV.
                    </p>
                    <div
                        class="absolute bottom-4 right-4 h-16 w-16 transition-transform duration-300 hover:scale-105"
                    >
                        ${sightIcon}
                    </div>
                </div>

                <div
                    class="hover:scale-102 animate-fade-in-up animation-delay-500 relative rounded-lg bg-gradient-to-br from-red-900/60 via-red-800/50 to-red-950/70 p-6 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-red-500/20"
                >
                    <h3 class="mb-4 text-xl font-semibold text-white">
                        Create profiles for kids
                    </h3>
                    <p class="mb-6 text-gray-300">
                        Send kids on adventures with their favorite characters
                        in a space made just for them — free with your
                        membership.
                    </p>
                    <div
                        class="absolute bottom-4 right-4 h-16 w-16 transition-transform duration-300 hover:scale-105"
                    >
                        ${profileIcon}
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

export default section3;
