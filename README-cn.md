# Cannonui

Cannonui 是一款基于 Vue.js 和 React 的移动端 UI 组件库，具有高质量、易用性强、扩展性好等特点。Cannonui 处于开发阶段, 会逐渐添加各种基础组件和业务组件，如按钮、表单、列表、弹窗、轮播等，。Cannonui 的目标是提速移动端开发效率。

## 特点

- ✅ **具有高质量、易用性强、扩展性好等特点。**
- ✅ **提供各种基础组件和业务组件，如按钮、表单、列表、弹窗、轮播等**

## 安装

CannonUI 可以通过 npm 安装：

```bash
npm install nutui --save
```

## 快速开始

CannonUI 的使用非常简单。在您的 Vue.js 项目中，您只需要先引入 CannonUI：

```js
import CannonUI from '@cannonui/cannonui';
import '@nutui/nutui/dist/style.css';
import { createApp } from 'vue';
import App **from** './App.vue';
import './style.css';
createApp(App).use(CannonUI).mount('#app');
```
然后在模板中使用 NutUI 组件即可：

```js
<script lang="ts">
 const state = reactive({
    imgUrl:
      '',
    title: '测试',
    price: '388',
    vipPrice: '378',
    shopDesc: '测试',
    delivery: '测试',
    shopName: '测试'
  })
  return {
    state
  }
)
</script>
<template>
  <cannonui-card :img-url="state.imgUrl" :title="state.title" :price="state.price" :vipPrice="state.vipPrice"
    :shopDesc="state.shopDesc" :delivery="state.delivery" :shopName="state.shopName">
  </cannonui-card>
</template>
<style scoped>
</style>
```

## 许可证

CannonUI 使用 MIT 许可证。


