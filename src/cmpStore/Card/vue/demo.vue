<style lang="scss" scoped>
.prolist-tag-group {
  display: flex;
  gap: 6px;
  margin: 6px 0 1px;

  .prolist-tag {
    background-color: #f2f2f6;
    color: #666;
    padding: 0px 5px;
    font-size: 10px;
  }
}

.custom-desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  overflow: hidden;
  word-break: break-all;
}

.custom-footer {
  font-size: 12px;
}
</style>
<template>
  <div class="phone">
    <div class="phone-top">Skeleton</div>
    <div class="phone-content">
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ state.h2_title.basic }}</h2>
        <section class="cmp-usage__section--showcase">
          <Card
            :img-url="state.imgUrl"
            :title="state.title"
            :price="state.price"
            :vipPrice="state.vipPrice"
            :shopDesc="state.shopDesc"
            :delivery="state.delivery"
            :shopName="state.shopName"
            :symbol="state.symbol"
          >
          </Card>
        </section>
      </section>
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">
          {{ state.h2_title.custom_prolist_tag }}
        </h2>
        <section class="cmp-usage__section--showcase">
          <Card
            :img-url="state.imgUrl"
            :title="state.title"
            :price="state.price"
            :vipPrice="state.vipPrice"
            :shopDesc="state.shopDesc"
            :delivery="state.delivery"
            :shopName="state.shopName"
            :symbol="state.symbol"
          >
            <template #prolist>
              <div class="prolist-tag-group">
                <span
                  class="prolist-tag"
                  v-for="item in state.prolist"
                  >{{ item }}</span
                >
              </div>
            </template>
          </Card>
        </section>
      </section>
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ state.h2_title.custom_shop_desc }}</h2>
        <section class="cmp-usage__section--showcase">
          <Card
            :img-url="state.imgUrl"
            :title="state.title"
            :price="state.price"
            :vipPrice="state.vipPrice"
            :shopDesc="state.shopDesc"
            :delivery="state.delivery"
            :shopName="state.shopName"
            :symbol="state.symbol"
          >
            <template #shop-custom-desc>
              <div class="custom-desc">
                {{ state.shopCustomDesc }}
              </div>
            </template>
          </Card>
        </section>
      </section>
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ state.h2_title.custom_footer }}</h2>
        <section class="cmp-usage__section--showcase">
          <Card
            :img-url="state.imgUrl"
            :title="state.title"
            :price="state.price"
            :vipPrice="state.vipPrice"
            :shopDesc="state.shopDesc"
            :delivery="state.delivery"
            :shopName="state.shopName"
            :symbol="state.symbol"
          >
            <template #footer>
              <div class="custom-footer">
                {{ state.shopCustomFooter }}
              </div>
            </template>
          </Card>
        </section>
      </section>
    </div>
    <div class="phone-bottom"></div>
  </div>
</template>

<script lang="ts">
interface Translation {
  [key: string]: {
    [key: string]: string | string[];
  };
}
import { reactive } from 'vue';
import Card from './card.vue';
const translation: Translation = {
  en: {
    h2_title: {
      basic: 'Basic',
      custom_prolist_tag: 'Custom Prolist Tag',
      custom_shop_desc: 'Custom Shop Desc',
      custom_footer: 'Custom Action'
    },
    imgUrl: 'https://placehold.co/300x300',
    title:
      'wild Alaskan salmon is packed with omega-3s, vitamin D, and other essential nutrients for a delicious and nutritious addition to any meal dshkjewirdskjmhfuierjksdfhkdjsfdjksfhdksjfhdskfdhsfkjdsf',
    price: '388',
    vipPrice: '378',
    shopDesc: 'self-operated',
    delivery: 'free delivery',
    shopName: 'The Fishmen Catch',
    shopCustomDesc:
      'Fresh and sustainably caught seafood shop. Wide variety of high-quality seafood. Knowledgeable staff to assist with cooking tips and recipes.',
    shopCustomFooter: 'custom footer',
    priceSymbol: '$',
    prolist: ['jumbo', 'wild-caught']
  },
  'zh-CN': {
    h2_title: {
      basic: '基本使用',
      custom_prolist_tag: '自定义标签',
      custom_shop_desc: '自定义店铺描述',
      custom_footer: '自定义右下角'
    },
    imgUrl: 'https://placehold.co/300x300',
    title: '老海公黄鱼酥 酥脆零食高钙高蛋白营养即食小黄鱼干60g/袋组合装',
    price: '388',
    vipPrice: '378',
    shopDesc: '自营',
    shopCustomDesc:
      '新鲜且以可持续方式捕捞的海鲜商店。提供多样化的高品质海鲜。有知识渊博的工作人员提供烹饪技巧和食谱建议。',
    shopCustomFooter: '自定义右下角',
    delivery: '厂商配送',
    shopName: '渔夫海鲜旗舰店',
    prolist: ['礼盒', '国产']
  }
};
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  emits: [],
  components: { Card },
  setup(props) {
    const { lang } = props;
    const state = reactive({
      ...(translation[lang] as unknown as Translation),
      symbol: lang === 'en' ? '$' : ''
    });
    return {
      state
    };
  }
};
</script>
