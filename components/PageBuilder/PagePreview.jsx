import { Modal } from "antd";
import React from "react";

const PagePreview = ({ pageData, open, setOpen }) => {
  return (
    <div>
      <Modal
        title="Page Preview"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={1000}
      >
        <div>
          {/* Display the page data here */}
          <pre>{JSON.stringify(pageData?.body, null, 2)}</pre>
        </div>
      </Modal>
    </div>
  );
};

export default PagePreview;
