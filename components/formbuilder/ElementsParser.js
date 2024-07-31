import React from "react";
import {
  Input,
  Select,
  DatePicker,
  Button,
  Form,
  Tooltip,
  Radio,
  Switch,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import RichTextEditor from "../../components/RichTextEditor";

const { Option } = Select;

export default function ElementsParser({ element }) {
  return (
    <Form labelCol={{ span: 8 }} layout="vertical">
      <Form.Item
        key={element._id}
        name={element.input_name}
        label={element.label}
        rules={[{ required: element.required, message: element.help_text }]}
        tooltip={
          element.help_text ? (
            <Tooltip title={element.help_text}>
              <InfoCircleOutlined />
            </Tooltip>
          ) : null
        }
      >
        {(() => {
          switch (element.element_type) {
            case "input":
              switch (element.input_type) {
                case "text":
                  return <Input placeholder={element.placeholder} />;
                case "number":
                  return (
                    <Input type="number" placeholder={element.placeholder} />
                  );
                case "email":
                  return (
                    <Input type="email" placeholder={element.placeholder} />
                  );
                case "password":
                  return <Input.Password placeholder={element.placeholder} />;
                case "date":
                  return <DatePicker placeholder={element.placeholder} />;
                case "radio":
                  return (
                    <Radio.Group>
                      {element?.options?.map((option) => (
                        <Radio key={option._id} value={option.value}>
                          {option.title}
                        </Radio>
                      ))}
                    </Radio.Group>
                  );
                case "submit":
                  return (
                    <Button type="primary">{element.default_value}</Button>
                  );
                default:
                  return <Input placeholder={element.placeholder} />;
              }
            case "textarea":
              return <RichTextEditor editMode={true} />;
            case "select":
              return (
                <Select placeholder={element.placeholder}>
                  {element?.options?.map((option) => (
                    <Option key={option._id} value={option.value}>
                      {option.title}
                    </Option>
                  ))}
                </Select>
              );
          }
        })()}
      </Form.Item>
    </Form>
  );
}