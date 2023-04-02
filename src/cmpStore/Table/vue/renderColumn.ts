import { join } from 'path';
import { defineComponent, h, PropType } from 'vue';

export default defineComponent({
  setup(props) {
    return () =>
      h('view', {}, props.render ? props.render(props.data) : props.value);
  },
  props: {
    data: {
      type: Object,
      default: {},
    },
    value: {
      type: [String, Number],
      default: '',
    },
    render: {
      type: [Function],
      default: undefined,
    },
  },
});
