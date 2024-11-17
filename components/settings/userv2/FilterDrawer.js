import React, { useState, useEffect } from "react";
import { Row, Col, Switch, Select, Modal } from "antd";

const { Option } = Select;

const FilterDrawer = ({ visible, onClose, setFilteredUsers, users = [] }) => {
  // Default to empty array if users is undefined
  const [addedFirst, setAddedFirst] = useState(true);
  const [sortField, setSortField] = useState("name");

  // Handle filtering and sorting logic
  const handleFilterChange = () => {
    if (!users || !Array.isArray(users)) return; // Ensure users is an array

    let filtered = [...users];

    // Sorting by Added First/Last
    if (!addedFirst) {
      filtered = filtered.reverse();
    }

    // Sorting by field (name, email, role)
    filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [addedFirst, sortField, users]);

  return (
    <Modal title="Filter Users" open={visible} onCancel={onClose} footer={null}>
      <Row gutter={16}>
        <Col span={12}>
          <Switch
            checkedChildren="Added First"
            unCheckedChildren="Added Last"
            checked={addedFirst}
            onChange={(checked) => setAddedFirst(checked)}
          />
        </Col>
        <Col span={12}>
          <Select
            defaultValue="name"
            onChange={(value) => setSortField(value)}
            style={{ width: "100%" }}
            showSearch
          >
            <Option value="name">Sort by Name</Option>
            <Option value="email">Sort by Email</Option>
            <Option value="role">Sort by Role</Option>
          </Select>
        </Col>
      </Row>
    </Modal>
  );
};

export default FilterDrawer;
