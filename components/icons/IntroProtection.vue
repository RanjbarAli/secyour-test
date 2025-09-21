<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48" viewBox="0 0 48 48">
  <defs>
    <linearGradient id="icons-intro-protection-gradient" x1="0.85" y1="0.125" x2="0.15" y2="0.875" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#25b2f1"/>
      <stop offset="1" stop-color="#195975"/>
    </linearGradient>
    <filter id="icons-intro-protection-filter-1" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feFlood flood-color="#25b2f1" flood-opacity="0.502"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="icons-intro-protection-filter-2" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur-2"/>
      <feFlood flood-color="#fff" flood-opacity="0.251" result="color"/>
      <feComposite operator="out" in="SourceGraphic" in2="blur-2"/>
      <feComposite operator="in" in="color"/>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  </defs>
  <g data-type="innerShadowGroup">
    <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#icons-intro-protection-filter-1)">
      <circle id="icons-intro-protection-filter-1-3" data-name="Ellipse 1" cx="15" cy="15" r="15" transform="translate(9 6)" fill="url(#icons-intro-protection-gradient)"/>
    </g>
    <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#icons-intro-protection-filter-2)">
      <circle id="icons-intro-protection-filter-1-4" data-name="Ellipse 1" cx="15" cy="15" r="15" transform="translate(9 6)" fill="#fff"/>
    </g>
  </g>
  <rect id="Rectangle_1" data-name="Rectangle 1" width="25" height="25" rx="7" transform="translate(4 16)" fill="rgba(255,255,255,0.5)"/>
  <path id="Path_6" data-name="Path 6" d="M16.952,1.471A25.457,25.457,0,0,0,1.2,1.045,1.57,1.57,0,0,0,.057,2.993,25.868,25.868,0,0,0,1.247,6.61c.008.028.022.014.022-.013a1.521,1.521,0,0,1,1.19-1.508,19.5,19.5,0,0,1,12.314.163A1.162,1.162,0,0,0,16.257,4.5,25.116,25.116,0,0,0,17,1.555C17.01,1.5,16.965,1.484,16.952,1.471ZM4.715,4.976a20.778,20.778,0,0,0-2.08.536A1.46,1.46,0,0,0,2.1,7.971a1.228,1.228,0,0,1,.694-.8,14.4,14.4,0,0,1,3.978-.913,7.194,7.194,0,0,1-2.053-1.28ZM14.755,8.048A14.979,14.979,0,0,0,3.108,7.587a1.156,1.156,0,0,0-.6,1.651,27,27,0,0,0,2.23,3.4,1.23,1.23,0,0,1,.9-1.425,9.558,9.558,0,0,1,6.132.235,1.182,1.182,0,0,0,1.411-.453A28.175,28.175,0,0,0,14.8,8.148C14.822,8.1,14.8,8.071,14.755,8.048Zm-3.618,5.5a6.991,6.991,0,0,1-1.77-1.275c-.241-.241-.595-.586-.968-1a8.182,8.182,0,0,0-2.564.368,1.109,1.109,0,0,0-.539,1.7,23.8,23.8,0,0,0,1.715,1.87,1.941,1.941,0,0,0,2.7.013c.531-.531.858-.885,1.458-1.566A.067.067,0,0,0,11.138,13.55Z" transform="translate(8 21)" fill="#fff"/>
</svg>

</template>