// components/doctoapi/Confirmation/ConfirmButton.js

import React, { useState } from "react";
import { Button } from "antd";

const ConfirmButton = ({ onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <Button
      onClick={handleClick}
      loading={loading}
      className="mavebutton mt-10"
    >
      Confirm and Create Page
    </Button>
  );
};

export default ConfirmButton;
