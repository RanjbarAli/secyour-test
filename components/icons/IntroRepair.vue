<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48" viewBox="0 0 48 48">
  <defs>
    <linearGradient id="icons-intro-repair-gradient" x1="0.85" y1="0.125" x2="0.15" y2="0.875" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#8b25f1"/>
      <stop offset="1" stop-color="#41166d"/>
    </linearGradient>
    <filter id="icons-intro-repair-filter-1" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feFlood flood-color="#8b25f1" flood-opacity="0.502"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="icons-intro-repair-filter-2" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur-2"/>
      <feFlood flood-color="#fff" flood-opacity="0.251" result="color"/>
      <feComposite operator="out" in="SourceGraphic" in2="blur-2"/>
      <feComposite operator="in" in="color"/>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  </defs>
  <g data-type="innerShadowGroup">
    <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#icons-intro-repair-filter-1)">
      <circle id="Ellipse_1-3" data-name="Ellipse 1" cx="15" cy="15" r="15" transform="translate(9 6)" fill="url(#icons-intro-repair-gradient)"/>
    </g>
    <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#icons-intro-repair-filter-2)">
      <circle id="Ellipse_1-4" data-name="Ellipse 1" cx="15" cy="15" r="15" transform="translate(9 6)" fill="#fff"/>
    </g>
  </g>
  <rect id="Rectangle_1" data-name="Rectangle 1" width="25" height="25" rx="7" transform="translate(4 16)" fill="rgba(255,255,255,0.5)"/>
  <g id="Group_2" data-name="Group 2" transform="translate(8 20)">
    <path id="Path_3" data-name="Path 3" d="M19.869,24.429a3.643,3.643,0,1,1,3.643-3.643,3.6,3.6,0,0,1-3.643,3.643Zm0-6.071a2.375,2.375,0,1,0,.938.17A2.376,2.376,0,0,0,19.869,18.357Z" transform="translate(-11.629 -12.286)" fill="#fff"/>
    <path id="Path_4" data-name="Path 4" d="M16.318,5.491,14.886,3.009a1.213,1.213,0,0,0-1.441-.543l-1.478.5a6.7,6.7,0,0,0-.8-.46L10.864.976A1.214,1.214,0,0,0,9.673,0H6.808A1.214,1.214,0,0,0,5.616.976L5.311,2.506a6.661,6.661,0,0,0-.806.457l-1.469-.5a1.213,1.213,0,0,0-1.44.543L.163,5.491A1.214,1.214,0,0,0,.413,7.01L1.585,8.04c-.01.153-.023.3-.023.46s.006.311.017.465L.413,9.99a1.214,1.214,0,0,0-.251,1.519L1.6,13.991a1.213,1.213,0,0,0,1.441.543l1.478-.5a6.662,6.662,0,0,0,.8.461l.305,1.529A1.214,1.214,0,0,0,6.808,17H9.455V15.786H6.808L6.376,13.63a5.522,5.522,0,0,1-1.636-.954l-2.093.708L1.215,10.9,2.869,9.448a5.42,5.42,0,0,1,0-1.9L1.215,6.1,2.647,3.616l2.081.7A5.482,5.482,0,0,1,6.376,3.37l.431-2.155H9.673L10.1,3.37a5.523,5.523,0,0,1,1.636.954l2.093-.708L15.266,6.1l-1.7,1.489.8.913,1.7-1.49a1.214,1.214,0,0,0,.251-1.519Z" transform="translate(0)" fill="#fff"/>
    <path id="Path_5" data-name="Path 5" d="M37.941,43.23l-1.573-1.572-.856.856,2.429,2.429,4.25-4.25-.856-.856Z" transform="translate(-25.45 -28.549)" fill="#fff"/>
  </g>
</svg>
</template>