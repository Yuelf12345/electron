<template>
    <div class="navbar">
        <div class="navitem " :class="{ active: isActive === 0 }" @click="select(0, '/home')">
            <div class="indicator"></div>
            <div class="hoverindicator"></div>
            <div class="icon">
                <svg t="1701352100009" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="838" width="200" height="200">
                    <path
                        d="M523.12 202.56a16 16 0 0 0-22.12 0L132.8 554.3a16 16 0 0 0-4.94 11.58L127.8 896a64 64 0 0 0 64 64H384a32 32 0 0 0 32-32V656a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v272a32 32 0 0 0 32 32h192.12a64 64 0 0 0 64-64V565.88a16 16 0 0 0-4.94-11.58z"
                        fill="#000000" p-id="839"></path>
                    <path
                        d="M981.82 488.3l-149.6-143.12V128a32 32 0 0 0-32-32h-96a32 32 0 0 0-32 32v64l-115.84-110.76C545.54 70.28 529.42 64 512 64c-17.36 0-33.44 6.28-44.28 17.26l-425.4 407c-12.44 12-14 31.74-2.68 44.74A32 32 0 0 0 86 535.12L501 138.56a16 16 0 0 1 22.12 0l415.04 396.56a32 32 0 0 0 45.18-0.88c12.28-12.72 11.26-33.72-1.52-45.94z"
                        fill="#000000" p-id="840"></path>
                </svg>
            </div>
        </div>
        <div class="navitem" :class="{ active: isActive === 1 }" @click="select(1, '/friends')">
            <div class="indicator"></div>
            <div class="hoverindicator"></div>
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon s-ion-icon" viewBox="0 0 512 512">
                    <title>Person</title>
                    <path
                        d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z">
                    </path>
                </svg>
            </div>
        </div>
        <div class="navsearch" :class="{ active: isSearch }">
            <input class="searchbox" ref="searchbox" />
            <div class="searchicon" @click="selectsearch">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon s-ion-icon" viewBox="0 0 512 512">
                        <title>Search</title>
                        <path
                            d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z">
                        </path>
                    </svg>
                </div>
            </div>
        </div>
        <div class="navitem" :class="{ active: isActive === 2 }" @click="select(2, '/setting')">
            <div class="indicator"></div>
            <div class="hoverindicator"></div>
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon s-ion-icon" viewBox="0 0 512 512">
                    <title>Cog</title>
                    <path
                        d="M464 249.93a10.58 10.58 0 00-9.36-9.94L429 235.84a5.42 5.42 0 01-4.5-4.67c-.49-3.15-1-6.42-1.7-9.52a5.52 5.52 0 012.63-5.85l22.78-12.65a10.35 10.35 0 005-12.83l-3.95-10.9a10.32 10.32 0 00-12.13-6.51l-25.55 5a5.51 5.51 0 01-5.82-2.81c-1.49-2.79-3.11-5.63-4.8-8.42a5.6 5.6 0 01.44-6.5l17-19.64a10.42 10.42 0 00.39-13.76l-7.42-8.91a10.24 10.24 0 00-13.58-2l-22.37 13.43a5.39 5.39 0 01-6.39-.63c-2.47-2.17-5-4.26-7.37-6.19a5.45 5.45 0 01-1.72-6.21l9.26-24.4a10.35 10.35 0 00-4.31-13.07l-10.09-5.89a10.3 10.3 0 00-13.45 2.83L325 96.28a4.6 4.6 0 01-5.6 1.72c-.61-.25-5.77-2.36-9.78-3.7a5.42 5.42 0 01-3.74-5.23l.39-26.07a10.48 10.48 0 00-8.57-10.88l-11.45-2a10.45 10.45 0 00-11.75 7.17L266 82.1a5.46 5.46 0 01-5.36 3.65h-9.75a5.5 5.5 0 01-5.3-3.67l-8.46-24.67a10.46 10.46 0 00-11.77-7.25l-11.47 2a10.46 10.46 0 00-8.56 10.79l.4 26.16a5.45 5.45 0 01-3.86 5.25c-2.29.89-7.26 2.79-9.52 3.63-2 .72-4.18-.07-5.94-2.1l-16.26-20A10.3 10.3 0 00156.69 73l-10.06 5.83A10.36 10.36 0 00142.31 92l9.25 24.34a5.54 5.54 0 01-1.7 6.23c-2.43 2-4.92 4-7.4 6.22a5.38 5.38 0 01-6.35.64L114 115.74a10.4 10.4 0 00-13.61 2L93 126.63a10.31 10.31 0 00.37 13.75L110.45 160a5.42 5.42 0 01.45 6.45c-1.71 2.72-3.34 5.58-4.82 8.44a5.53 5.53 0 01-5.86 2.82l-25.51-4.93a10.34 10.34 0 00-12.14 6.51l-4 10.88a10.38 10.38 0 005 12.85l22.78 12.65a5.39 5.39 0 012.65 5.92l-.24 1.27c-.52 2.79-1 5.43-1.46 8.24a5.48 5.48 0 01-4.46 4.64l-25.69 4.15A10.42 10.42 0 0048 250.16v11.58A10.26 10.26 0 0057.16 272l25.68 4.14a5.41 5.41 0 014.5 4.67c.49 3.16 1 6.42 1.7 9.52a5.52 5.52 0 01-2.63 5.85l-22.77 12.67a10.35 10.35 0 00-5 12.83l4 10.9a10.33 10.33 0 0012.13 6.51l25.55-4.95a5.49 5.49 0 015.82 2.81c1.5 2.8 3.11 5.63 4.8 8.42a5.58 5.58 0 01-.44 6.5l-17 19.63a10.41 10.41 0 00-.5 13.77l7.41 8.91a10.23 10.23 0 0013.58 2l22.37-13.43a5.39 5.39 0 016.39.63c2.48 2.17 5 4.26 7.37 6.19a5.47 5.47 0 011.73 6.21l-9.27 24.4a10.35 10.35 0 004.31 13.07l10.11 5.84a10.3 10.3 0 0013.45-2.82L187 415.92c1.4-1.73 3.6-2.5 5.23-1.84 3.48 1.44 5.81 2.25 9.94 3.63a5.44 5.44 0 013.75 5.23l-.4 26.05a10.5 10.5 0 008.57 10.88l11.45 2a10.43 10.43 0 0011.75-7.17l8.5-24.77a5.45 5.45 0 015.36-3.65h9.75a5.49 5.49 0 015.3 3.67l8.47 24.67a10.48 10.48 0 0010 7.41 9.74 9.74 0 001.78-.16l11.47-2a10.46 10.46 0 008.56-10.79l-.4-26.16a5.43 5.43 0 013.75-5.2c3.84-1.29 6.54-2.33 8.91-3.25l.6-.23c3.1-1.07 4.6.23 5.47 1.31l16.75 20.63A10.3 10.3 0 00355 439l10.07-5.83a10.35 10.35 0 004.31-13.1l-9.24-24.34a5.52 5.52 0 011.69-6.23c2.43-2 4.92-4 7.4-6.22a5.39 5.39 0 016.38-.62l22.39 13.4a10.39 10.39 0 0013.61-2l7.4-8.9a10.31 10.31 0 00-.37-13.75l-17.06-19.67a5.42 5.42 0 01-.45-6.45c1.71-2.71 3.34-5.57 4.82-8.44a5.55 5.55 0 015.86-2.82l25.48 4.97a10.34 10.34 0 0012.14-6.51l3.95-10.88a10.37 10.37 0 00-5-12.84l-22.8-12.67a5.4 5.4 0 01-2.61-5.89l.24-1.27c.52-2.79 1-5.43 1.46-8.24a5.48 5.48 0 014.46-4.64l25.69-4.14a10.43 10.43 0 009.18-10.28v-11.71zm-282.45 94a15.8 15.8 0 01-25.47 2.66 135.06 135.06 0 01.42-181.65 15.81 15.81 0 0125.5 2.77l45.65 80.35a15.85 15.85 0 010 15.74zM256 391.11a134.75 134.75 0 01-28.31-3 15.81 15.81 0 01-10.23-23.36l46-80a15.79 15.79 0 0113.7-7.93h92.14a15.8 15.8 0 0115.1 20.53c-17.49 54.32-68.4 93.76-128.4 93.76zm7.51-163.9L218 147.07a15.81 15.81 0 0110.31-23.3 134 134 0 0127.69-2.88c60 0 110.91 39.44 128.37 93.79a15.8 15.8 0 01-15.1 20.53h-92a15.78 15.78 0 01-13.76-8z">
                    </path>
                </svg>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router'
