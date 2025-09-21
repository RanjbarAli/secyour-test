<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48" viewBox="0 0 48 48">
  <defs>
    <linearGradient id="icons-intro-scanner-gradient" x1="0.85" y1="0.125" x2="0.15" y2="0.875" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#f1a625"/>
      <stop offset="1" stop-color="#986b1d"/>
    </linearGradient>
    <filter id="icons-intro-scanner-filter-1" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feFlood flood-color="#f1a625" flood-opacity="0.502"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="icons-intro-scanner-filter-2" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur-2"/>
      <feFlood flood-color="#fff" flood-opacity="0.251" result="color"/>
      <feComposite operator="out" in="SourceGraphic" in2="blur-2"/>
      <feComposite operator="in" in="color"/>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  </defs>
  <g data-type="innerShadowGroup">
    <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#icons-intro-scanner-filter-1)">
      <circle id="icons-intro-scanner-filter-1-3" data-name="Ellipse 1" cx="15" cy="15" r="15" transform="translate(9 6)" fill="url(#icons-intro-scanner-gradient)"/>
    </g>
    <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#icons-intro-scanner-filter-2)">
      <circle id="icons-intro-scanner-filter-1-4" data-name="Ellipse 1" cx="15" cy="15" r="15" transform="translate(9 6)" fill="#fff"/>
    </g>
  </g>
  <rect id="Rectangle_1" data-name="Rectangle 1" width="25" height="25" rx="7" transform="translate(4 16)" fill="rgba(255,255,255,0.5)"/>
  <g id="Group_1" data-name="Group 1" transform="translate(3.5 34.5)" style="isolation: isolate">
    <path id="Path_1" data-name="Path 1" d="M17.562,17.885a3.008,3.008,0,0,1,4.46.229l.513-.256a.654.654,0,0,1,.585,1.17l-.513.256a3.007,3.007,0,0,1,.089.728v.131h.523a.654.654,0,0,1,0,1.308H22.7v.131a3.007,3.007,0,0,1-.089.728l.513.256a.654.654,0,0,1-.585,1.17l-.513-.256a3.008,3.008,0,0,1-4.666,0l-.513.256a.654.654,0,0,1-.585-1.17l.513-.256a3.007,3.007,0,0,1-.089-.728V21.45h-.523a.654.654,0,1,1,0-1.308h.523v-.131a3.006,3.006,0,0,1,.089-.728l-.513-.256a.654.654,0,1,1,.585-1.17l.513.256A3.01,3.01,0,0,1,17.562,17.885Zm.427,3.7a1.7,1.7,0,0,0,1.046,1.569V20.665H17.989Zm.131-2.223h3.138a1.7,1.7,0,0,0-3.138,0Zm3.269,1.308H20.343v2.484a1.7,1.7,0,0,0,1.046-1.569Zm3.33,5.16a.654.654,0,0,1,.925,0l2.746,2.746a.654.654,0,1,1-.925.925L24.718,26.75A.654.654,0,0,1,24.718,25.825Z" transform="translate(-7.08 -27.187)" fill="#fff" fill-rule="evenodd"/>
    <path id="Path_2" data-name="Path 2" d="M9.935,1.939a6.8,6.8,0,0,0-4.726.779.654.654,0,0,1-.654-1.133,8.107,8.107,0,1,1-2.97,2.97.654.654,0,0,1,1.133.654,6.8,6.8,0,1,0,7.217-3.27Z" transform="translate(4 -15)" fill="#fff" fill-rule="evenodd"/>
  </g>
</svg>
</template>