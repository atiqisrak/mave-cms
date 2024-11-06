import { Button, Drawer, Form, Input } from "antd";

export default function ModelDataForm({
  fields,
  customModelData,
  setCustomModelData,
  createModeVisible,
  setCreateModeVisible,
}) {
  return (
    <div>
      <Drawer
        title="Create New Model Data"
        width={720}
        onClose={() => setCreateModeVisible(false)}
        open={createModeVisible}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              onClick={() => setCreateModeVisible(false)}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button onClick={() => setCreateModeVisible(false)} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        {fields?.map((field) => (
          <Form.Item
            key={field.name}
            label={field.name}
            name={field.name}
            rules={[
              {
                required: field.required,
                message: `Please input ${field.name}!`,
              },
            ]}
          >
            <Input
              value={customModelData[field.name]}
              onChange={(e) => {
                setCustomModelData({
                  ...customModelData,
                  [field.name]: e.target.value,
                });
              }}
            />
          </Form.Item>
        ))}
      </Drawer>
    </div>
  );
}