const isActive = ref(1);
const isSearch = ref(false);
const bgColors = ['#e4ecfa', '#fff6cc', '#f0e4fa'];
const searchbox = ref();
let bgColor = ref(bgColors[0]);
const select = (index: number, path: string) => {
    bgColor.value = bgColors[index];
    isActive.value = index;
    isSearch.value = false;
    router.push({ path })
}
const selectsearch = () => {
    isSearch.value = !isSearch.value;
    searchbox.value.focus()
}
</script>

<style lang="scss" scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    height: 4.5rem;
    background: white;
    padding: 0 0.75rem;
    transition: padding 300ms ease;
}

.navbar:has(.navsearch.active) {
    padding: 0 0.75rem;
}

.navitem,
.navsearch {
    position: relative;
    display: grid;
    place-content: center;
    color: #fff;
    width: 4.5rem;
    text-align: center;
    color: black;
    font-size: 1.5rem;
    transition: width 300ms ease, flex-grow 300ms ease;
}

.navbar:has(.navsearch.active) .navitem {
    width: 3rem;
}

.hoverindicator {
    position: absolute;
    width: 2.5rem;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
    background: v-bind('bgColor');
    opacity: 0;
    border-radius: 0.5rem;
    height: 0.25rem;
    inset: auto auto -0.25rem 50%;
    transition: inset 300ms ease, opacity 300ms ease;
}

