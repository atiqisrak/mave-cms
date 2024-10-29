// components/Gallery/PaginationComponent.jsx

import React from "react";
import { Pagination } from "antd";

const PaginationComponent = ({ current, pageSize, total, onChange }) => {
  return (
    <div className="pagination-container flex justify-center mt-4">
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={false}
        responsive
      />
    </div>
  );
};

export default PaginationComponent;
