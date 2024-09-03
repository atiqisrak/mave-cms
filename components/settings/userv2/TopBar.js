import React from "react";
import { Row, Col, Select, Button, Input, Popconfirm, Checkbox } from "antd";
import { FilterOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const TopBar = ({
  selectedRowKeys,
  onSearch,
  onDelete,
  setIsFilterDrawerVisible,
}) => {
  return (
    <Row gutter={16} style={{ marginBottom: "1rem" }}>
      <Col span={4}>
        <Checkbox onChange={(e) => console.log(e.target.checked)}>
          Select All
        </Checkbox>
      </Col>
      <Col span={4}>
        <Select defaultValue="10" style={{ width: "100%" }}>
          <Option value="10">10 Rows</Option>
          <Option value="20">20 Rows</Option>
          <Option value="30">30 Rows</Option>
        </Select>
      </Col>
      <Col span={4}>
        <Button
          icon={<FilterOutlined />}
          onClick={() => setIsFilterDrawerVisible(true)}
        >
          Filter
        </Button>
      </Col>
      <Col span={4}>
        <Popconfirm
          title="Are you sure to delete selected users?"
          onConfirm={onDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button
            icon={<DeleteOutlined />}
            danger
            disabled={!selectedRowKeys.length}
          >
            Delete
          </Button>
        </Popconfirm>
      </Col>
      <Col span={8}>
        <Input.Search
          placeholder="Search by name"
          onChange={(e) => onSearch(e.target.value)}
        />
      </Col>
    </Row>
  );
};

export default TopBar;
