<script setup>
defineOptions({
  inheritAttrs: false
})
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  digits: {
    type: Number,
    default: 6
  },
  error: {
    type: String,
    default: ''
  },
})
const emit = defineEmits(['update:modelValue'])
const otp = ref(Array(props.digits).fill(''))
const otpStates = ref(Array(props.digits).fill(false))
const inputColors = (index) => props?.error?.length ? 'border-red-600' : otpStates.value[index] ? 'border-blue-500 shadow-blue-500' : 'border-transparent'

const onInput = async (index, tar) => {
  if (otp.value[index].length > 1) {
    otp.value[index] = otp.value[index].slice(-1)
  }
  otp.value[index] = otp.value[index].replace(/\D+/, '')
  await nextTick()
  if (otp.value[index] && index < props.digits - 1) {
    tar?.target?.nextSibling?.focus()
  }
  checkOtp()
}

const onBackspace = async (index, tar) => {
  await nextTick()
  if (!otp.value[index] && index > 0) {
    tar?.target?.previousSibling?.focus()
  }
}

const checkOtp = () => {
  const code = otp.value.join('')
  emit('update:modelValue', code)
}

const onPaste = async (event) => {
  if (!event.clipboardData) return
  const pasted = event.clipboardData?.getData('text')?.replace(/\D/g, '') || ''
  if (!pasted) return
  for (let i = 0; i < Math.min(props.digits, pasted.length); i++) {
    otp.value[i] = pasted[i] || ''
    await nextTick()
  }
  const last = Math.min(props.digits,pasted.length) - 1
  const inputs = event.target.parentElement.querySelectorAll('input')
  inputs[last]?.select()
  checkOtp()
}

</script>

<template>
  <div class="form-input otp" dir="ltr">
    <div class="card flex justify-between gap-2">
      <input
      v-for="(digit, index) in otp"
      :key="index"
      type="text"
      :class="inputColors(index)"
      inputmode="numeric"
      @focus="$event.target.select(); otpStates[index] = true"
      @blur="otpStates[index] = false"
      maxlength="1"
      v-model="otp[index]"
      :autocomplete="index === 0 ? 'one-time-code' : undefined"
      @input="onInput(index, $event)"
      @keydown.backspace="onBackspace(index, $event)"
      @paste="index === 0 && onPaste($event)"
    />
    </div>
    <span v-if="props?.error?.length" class="error-message">{{ props.error }}</span>
  </div>
</template>