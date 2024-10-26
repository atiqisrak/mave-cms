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
    <div className="flex justify-center">
      <Button
        onClick={handleClick}
        loading={loading}
        className="mt-10 px-20 py-12 bg-theme text-white font-bold rounded-lg border-2 border-themedark text-2xl"
      >
        Confirm and Create Page
      </Button>
    </div>
  );
};

export default ConfirmButton;
