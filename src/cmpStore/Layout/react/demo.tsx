import React from 'react';
import { Layout } from './layout';
import Row from '@/cmpStore/Row/react';
import Col from '@/cmpStore/Col/react';
import '../demo.scss';
const LayoutDemo = () => {
  return (
    <>
      <div className="demo">
        <div className="box-item">
          <Row>
            <Col span="8">
              <div className="flex-content">span:8</div>
            </Col>
            <Col span="8">
              <div className="flex-content">span:8</div>
            </Col>
            <Col span="8">
              <div className="flex-content">span:8</div>
            </Col>
          </Row>
        </div>
        <div className="box-item">
          <Row>
            <Col span="24">
              <div className="flex-content">span:24</div>
            </Col>
          </Row>
        </div>
        <div className="box-item">
          <Row gutter="20">
            <Col span="12">
              <div className="flex-content">span:12</div>
            </Col>
            <Col span="12">
              <div className="flex-content">span:12</div>
            </Col>
          </Row>
        </div>
        <div className="box-item">
          <Row gutter="20">
            <Col span="8">
              <div className="flex-content">span:8</div>
            </Col>
            <Col span="8">
              <div className="flex-content">span:8</div>
            </Col>
            <Col span="8">
              <div className="flex-content">span:8</div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default LayoutDemo;