.icon {
    width: 24px;
    z-index: 1;
}

@media (hover: hover) {

    .navitem:not(.active):hover .hoverindicator,
    .navsearch:not(.active):hover .searchbox {
        border-radius: 1.25rem;
        height: 2.5rem;
        opacity: 1;
        transition: opacity 150ms ease;
    }
}

.active .hoverindicator {
    opacity: 1;
    border-radius: 0.5rem;
    height: 0.25rem;
    inset: auto auto 0.25rem 50%;
    transition: inset 300ms ease, height 300ms ease, border-radius 300ms ease;
}

.navsearch.active {
    flex-grow: 1;
}

.searchbox {
    position: absolute;
    inset: 1rem;
    background: v-bind('bgColor');
    border-radius: 1.25rem;
    opacity: 0;
    transition: inset 300ms ease, padding 300ms ease, color 100ms ease, opacity 300ms ease;
    -webkit-appearance: none;
    border: none;
    padding: 0 1rem 0 1rem;
    font-size: 1rem;
    color: transparent;
}

.active .searchbox {
    inset: 1rem 0.25rem;
    height: 2.5rem;
    border-radius: 1.25rem;
    padding: 0 2.5rem 0 1rem;
    opacity: 1;
    color: black;
    transition: inset 300ms ease, padding 300ms ease, color 200ms ease 50ms, opacity 300ms ease;
}


.searchicon {
    position: absolute;
    inset: 0 0 0 auto;
    width: 4.5rem;
    display: grid;
    place-content: center;
    transition: width 300ms ease;
}

.active .searchicon {
    width: 3rem;
}
</style>