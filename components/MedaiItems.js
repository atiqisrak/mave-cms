import { Button, Collapse, Form, Input } from 'antd';
import React from 'react';

const MediaItems = () => {
    return (
        <Form
            form={form}
            name="createSlider"
            onFinish={handleSubmit}
            style={{
              marginTop: "10em",
              maxWidth: 600,
              margin: "0 auto",
            }}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item hasFeedback label="Title English" name="title_e">
              <Input placeholder="Enter title in English" />
            </Form.Item>
            <Form.Item hasFeedback label="Title Bangla" name="title_b">
              <Input placeholder="Enter title in Bangla" />
            </Form.Item>
            <Form.Item hasFeedback label="Media" name="title_m">
              <Collapse accordion ghost items={items}></Collapse>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
    );
};

export default MediaItems;