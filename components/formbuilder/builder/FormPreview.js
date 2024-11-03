import React from "react";
import { Form, Input, Select, DatePicker, Button, Radio } from "antd";
import ElementsParser from "../ElementsParser";

const { Option } = Select;

const FormPreview = ({ formMeta, formAttributes, formElements }) => {
  return (
    <Form
      id={formAttributes.component_id}
      className={formAttributes.component_class}
      method={formAttributes.method}
      action={formAttributes.action_url}
      encType={formAttributes.enctype}
      layout="vertical"
    >
      <h3 className="text-2xl font-bold">{formMeta.title}</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: formMeta.description,
        }}
      ></div>
      {formElements?.map((element, index) => (
        <ElementsParser key={index} element={element} />
      ))}
    </Form>
  );
};

export default FormPreview;
