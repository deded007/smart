<template>
  <div class="toolbar absolute top-28 right-1 z-[800]">
    <button @click="isShowServiceLevel=!isShowServiceLevel">選擇服務等級</button>
    <button @click="changeMap()">{{text23D}}</button>
    <div class="relative">
      <section
        class="panel"
        :class="isShowServiceLevel?'visible':''"
      >
        <div class="relative text-white">
          <h5 class="bg-sky-800 text-center py-1 pl-4 pr-8">選擇服務等級</h5>
          <b class="absolute top-1 right-3">X</b>
        </div>
        <div class="p-4 outline-1 outline-sky-800 outline">
          <div
            class="item-block"
            @click="storeSetting.isL1=!storeSetting.isL1"
          >
            <i
              class="fa-regular"
              :class="storeSetting.isL1?'fa-square-check text-l1':'fa-square'"
            ></i>
            <div class="bg-l1 level-text">Level 1</div>
          </div>

          <div
            class="item-block"
            @click="storeSetting.isL2=!storeSetting.isL2"
          >
            <i
              class="fa-regular"
              :class="storeSetting.isL2?'fa-square-check text-l2':'fa-square'"
            ></i>
            <div class="bg-l2 level-text">Level 2</div>
          </div>

          <div
            class="item-block"
            @click="storeSetting.isL3=!storeSetting.isL3"
          >
            <i
              class="fa-regular"
              :class="storeSetting.isL3?'fa-square-check text-l3':'fa-square'"
            ></i>
            <div class="bg-l3 level-text">Level 3</div>
          </div>

          <div
            class="item-block"
            @click="storeSetting.isL4=!storeSetting.isL4"
          >
            <i
              class="fa-regular"
              :class="storeSetting.isL4?'fa-square-check text-l4':'fa-square'"
            ></i>
            <div class="bg-l4 level-text">Level 4</div>
          </div>

        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useSettingStore } from '/src/stores/setting'
const storeSetting = useSettingStore()

const isShowServiceLevel = ref(true);
const text23D = computed(() => {
  if (storeSetting.is3D)
    return "2D";
  return "3D";
});
const changeMap = function () {
  storeSetting.is3D = !storeSetting.is3D;
}
onMounted(() => {

})

</script>

<style scoped lang="postcss">
button {
  @apply border-4 border-primary p-2 rounded-xl text-white  text-xs font-bold bg-slate-900 hover:bg-slate-700 ml-2;
}
.panel {
  margin-top: 12px;
  left: 0;
  bottom: -200px;
  width: fit-content;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 0;
}
.panel.visible {
  opacity: 1;
  bottom: 0;
}
.item-block {
  @apply mb-1 cursor-pointer flex;
}
.level-text {
  @apply text-xs rounded mb-1 ml-2 w-3/4 pl-2 inline-block;
}
</style>
