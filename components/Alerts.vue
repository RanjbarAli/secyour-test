<script setup>
const alerts = useAlerts()
const classes = {
    success: 'bg-emerald-700',
    error: 'bg-red-700',
    warning: 'bg-amber-700',
    info: 'bg-blue-700',
}
</script>

<template>
    <div class="alerts-wrap">
        <div v-for="alert in alerts.alerts.slice(-3)" @click="alert.remove()" :key="alert.id" :class="['alert', classes[alert.type]]">
            <div class="alert-content">
                <component v-if="alert.icon" :is="alert.icon" class="h-4" />
                <span>{{ alert.message }}</span>
            </div>
            <div class="alert-progress" :style="`--progress-duration:${alert.timeout}ms`"></div>
        </div>
    </div>
</template>
