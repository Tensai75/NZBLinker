<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: '#004B1E',
  },
  size: {
    type: String,
    default: '256',
  },
})
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xml:space="preserve"
    :width="props.size"
    :height="props.size"
    version="1.1"
    style="
      shape-rendering: geometricPrecision;
      text-rendering: geometricPrecision;
      image-rendering: optimizeQuality;
      fill-rule: evenodd;
      clip-rule: evenodd;
    "
    viewBox="0 0 1024 1024"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g id="NZBLinker Logo">
      <path
        :style="{ fill: props.color }"
        d="M950 1024l-876 0c-41,0 -74,-33 -74,-74l0 -876c0,-41 33,-74 74,-74l876 0c41,0 74,33 74,74l0 876c0,41 -33,74 -74,74l0 0z"
      />
      <path
        style="fill: #fff"
        d="M327 172c-135,0 -244,110 -244,245 0,135 109,244 244,244 4,0 9,0 13,0 -10,23 -16,48 -16,75 0,20 7,50 6,46 16,4 36,8 57,12l2 -62 20 65c0,0 64,8 103,8 70,0 139,-13 182,-22 4,-15 6,-31 6,-47 0,-26 -6,-52 -16,-75 4,1 9,1 13,1 135,-1 244,-110 244,-245 0,-135 -109,-245 -244,-245 -74,0 -140,33 -185,85 -45,-51 -111,-85 -185,-85l0 0zm177 406l-89 54 -13 -34 102 -20zm17 1l103 19 -14 34 -89 -53zm-175 245c31,59 94,100 166,100 72,0 134,-41 166,-100 -45,9 -105,18 -166,18 -62,0 -122,-10 -166,-18l0 0z"
      />
      <g id="_429732600">
        <g>
          <path
            :style="{ fill: props.color }"
            d="M182 357l1 94c0,42 39,77 87,77l119 1c48,1 86,-33 86,-74l-68 -2c-7,13 -23,20 -40,19l-76 0c-24,-1 -43,-18 -43,-39l-1 -57c0,-21 19,-37 43,-37l76 1c16,0 34,8 41,19l67 1c0,-42 -39,-76 -87,-77l-119 -1c-48,-1 -86,33 -86,75z"
          />
          <path
            :style="{ fill: props.color }"
            d="M618 362c8,-12 26,-20 42,-19l71 0c24,0 44,18 44,39l1 58c0,21 -20,39 -44,38l-71 0c-17,-1 -34,-8 -42,-21l-68 0c0,43 40,78 88,78l115 1c49,1 88,-33 88,-76l-1 -96c0,-43 -40,-78 -89,-78l-114 -2c-49,0 -88,34 -88,77l68 1z"
          />
          <path
            :style="{ fill: props.color }"
            d="M640 408c1,-14 -13,-26 -29,-26l-198 0c-17,0 -30,11 -30,26 0,14 13,26 29,26l199 0c16,0 29,-11 29,-26z"
          />
        </g>
      </g>
    </g>
  </svg>
</template>
