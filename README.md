# CannonUI

[![License: MIT](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)

CannonUI is a mobile UI component library based on Vue 3 and typescript, characterized by high quality, strong usability, and good extensibility. CannonUI is in the development stage and will gradually add various basic and business components, such as buttons, forms, lists, popups, carousels, etc. CannonUI's goal is to speed up mobile development efficiency.

## Features

- ✅ **Characterized by high quality, strong usability, and good extensibility.**
- ✅ **Provides various basic and business components, such as buttons, forms, lists, popups, carousels, etc.**

## Installation

CannonUI for vue can be installed via npm:

```bash
npm install @cannonui/vue --save
```

## Quick Start

Using CannonUI is very simple. In your Vue.js project, you only need to first import CannonUI: 

```js
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import CannonUI from '@cannonui/vue';
import '@cannonui/vue/style.css';

createApp(App).use(CannonUI).mount('#app');
```
Then you could use the CannonUI component in the template such as:

```vue
<script lang="ts">
 const state = reactive({
    imgUrl:
      '',
    title: 'test',
    price: '388',
    vipPrice: '368',
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

Cannonui is licensed under the [MIT license](https://opensource.org/licenses/MIT).


