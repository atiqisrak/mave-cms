// components/events/TicketingDetails.jsx

import { Form, Input, Button, Select, Switch, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
const { Option } = Select;

const TicketingDetails = ({ form }) => {
  return (
    <>
      <Form.List name="ticketTypes">
        {(fields, { add, remove }) => (
          <>
            <label className="block text-lg font-medium mb-2">
              Ticket Types
            </label>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                align="baseline"
                className="flex items-center mb-4"
              >
                <Form.Item
                  {...restField}
                  name={[name, "type"]}
                  rules={[{ required: true, message: "Missing ticket type" }]}
                >
                  <Select
                    placeholder="Select ticket type"
                    style={{ width: 150 }}
                  >
                    <Option value="Paid">Paid</Option>
                    <Option value="Free">Free</Option>
                    <Option value="On-Site">On-Site</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "quantity"]}
                  rules={[{ required: true, message: "Missing quantity" }]}
                >
                  <Input placeholder="Quantity" type="number" min={1} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Ticket Type
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item
        name={["pricing", "onSite"]}
        label="On-Site Ticket Price"
        rules={[
          { required: true, message: "Please enter the on-site ticket price" },
        ]}
      >
        <Input type="number" min={0} placeholder="Enter on-site ticket price" />
      </Form.Item>

      <Form.Item
        name={["pricing", "online"]}
        label="Online Ticket Price"
        rules={[
          { required: true, message: "Please enter the online ticket price" },
        ]}
      >
        <Input type="number" min={0} placeholder="Enter online ticket price" />
      </Form.Item>

      <Form.Item
        name="bookingDuration"
        label="Ticket Booking Duration"
        rules={[{ required: true, message: "Please select booking duration" }]}
      >
        <Input placeholder="Booking start and end dates" />
      </Form.Item>

      <Form.List name="promoCodes">
        {(fields, { add, remove }) => (
          <>
            <label className="block text-lg font-medium mb-2">
              Promo Codes
            </label>
            {fields?.map(({ key, name, ...restField }) => (
              <Space key={key} align="baseline" className="flex flex-col mb-4">
                <Form.Item
                  {...restField}
                  name={[name, "code"]}
                  label="Code"
                  rules={[
                    { required: true, message: "Please enter promo code" },
                  ]}
                >
                  <Input placeholder="Enter promo code" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "usageLimit"]}
                  label="Usage Limit"
                  rules={[
                    { required: true, message: "Please enter usage limit" },
                  ]}
                >
                  <Input
                    type="number"
                    min={1}
                    placeholder="Enter usage limit"
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "discountType"]}
                  label="Discount Type"
                  rules={[
                    { required: true, message: "Please select discount type" },
                  ]}
                >
                  <Select placeholder="Select discount type">
                    <Option value="Percentage">Percentage</Option>
                    <Option value="Amount">Amount</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "discountValue"]}
                  label="Discount Value"
                  rules={[
                    { required: true, message: "Please enter discount value" },
                  ]}
                >
                  <Input
                    type="number"
                    min={0}
                    placeholder="Enter discount value"
                  />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Promo Code
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default TicketingDetails;
