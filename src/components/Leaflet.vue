<template>
  <div id="map1"></div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, watchEffect } from "vue";
import { useDataStore } from '/src/stores/data'
const storeData = useDataStore()
import { useSettingStore } from '/src/stores/setting'
const storeSetting = useSettingStore()
import { serviceLevel2Color } from '/src/utils/domain.js';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet-easybutton';


let map = reactive(null);
let layerGroupL1, layerGroupL2, layerGroupL3, layerGroupL4;
onMounted(() => {
  //init
  map = L.map('map1', {
    center: [25.193, 121.4344],
    zoom: 14,
    zoomControl: false
  });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.control.zoom({
    position: 'bottomright'
  }).addTo(map);

  // 定义一个空的图层组
  layerGroupL1 = L.layerGroup().addTo(map);
  layerGroupL2 = L.layerGroup().addTo(map);
  layerGroupL3 = L.layerGroup().addTo(map);
  layerGroupL4 = L.layerGroup().addTo(map);

  //https://stackoverflow.com/questions/39485623/leaflet-json-icons
  L.geoJSON(storeData.geojsonFeature, {
    onEachFeature: function (feature, layer) {
      //線加入圖層
      if (feature.geometry.type == "LineString") {
        if (feature.properties.type == "l1")
          layerGroupL1.addLayer(layer);
        if (feature.properties.type == "l2")
          layerGroupL2.addLayer(layer);
        if (feature.properties.type == "l3")
          layerGroupL3.addLayer(layer);
        if (feature.properties.type == "l4")
          layerGroupL4.addLayer(layer);
      }
    },

    //point換圖示
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        icon: L.icon({
          iconUrl: `images/${feature.properties.type}.png`,
          iconSize: [36, 36], // size of the icon
        })
      });
    },
    //線加顏色
    style: function (feature) {
      //https://leafletjs.com/reference.html#path-weight
      return { color: serviceLevel2Color(feature.properties.type), weight: '8' };
    }
  }).bindPopup(function (layer) {
    return layer.feature.properties.description;
  }).addTo(map);

  // L.easyButton('far fa-ey', function () {
  //   if (map.hasLayer(layerGroupL1)) {
  //     map.removeLayer(layerGroupL1);
  //   } else {
  //     map.addLayer(layerGroupL1);
  //   }
  // }).addTo(map);

  // var toggleButton = L.easyButton('far fa-eye', function () {
  //   if (map.hasLayer(layerGroupL1)) {
  //     map.removeLayer(layerGroupL1);
  //   } else {
  //     map.addLayer(layerGroupL1);
  //   }
  // });
  // toggleButton.addTo(map);

  if (storeSetting.isL1)
    map.addLayer(layerGroupL1);
  else
    map.removeLayer(layerGroupL1);

  if (storeSetting.isL2)
    map.addLayer(layerGroupL2);
  else
    map.removeLayer(layerGroupL2);

  if (storeSetting.isL3)
    map.addLayer(layerGroupL3);
  else
    map.removeLayer(layerGroupL3);

  if (storeSetting.isL4)
    map.addLayer(layerGroupL4);
  else
    map.removeLayer(layerGroupL4);

})

//todo:能改用subscribe嗎
watch(() => storeSetting.isL1,
  (newV, oldV) => {
    if (oldV && map.hasLayer(layerGroupL1)) {
      map.removeLayer(layerGroupL1);
    } else {
      map.addLayer(layerGroupL1);
    }
  })
watch(() => storeSetting.isL2,
  (newV, oldV) => {
    if (oldV && map.hasLayer(layerGroupL2)) {
      map.removeLayer(layerGroupL2);
    } else {
      map.addLayer(layerGroupL2);
    }
  })
watch(() => storeSetting.isL3,
  (newV, oldV) => {
    if (oldV && map.hasLayer(layerGroupL3)) {
      map.removeLayer(layerGroupL3);
    } else {
      map.addLayer(layerGroupL3);
    }
  })
watch(() => storeSetting.isL4,
  (newV, oldV) => {
    if (oldV && map.hasLayer(layerGroupL4)) {
      map.removeLayer(layerGroupL4);
    } else {
      map.addLayer(layerGroupL4);
    }
  })

</script>

<style lang="scss">
</style>
