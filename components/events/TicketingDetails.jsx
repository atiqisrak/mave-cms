// components/events/TicketingDetails.jsx

import { Form, Input, Button, Select, Space, DatePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { Option } = Select;

const TicketingDetails = ({ form }) => {
  const ticketTypeOptions = ["Paid", "Free", "On-Site"];

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
                    disabled
                  >
                    <Option
                      value={form.getFieldValue(["ticketTypes", name, "type"])}
                    >
                      {form.getFieldValue(["ticketTypes", name, "type"])}
                    </Option>
                  </Select>
                </Form.Item>
                {form.getFieldValue(["ticketTypes", name, "type"]) !==
                  "Free" && (
                  <Form.Item
                    {...restField}
                    name={[name, "price"]}
                    rules={[
                      { required: true, message: "Please enter ticket price" },
                    ]}
                  >
                    <Input placeholder="Price" type="number" min={0} />
                  </Form.Item>
                )}
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                // type="dashed"
                className="mavebutton"
                onClick={() => {
                  const addedTypes = fields.map((field) =>
                    form.getFieldValue(["ticketTypes", field.name, "type"])
                  );
                  const availableTypes = ticketTypeOptions.filter(
                    (type) => !addedTypes.includes(type)
                  );
                  if (availableTypes.length > 0) {
                    add({ type: availableTypes[0] });
                  }
                }}
                block
                icon={<PlusOutlined />}
                disabled={fields.length >= ticketTypeOptions.length}
              >
                Add Ticket Type
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item
        name="bookingDuration"
        label="Ticket Booking Duration"
        rules={[{ required: true, message: "Please select booking duration" }]}
      >
        {/* <Input placeholder="Booking start and end dates" /> */}
        <DatePicker.RangePicker
          showTime={{ format: "HH:mm A" }}
          format="YYYY-MM-DD HH:mm A"
        />
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
                  preserve={true}
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
                  preserve={true}
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
                  preserve={true}
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
                  preserve={true}
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
            <Form.Item preserve={true}>
              <Button
                // type="dashed"
                className="mavebutton"
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
