<template>
  <main>
    <header class="items-center flex bg-primary">
      <h1 class="text-left pl-4 text-2xl">平臺</h1>
    </header>
    <section>
      <aside>
        <ul
          class="menu bg-primary"
          :class="{ open: storeSetting.isShowAside }"
        >
          <li><a>簡介</a></li>
          <li><a>流程</a></li>
          <li><a>地圖</a></li>
          <li><a>應用服務數據彙集</a></li>
        </ul>
        <div
          class="switch"
          @click.self="toggleMenu"
        ></div>
      </aside>
      <toolbar />
      <component
        class="map"
        :is="mapType"
      ></component>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, watch, computed, reactive } from "vue";
import { useSettingStore } from '/src/stores/setting'
const storeSetting = useSettingStore()
import Toolbar from "./components/Toolbar.vue";
import DebugerMap from "./components/DebugerMap.vue";
import Leaflet from "./components/Leaflet.vue";
import Cesium from "./components/Cesium.vue";

const mapType = computed(() => {
  if (storeSetting.isTest)
    return DebugerMap;
  if (storeSetting.is3D)
    return Cesium;
  return Leaflet;
})
function toggleMenu() {
  storeSetting.isShowAside = !storeSetting.isShowAside;
}
</script>

<style lang="scss">
:root {
  --header-height: 60px;
}
header {
  z-index: 800;
  height: var(--header-height);
  color: #fff;
  text-align: center;
  line-height: var(--header-height);
}

aside {
  outline: solid 2px gray;
  z-index: 800;
  position: absolute;
  background-color: blue;
}
.menu {
  transition: width 0.5s ease-in-out;
  overflow: hidden;
  box-sizing: border-box;
  width: 0;
  color: white;
  position: relative;
  &.open {
    width: fit-content;
  }
  li {
    padding: 16px;
    white-space: nowrap;
  }
}
///todo:說好的動畫呢
.switch {
  display: block;
  width: 36px;
  height: 36px;
  background-color: #333;
  color: #fff;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: -38px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  outline: 2px gray solid;
  z-index: 2;
  &:before {
    content: ">";
  }
}
.open + .switch:before {
  content: "<";
}

.map {
  width: 100vw;
  height: calc(100vh - var(--header-height));
}
</style>
