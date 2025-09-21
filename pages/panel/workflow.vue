<template>
  <div class="card gap-3 grid grid-cols-[300px_1fr] max-md:grid-cols-1">
    <div rel="workflowToolBox" class="glass rounded-3xl p-4 flex flex-col gap-3 flex-wrap">
      <p class="text-sm">برای اضافه کردن، روی گره مورد نظر کلیک کنید.</p>
      <button @click="addNode('command')" dir="ltr" class="bg-gray-600/50 hover:bg-gray-600/75 shadow-lg text-white p-2 rounded-xl">+ Commands</button>
      <button @click="addNode('send-email')" dir="ltr" class="bg-gray-600/50 hover:bg-gray-600/75 shadow-lg text-white p-2 rounded-xl">+ Send Email</button>
      <button @click="addNode('if')" dir="ltr" class="bg-gray-600/50 hover:bg-gray-600/75 shadow-lg text-white p-2 rounded-xl">+ If</button>
    </div>
    <div ref="drawflowContainer" dir="ltr" id="drawflow" class="drawflow h-[500px] border border-white/10 rounded-2xl"></div>
    <p class="col-span-full text-sm opacity-50 leading-relaxed">برای حذف گره یا پیوند روی آنها کلیک راست کنید و سپس روی x کلیک کنید. <br />با نگه‌داشتن کلید Ctrl و چرخاندن چرخ موس می‌توانید زوم کنید.</p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'panel'
})
import "~/utils/drawflow.min.css"
const drawflowContainer = ref(null)
let drawflowInstance;

// لیست نودها
const premiumOptions = ['Omega','Zeus','Hermes','Poseidon','Hera','Apollo','Ares','Artemis']
const premiumHtml = `
      <p>Scan Type</p>
      <select class="w-full border p-1 rounded mt-1 bg-gray-600">
        ${premiumOptions.map(option => `<option>${option}</option>`).join('')}
      </select>
    `

onMounted(async () => {
  if (!process.client) return; // فقط client-side
  drawflowInstance = new Drawflow(drawflowContainer.value)
  drawflowInstance.start()
  drawflowInstance.zoom_out()
  drawflowInstance.addNode('Premium Scanner', 0, 1, 20, 70, '', {}, premiumHtml)

  drawflowInstance.addNode('Command', 1, 1, 190, 100, '', {}, `
      <div class="flex flex-col gap-1">
        <p>Command</p>
        <select class="w-full border p-1 rounded mt-1 bg-gray-600">
          ${['sed','curl','jq','grep','awk','nc'].map(option => `<option>${option}</option>`).join('')}
        </select>
        <input type="text" placeholder="Params" class="w-full border p-1 rounded"/>
      </div>
    `)

    drawflowInstance.addConnection(1, 2, 'output_1', 'input_1')

    drawflowInstance.addNode('if', 1, 2, 320, 300, '', {}, `
      <div class="flex gap-5 items-stretch">
        <div class="flex flex-col gap-1">
        <p>If Result</p>
        <select class="w-full border p-1 rounded mt-1 bg-gray-600">
          ${['Critical','Bad','Normal','Good','Awesome'].map(option => `<option>${option}</option>`).join('')}
        </select>
      </div>
      <div class="flex flex-col justify-center text-right">
        <span>true</span><span>false</span>
      </div>
      </div>
    `)

    drawflowInstance.addConnection(2, 3, 'output_1', 'input_1')

    drawflowInstance.addNode('Send Email', 1, 0, 550, 350, '', {}, `
      <div class="flex flex-col gap-1">
        <p>Send result to email</p>
        <input type="email" placeholder="Email" class="w-full min-w-32 border p-1 rounded"/>
      </div>
    `)

    drawflowInstance.addConnection(3, 4, 'output_1', 'input_1')
  
})
const exportData = () => {
  console.log(drawflowInstance.export())
}
// تابع اضافه کردن نودها از toolbox
function addNode(type) {
  if(!drawflowInstance) return

  if(type === 'send-email'){
    drawflowInstance.addNode('Send Email', 1, 0, 150, 150, '', {}, `
      <div class="flex flex-col gap-1">
        <p>Send result to email</p>
        <input type="email" placeholder="Email" class="w-full min-w-32 border p-1 rounded"/>
      </div>
    `)
  }
  else if(type === 'command'){
    drawflowInstance.addNode('Command', 1, 1, 300, 100, '', {}, `
      <div class="flex flex-col gap-1">
        <p>Command</p>
        <select class="w-full border p-1 rounded mt-1 bg-gray-600">
          ${['sed','curl','jq','grep','awk','nc'].map(option => `<option>${option}</option>`).join('')}
        </select>
        <input type="text" placeholder="Params" class="w-full border p-1 rounded"/>
      </div>
    `)
  }
  else if(type === 'if'){
    drawflowInstance.addNode('if', 1, 2, 300, 100, '', {}, `
      <div class="flex gap-5 items-stretch">
        <div class="flex flex-col gap-1">
        <p>If Result</p>
        <select class="w-full border p-1 rounded mt-1 bg-gray-600">
          ${['Critical','Bad','Normal','Good','Awesome'].map(option => `<option>${option}</option>`).join('')}
        </select>
      </div>
      <div class="flex flex-col justify-center text-right">
        <span>true</span><span>false</span>
      </div>
      </div>
    `)
  }
}
</script>