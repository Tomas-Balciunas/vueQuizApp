import { defineStore } from "pinia";

export const useNotifStore = defineStore("notif", {
  state: () => ({
    notif: "",
  }),
  actions: {
    showNotif(msg: string) {
      this.notif = msg;
    },
  },
});