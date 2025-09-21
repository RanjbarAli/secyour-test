import { defineStore } from "pinia";

export const useAlerts = defineStore("alerts", () => {
  const alerts = ref([]);
  const timeOuts = ref({});
  const removeAlert = (id) => {
    alerts.value = alerts.value.filter((alert) => alert.id !== id);
    clearTimeout(timeOuts.value?.[id]);
    delete timeOuts.value[id];
  };

  return {
    alerts,
    add(message, type = "success", { timeout = 5000, icon = null } = {}) {
      const id = Math.random().toString(36).substring(2, 15);
      if (icon) icon = resolveComponent(`Icons${icon.substring(0,1).toUpperCase() + icon.substring(1)}`)
      alerts.value.push({
        message,
        type,
        timeout,
        icon,
        id,
        remove: () => removeAlert(id),
      });
      timeOuts.value[id] = setTimeout(() => removeAlert(id), timeout);
      return {
        remove: () => removeAlert(id)
      };
    },
    remove(id) {
      removeAlert(id);
      return this;
    },
  };
});
