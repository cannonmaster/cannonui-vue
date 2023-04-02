import Col from '../index';
import Row from '../../../Row/vue/index';
import { mount } from '@vue/test-utils';

test('should render Col and gutter', async () => {
  const wrapper = mount({
    components: {
      Row,
      Col,
    },
    template: `
        <Row gutter="6">
            <Col span="8">8</Col>
            <Col span="8">8</Col>
            <Col span="8">8</Col>
        </Row>
    `,
  });
  expect(wrapper.html()).toMatchSnapshot();
});
// // 右
// 1
// 2 30
// 3 24
// 0 45/44？
// -1 54？
// -2 66？
// -3
// // 左
// 0 48
// 3 26？
// -2 76

// //左
// 3 28
// 2 37
// //右
// 0 55？
// 2 34
// 3 29
// -1 68

// e2e
// //左
// 0 62
// -2 93
// //右
// -2 85
// 2 41
// 3 43
