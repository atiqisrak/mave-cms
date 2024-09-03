import React from "react";
import { Drawer, Row, Col, Switch, Select, Modal } from "antd";

const { Option } = Select;

const FilterDrawer = ({ visible, onClose, setFilteredUsers, users }) => {
  const handleFilterChange = (filters) => {
    // Handle the filtering logic
  };

  return (
    // <Drawer
    //   title="Filter Users"
    //   placement="right"
    //   onClose={onClose}
    //   open={visible}
    // >
    //   <Row gutter={16}>
    //     <Col span={12}>
    //       <Switch
    //         checkedChildren="Added First"
    //         unCheckedChildren="Added Last"
    //         onChange={(checked) => console.log(checked)}
    //       />
    //     </Col>
    //     <Col span={12}>
    //       <Select
    //         defaultValue="name"
    //         onChange={(value) => console.log(value)}
    //         style={{ width: "100%" }}
    //       >
    //         <Option value="name">Sort by Name</Option>
    //         <Option value="email">Sort by Email</Option>
    //         <Option value="role">Sort by Role</Option>
    //       </Select>
    //     </Col>
    //   </Row>
    // </Drawer>
    <Modal title="Filter Users" open={visible} onCancel={onClose} footer={null}>
      <Row gutter={16}>
        <Col span={12}>
          <Switch
            checkedChildren="Added First"
            unCheckedChildren="Added Last"
            onChange={(checked) => console.log(checked)}
          />
        </Col>
        <Col span={12}>
          <Select
            defaultValue="name"
            onChange={(value) => console.log(value)}
            style={{ width: "100%" }}
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
