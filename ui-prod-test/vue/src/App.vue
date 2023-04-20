<script lang="ts">
import { onMounted, reactive, ref } from 'vue';
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  emits: [],
  components: {},
  setup(props) {
    const loading = ref(true);
    const state = reactive({
      title: 'Title',
      content: `The Skeleton component can be used to improve the user experience of
          your application by providing visual feedback while content is being
          loaded. This can reduce the perceived loading time and make your
          application feel more responsive.`
    });
    onMounted(() => {
      // mock async req
      setTimeout(() => {
        loading.value = false;
      }, 3000);
    });
    return {
      loading,
      state
    };
  }
};
</script>

<template>
  <div class="phone">
    <div class="phone-top">Card</div>
    <div class="phone-content">
      <section class="cmp-usage__section--showcase">
        <cannonui-skeleton
          row="3"
          animated
          round
          title
          :loading="loading"
          height="16px"
          width="300px"
        >
          <div
            class="content"
            style="width: 300px"
          >
            <h4 class="content--title">{{ state.title }}</h4>
            <div class="content--desc">
              {{ state.content }}
            </div>
          </div>
        </cannonui-skeleton>
      </section>
    </div>
    <div class="phone-bottom"></div>
  </div>
</template>

<style scoped>
.content--title {
  font-size: 1rem;
}
.content--desc {
  font-size: 0.8rem;
}
</style>
