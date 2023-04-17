<template>
  <pre class="center">
    {{setting}}
  </pre>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useSettingStore } from '/src/stores/setting'
const storeSetting = useSettingStore()

const setting = computed(() => {
  console.log(storeSetting);

  return JSON.stringify(storeSetting, null, 2);
})
onMounted(() => {




})

</script>

<style lang="scss">
</style>
