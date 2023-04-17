import { defineStore } from "pinia";
export const useSettingStore = defineStore("setting", {
  state: () => {
    return {
      isTest: false,
      isShowAside: false,
      is3D: true,
      isL1: true,
      isL2: true,
      isL3: true,
      isL4: true,
    };
  },
});
