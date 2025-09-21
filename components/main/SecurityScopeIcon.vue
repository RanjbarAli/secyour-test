<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const outerCircle = ref(null);
const innerCircle = ref(null);

onMounted(() => {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to([outerCircle.value, innerCircle.value], {
      rotation: (i) => (i === 0 ? 90 : -90),
      ease: 'none',
      scrollTrigger: {
        trigger: '.intro-section',
        start: '-100px top',
        end: 'bottom top',
        scrub: 2,
      },
    });
  }
});

onUnmounted(() => {
  if (process.client) window.removeEventListener('mousemove', ()=>{});
});
</script>

<template>
  <svg class="security-scope-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 380">
    <g>
      <g transform="translate(20)">
        <line y2="80" transform="translate(170)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="20" transform="translate(160 80)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="16" transform="translate(162 60)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="12" transform="translate(164 40)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="8" transform="translate(166 20)" fill="none" stroke="#ABC2D2" stroke-width="3" />
      </g>
      <g transform="translate(380 20) rotate(90)">
        <line y2="80" transform="translate(170)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="20" transform="translate(160 80)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="16" transform="translate(162 60)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="12" transform="translate(164 40)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="8" transform="translate(166 20)" fill="none" stroke="#ABC2D2" stroke-width="3" />
      </g>
      <g transform="translate(360 380) rotate(180)">
        <line y2="80" transform="translate(170)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="20" transform="translate(160 80)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="16" transform="translate(162 60)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="12" transform="translate(164 40)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="8" transform="translate(166 20)" fill="none" stroke="#ABC2D2" stroke-width="3" />
      </g>
      <g transform="translate(0 360) rotate(-90)">
        <line y2="80" transform="translate(170)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="20" transform="translate(160 80)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="16" transform="translate(162 60)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="12" transform="translate(164 40)" fill="none" stroke="#ABC2D2" stroke-width="3" />
        <line x1="8" transform="translate(166 20)" fill="none" stroke="#ABC2D2" stroke-width="3" />
      </g>
    </g>
    <g>
      <path d="M30,70V30H70" transform="translate(20 20)" fill="none" stroke="#ABC2D2" stroke-width="3" />
      <path d="M30,70V30H70" transform="translate(360 20) rotate(90)" fill="none" stroke="#ABC2D2" stroke-width="3" />
      <path d="M30,70V30H70" transform="translate(360 360) rotate(180)" fill="none" stroke="#ABC2D2" stroke-width="3" />
      <path d="M30,70V30H70" transform="translate(20 360) rotate(-90)" fill="none" stroke="#ABC2D2" stroke-width="3" />
    </g>
    <g transform="translate(50 50)">
      <g>
        <circle cx="140" cy="140" r="138" class="outer-circle" ref="outerCircle" fill="none" stroke="#ABC2D2" stroke-width="2"
          stroke-dasharray="3 4" />
      </g>
    </g>
    <g>
      <g transform="translate(88 88)" fill="none" stroke="#ABC2D2" stroke-width="4">
        <circle cx="102.5" cy="102.5" r="110" fill="none" />
      </g>
      <g transform="translate(111 111)" fill="none" stroke="#ABC2D2" stroke-width="10" stroke-dasharray="2 6">
        <circle  ref="innerCircle" cx="79" cy="79" r="74" class="dashed-circle" fill="none" />
      </g>
      <g transform="translate(152.5 142.054)">
        <path fill="#ABC2D2"
          d="M1.805,34.983H7.4V23.172A23.1,23.1,0,0,1,14.2,6.811V6.805a23.077,23.077,0,0,1,32.728,0l.006.006a23.1,23.1,0,0,1,6.8,16.361V34.983h4.455A1.811,1.811,0,0,1,60,36.788v38.12a1.811,1.811,0,0,1-1.805,1.8H1.805A1.811,1.811,0,0,1,0,74.908V36.788a1.811,1.811,0,0,1,1.805-1.8Zm14.6,0H44.735V23.043a14.14,14.14,0,0,0-4.159-10.007l0,0a14.165,14.165,0,0,0-24.173,10v11.94ZM30.683,55.842l2.86,13.2-7.839.033L28,55.7a5.317,5.317,0,1,1,2.679.144Z"
          transform="translate(7.5 9.589)" fill-rule="evenodd" />
      </g>
    </g>
  </svg>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.security-scope-icon {
  .dashed-circle {
    transform-origin: center;
    transform-box: border-box;
  }

  .outer-circle {
    transform-origin: center;
    transform-box: border-box;
  }
}

@keyframes circle-spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>