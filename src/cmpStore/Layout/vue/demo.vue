<template>
  <div class="demo">
    <div class="box-item">
      <Row>
        <Col span="8">
          <div class="flex-content">span:8</div>
        </Col>
        <Col span="8">
          <div class="flex-content">span:8</div>
        </Col>
        <Col span="8">
          <div class="flex-content">span:8</div>
        </Col>
      </Row>
    </div>
    <div class="box-item">
      <Row>
        <Col span="24">
          <div class="flex-content">span:24</div>
        </Col>
      </Row>
    </div>
    <div class="box-item">
      <Row gutter="20">
        <Col span="12">
          <div class="flex-content">span:12</div>
        </Col>
        <Col span="12">
          <div class="flex-content">span:12</div>
        </Col>
      </Row>
    </div>
    <div class="box-item">
      <Row gutter="20">
        <Col span="8">
          <div class="flex-content">span:8</div>
        </Col>
        <Col span="8">
          <div class="flex-content">span:8</div>
        </Col>
        <Col span="8">
          <div class="flex-content">span:8</div>
        </Col>
      </Row>
    </div>
    <div class="box-item">
      <Row gutter="20">
        <Col
          span="8"
          offset="2"
        >
          <div class="flex-content">span:8</div>
        </Col>
        <Col span="6">
          <div class="flex-content">span:2</div>
        </Col>
        <Col span="8">
          <div class="flex-content">span:8</div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../demo.scss';
</style>
<script lang="ts">
import Col from '@/cmpStore/Col/vue';
import Row from '@/cmpStore/Row/vue';
export default {
  components: { Row, Col },
  setup(props) {}
};
</script>
