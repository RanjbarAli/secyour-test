<script setup>
if (process.client) {
    document.body.style.background = '#0b0d12'
}
useHead({
    script: [{ src: '/js/wow.min.js' }]
});


const bodyClass = ref('')
useListen('change-body-class', function (className) {
    bodyClass.value = className
})
const route = useRoute()

</script>

<template>
    <div :class="['layout card min-h-screen relative', bodyClass, `${route.name}-page`]">
        <div class="lights" id="lights-back-effect">
            <div class="first-light"></div>
            <div class="second-light"></div>
        </div>
        <MainMenu />
        <div class="card mb-40 overflow-hidden">
            <NuxtPage />
        </div>
        <MainFooter />
        <MainSidebar />
        <Alerts class="right-7" />
    </div>
</template>

<style lang="postcss" scoped>
@keyframes change-opacity {

    0%,
    50%,
    100% {
        opacity: 100%;
    }

    25% {
        opacity: 60%;
    }

    75% {
        opacity: 40%;
    }
}

@keyframes bg-blur {
    to {
        transform: rotate(-360deg);
    }
}

.scan-scanid-page.critical-shadow {
    box-shadow: inset 0 300px 200px -200px #FF000050;
}

.scan-scanid-page.bad-shadow {
    box-shadow: inset 0 300px 200px -200px #c02a2a50;
}

.scan-scanid-page.low-shadow {
    box-shadow: inset 0 300px 200px -200px #CE3B0B50;
}

.scan-scanid-page.good-shadow {
    box-shadow: inset 0 300px 200px -200px #FDC82350;
}
.scan-scanid-page.secure-shadow {
    box-shadow: inset 0 300px 200px -200px #007E5050;
}

.lights,
.lights>* {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    pointer-events: none;
    z-index: -1;
}

.lights>*:not(#mouse)::before,
.lights>*:not(#mouse)::after {
    content: "";
    position: absolute;
    display: block;
    border-radius: 50%;
}

.index-page .first-light::before {
    width: 200px;
    height: 200px;
    top: 80px;
    right: 7%;
    background: #55fee350;
    filter: blur(450px);
    transform-origin: left center;
}
@media screen and (min-width: 780px) {
    .index-page .first-light::before {
        animation: bg-blur 30s infinite linear, change-opacity 30s infinite linear;
    }
}
.contact-page .first-light::before {
    width: 100px;
    height: 100px;
    background-color: #ffffffbb;
    top: 25%;
    left: 40%;
    z-index: -1;
    filter: blur(200px);
}

.index-page .first-light::after {
    width: 200px;
    height: 200px;
    top: 70vh;
    left: 8%;
    background: #4918c230;
    filter: blur(500px);
    transform-origin: right center;
    animation: bg-blur 20s infinite linear reverse;
}

.index-page .second-light::before {
    width: 230px;
    height: 230px;
    top: 40vh;
    left: 0;
    background: #0284c750;
    filter: blur(600px);
    transform-origin: left center;
    animation: bg-blur 15s infinite linear;
}


.login-page .first-light::before,
.forget-password-page .first-light::before,
.recovery-token-page .first-light::before,
.register-page .first-light::before {
    width: 100vw;
    height: 100vw;
    top: -75vw;
    left: -50vw;
    filter: blur(500px);
    opacity: .2;
    @apply bg-sky-600
}</style>
