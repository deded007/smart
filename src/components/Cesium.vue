<template>
  <div id="map"></div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, watchEffect } from "vue";
import { useDataStore } from '/src/stores/data'
const storeData = useDataStore()
import { useSettingStore } from '/src/stores/setting'
const storeSetting = useSettingStore()
import { serviceLevel2Color } from '/src/utils/domain.js';
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
// http://www.cesium.xin/cesium/cn/Documentation1.62/Viewer.html?classFilter=Viewer
window.CESIUM_BASE_URL = '/cesium';

///knock
// https://sandcastle.cesium.com/?src=3D%20Tiles%20Formats.html&label=All
//https://sandcastle.cesium.com/?src=Imagery%20Layers%20Manipulation.html&label=All
//cluster
//https://sandcastle.cesium.com/?src=Clustering.html&label=All


let layerGroupL1, layerGroupL2, layerGroupL3, layerGroupL4;

onMounted(() => {

  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMTc5YTI5OC01ZDUxLTQyMTYtYTFkMC0zOWExZjA5NDU0ZWMiLCJpZCI6MTMzMTE4LCJpYXQiOjE2ODExOTc3OTZ9.O-HMvi2nLmxKlJ_l5Yo-O12_7A-QBk115_qok8PZDuA';

  // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
  const viewer = new Cesium.Viewer('map', {
    terrainProvider: Cesium.createWorldTerrain(),
    timeline: false,
    animation: false,
    homeButton: false,
    sceneModePicker: false,
  });
  // Add Cesium OSM Buildings, a global 3D buildings layer.
  const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());



  viewer.scene.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(121.4344, 25.193, 9500),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-90.0),
    },
  });
  viewer.scene.globe.enableLighting = true;
  viewer.scene.shadowMap.enabled = true;
  viewer.scene.shadowMap.softShadows = true;


  const promise = Cesium.GeoJsonDataSource.load(storeData.geojsonFeature, {
    strokeWidth: 5,
  });

  const entities = viewer.entities;
  //layer
  ///https://sandcastle.cesium.com/?src=Show%20or%20Hide%20Entities.html&label=All
  //Create Entity "folders" to allow us to turn on/off entities as a group.
  layerGroupL1 = entities.add(new Cesium.Entity());
  layerGroupL2 = entities.add(new Cesium.Entity());
  layerGroupL3 = entities.add(new Cesium.Entity());
  layerGroupL4 = entities.add(new Cesium.Entity());

  promise
    .then(function (dataSource) {
      viewer.dataSources.add(dataSource);

      //Get the array of entities
      const entities = dataSource.entities.values;


      // 獲取所有點
      var points = entities.filter(function (entity) {
        return entity.billboard !== undefined;
      });
      points.forEach(function (point) {
        point.billboard.color = Cesium.Color.TRANSPARENT;
        point.model = {
          uri: "a.glb",
          minimumPixelSize: 52,
          maximumScale: 2000,
        };
      });


      // 獲取所有線
      var lines = entities.filter(function (entity) {
        return entity.polyline !== undefined;
      });
      lines.forEach(function (line) {
        let type = line.properties.type.getValue();
        line.polyline.material = Cesium.Color.fromCssColorString(serviceLevel2Color(type));
        // 设置线条阴影
        line.polyline.shadows = Cesium.ShadowMode.ENABLED;

        if (type == "l1")
          line.parent = layerGroupL1;
        else if (type == "l2")
          line.parent = layerGroupL2;
        else if (type == "l3")
          line.parent = layerGroupL3;
        else if (type == "l4")
          line.parent = layerGroupL4;

      });

      layerGroupL1.show = storeSetting.isL1 ? true : false;
      layerGroupL2.show = storeSetting.isL2 ? true : false;
      layerGroupL3.show = storeSetting.isL3 ? true : false;
      layerGroupL4.show = storeSetting.isL4 ? true : false;


    })
    .catch(function (error) {
      //Display any errrors encountered while loading.
      window.alert(error);
    });




  // const entity = viewer.entities.add({
  //   name: "a.glb",
  //   position: Cesium.Cartesian3.fromDegrees(
  //     121.4344, 25.193,
  //     1
  //   ),
  //   model: {
  //     uri: "a.glb",
  //     minimumPixelSize: 28,
  //     maximumScale: 200,
  //   },
  // });




  // //////////////////////////////////////

  // // 監聽entity的單擊事件
  // viewer.screenSpaceEventHandler.setInputAction(function onRightClick(movement) {
  //   var pickedObject = viewer.scene.pick(movement.position);
  //   if (Cesium.defined(pickedObject) && pickedObject.id === square) {
  //     // 創建表格元素
  //     var table = document.createElement('table');
  //     table.style.width = '100%';
  //     table.style.border = '1px solid black';
  //     // 遍歷entity的所有屬性，將其添加到表格中
  //     for (var key of square.properties["_propertyNames"]) {
  //       var value = square.properties[key].getValue();
  //       var row = table.insertRow();
  //       var cell1 = row.insertCell(0);
  //       var cell2 = row.insertCell(1);
  //       cell1.innerHTML = key;
  //       cell2.innerHTML = value;
  //     }
  //     // 創建InfoBox控件
  //     var infoBox = viewer.infoBox;
  //     infoBox.container.style.display = 'block';
  //     infoBox.viewModel.title = square.name;
  //     // infoBox.container.appendChild(table);


  //     var selectedEntity = new Cesium.Entity()
  //     selectedEntity.name = 'My Entity';
  //     console.log(table.outerHTML);
  //     selectedEntity.description = table.outerHTML; // 將描述信息設置為包含表格的HTML代碼
  //     viewer.selectedEntity = selectedEntity;
  //   };
  // }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);





})


watch(() => storeSetting.isL1,
  (newV, oldV) => {
    if (newV)
      layerGroupL1.show = true;
    else
      layerGroupL1.show = false;
  })
watch(() => storeSetting.isL2,
  (newV, oldV) => {
    if (newV)
      layerGroupL2.show = true;
    else
      layerGroupL2.show = false;
  })
watch(() => storeSetting.isL3,
  (newV, oldV) => {
    if (newV)
      layerGroupL3.show = true;
    else
      layerGroupL3.show = false;
  })
watch(() => storeSetting.isL4,
  (newV, oldV) => {
    if (newV)
      layerGroupL4.show = true;
    else
      layerGroupL4.show = false;
  })


//插入新的按鈕
const myToolbar = function () {
  const toolbar = document.querySelector("div.cesium-viewer-toolbar");
  const questionButton = document.querySelector("span.cesium-navigationHelpButton-wrapper");
  const myButton = document.createElement("button");
  myButton.classList.add("cesium-button", "cesium-toolbar-button");
  myButton.innerHTML = "X";
  //原生js沒有insertAfter，所以用這寫法
  questionButton.parentNode.insertBefore(myButton, questionButton.nextSibling);
}

// Sandcastle.addToolbarButton("Toggle Boxes", function () {
//   boxes.show = !boxes.show;
// });
</script>

<style lang="scss">
</style>
