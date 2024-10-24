// components/slider/SliderForm/BasicInfoForm.jsx

import React from "react";
import { Form, Input } from "antd";
import RichTextEditor from "../../RichTextEditor";

const BasicInfoForm = () => (
  <>
    {/* Title in English */}
    <Form.Item
      label="Title English"
      name="title_en"
      rules={[
        { required: true, message: "Please enter the title in English." },
      ]}
    >
      <Input placeholder="Enter title in English" />
    </Form.Item>

    {/* Title in Bangla */}
    <Form.Item
      label="Title Bangla"
      name="title_bn"
      rules={[{ required: true, message: "Please enter the title in Bangla." }]}
    >
      <Input placeholder="Enter title in Bangla" />
    </Form.Item>

    {/* Description in English */}
    <Form.Item
      label="Description English"
      name="description_en"
      rules={[
        {
          required: true,
          message: "Please enter the description in English.",
        },
      ]}
    >
      <RichTextEditor editMode={true} />
    </Form.Item>

    {/* Description in Bangla */}
    <Form.Item
      label="Description Bangla"
      name="description_bn"
      rules={[
        {
          required: true,
          message: "Please enter the description in Bangla.",
        },
      ]}
    >
      <RichTextEditor editMode={true} />
    </Form.Item>
  </>
);

export default BasicInfoForm;
