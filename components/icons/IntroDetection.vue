<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48" viewBox="0 0 48 48">
  <defs>
    <linearGradient id="icons-intro-detection-gradient" x1="0.85" y1="0.125" x2="0.15" y2="0.875" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#f12525"/>
      <stop offset="1" stop-color="#631616"/>
    </linearGradient>
    <filter id="icons-intro-detection-filter-1" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feFlood flood-color="#f12525" flood-opacity="0.502"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="icons-intro-detection-filter-2" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur-2"/>
      <feFlood flood-color="#fff" flood-opacity="0.251" result="color"/>
      <feComposite operator="out" in="SourceGraphic" in2="blur-2"/>
      <feComposite operator="in" in="color"/>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  </defs>
  <g data-type="innerShadowGroup">
    <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#icons-intro-detection-filter-1)">
      <circle id="icons-intro-detection-filter-1-3" data-name="Ellipse 1" cx="15" cy="15" r="15" transform="translate(9 6)" fill="url(#icons-intro-detection-gradient)"/>
    </g>
    <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#icons-intro-detection-filter-2)">
      <circle id="icons-intro-detection-filter-1-4" data-name="Ellipse 1" cx="15" cy="15" r="15" transform="translate(9 6)" fill="#fff"/>
    </g>
  </g>
  <rect id="Rectangle_1" data-name="Rectangle 1" width="25" height="25" rx="7" transform="translate(4 16)" fill="rgba(255,255,255,0.5)"/>
  <path id="Path_1" data-name="Path 1" d="M7.382,0V1.442a7.707,7.707,0,0,0-3.247.867l.776,1.344A6.13,6.13,0,0,1,13.2,11.815l-.216-.093-.96-.451A4.792,4.792,0,0,1,6.8,13.918l-.267,1.21A6.131,6.131,0,0,1,2.2,6.4L.847,5.621A7.709,7.709,0,0,0,2.078,14.4L.949,15.53l.479.479,1.864-1.864a6.672,6.672,0,0,0,3.121,1.533l-.252,1.14.164.034h0c.219.043.439.078.658.1h0c.11.012.22.021.329.028q.246.016.492.017a7.686,7.686,0,0,0,2.723-.492c.086-.032.172-.066.256-.1a7.741,7.741,0,0,0,1.267-.673l.133-.088q.132-.091.26-.187a7.7,7.7,0,0,0,1.071-.972l.108-.121.105-.122s0,0,0,0c.035-.041.069-.083.1-.125,0,0,0,0,0,0l.1-.128q.15-.2.287-.4c.031-.046.061-.091.091-.137q.1-.163.2-.332l1.331.572.267-.622-2.395-1.031a6.658,6.658,0,0,0,.673-2.9h1.018A7.694,7.694,0,0,0,15.2,7.357l1.483-.176L16.6,6.509,15.009,6.7A7.71,7.71,0,0,0,9.923,1.76L10.291.386,9.637.211,9.267,1.593A7.722,7.722,0,0,0,8.06,1.443V0ZM3.549,2.649a7.676,7.676,0,0,0-1.071.827l1.1,1.1h0a6.143,6.143,0,0,1,.749-.581ZM2,3.958a7.727,7.727,0,0,0-.817,1.076l1.349.779A6.137,6.137,0,0,1,3.1,5.058ZM5.036,6.172A3.955,3.955,0,1,0,11.651,9.1h-.678A3.281,3.281,0,1,1,5.493,6.673l-.457-.5Zm2.707.847a2.209,2.209,0,1,0,2.209,2.21A2.215,2.215,0,0,0,7.744,7.019Zm0,.678a1.535,1.535,0,0,1,1.425,2.1.974.974,0,1,0-1.642.952A1.532,1.532,0,0,1,7.744,7.7Z" transform="translate(8 20)" fill="#fff"/>
</svg>

</template>