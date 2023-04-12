# Cannonui

Cannonui is a mobile UI component library based on Vue.js and React, characterized by high quality, strong usability, and good extensibility. Cannonui is in the development stage and will gradually add various basic and business components, such as buttons, forms, lists, popups, carousels, etc. Cannonui's goal is to speed up mobile development efficiency.

## Features

- ✅ **Characterized by high quality, strong usability, and good extensibility.**
- ✅ **Provides various basic and business components, such as buttons, forms, lists, popups, carousels, etc.**

## Installation

Cannonui can be installed via npm:

```bash
npm install nutui --save
```

## Quick Start

Using Cannonui is very simple. In your Vue.js project, you only need to first import Cannonui:

```js
import CannonUI from '@cannonui/cannonui';
import '@nutui/nutui/dist/style.css';
import { createApp } from 'vue';
import App **from** './App.vue';
import './style.css';
createApp(App).use(CannonUI).mount('#app');
```
Then you can use the NutUI component in the template:

```js
<script lang="ts">
 const state = reactive({
    imgUrl:
      '',
    title: 'test',
    price: '388',
    vipPrice: '378',
    shopDesc: 'test',
    delivery: 'test',
    shopName: 'test'
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

## License

Cannonui is licensed under the MIT license.


