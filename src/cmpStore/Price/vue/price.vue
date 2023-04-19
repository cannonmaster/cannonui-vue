<style lang="scss" scoped>
@import '../price.scss';
</style>
<template>
  <view
    class="cannonui-price"
    :class="{ 'is-strike': isStrike }"
  >
    <view>
      <view
        v-if="needSymbol"
        class="cannonui-price__symbol"
      >
        {{ getSymbol }}
      </view>
      <view class="cannonui-price__number">
        {{ getThousand }}
      </view>
      <view
        class="cannonui-price__point"
        v-if="decimalPoint !== 0"
      >
        .
      </view>
      <view class="cannonui-price__decimal">
        {{ getDecimal }}
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import createComponent from '@/utils/vue_component';
import { computed, toRefs } from 'vue';
const { componentName, create } = createComponent('price');
export default create({
  props: {
    isStrike: {
      type: Boolean,
      default: false
    },
    thousand: {
      type: Boolean,
      default: true
    },
    needSymbol: {
      type: Boolean,
      default: true
    },
    symbol: {
      type: String,
      default: '¥'
    },
    price: {
      type: [String, Number],
      default: 0
    },
    decimalPoint: {
      type: Number,
      default: 2
    }
  },
  emits: [],
  setup(props) {
    const { isStrike, thousand, needSymbol, symbol, price, decimalPoint } =
      toRefs(props);

    const checkPoint = (num: string | number) => {
      return String(num).indexOf('.') > -1;
    };
    const getSymbol = computed(() => {
      return symbol.value || '¥';
    });
    const getThousand = computed(() => {
      return formatThousands(price.value);
    });
    const getDecimal = computed(() => {
      return formatDecimal(price.value);
    });
    const formatDecimal = (price: string | number) => {
      let res: string | number = Number(price);
      if (checkPoint(price)) {
        res = Number(res).toFixed(decimalPoint.value);
        res = res.split('.')[1];
      }

      if (!checkPoint(price)) {
        res = String(0);
      }
      res = `0.${res}`;
      res = Number(res).toFixed(decimalPoint.value);
      res = res.substring(2, res.length);

      return res;
    };

    const formatThousands = (num: string | number) => {
      if (Number(num) == 0) return 0;
      let res: number | string = Number(num);
      if (checkPoint(res)) {
        res = String(res).split('.')[0];
      }
      if (thousand.value)
        res = String(res || 0).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      return res;
    };

    return {
      getDecimal,
      getSymbol,
      getThousand,
      isStrike
    };
  }
});
</script>
