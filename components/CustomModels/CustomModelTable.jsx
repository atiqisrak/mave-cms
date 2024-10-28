// components/CustomModels/CustomModelTable.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Collapse, Divider } from "antd";
import EditForm from "./EditForm";
import instance from "../../axios";
import {
  CheckCircleFilled,
  CopyOutlined,
  DeleteOutlined,
  EditFilled,
} from "@ant-design/icons";

const CustomModelTable = ({ model }) => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    model && setData(model);
  }, [model]);

  console.log("Model", model);

  return (
    <div>
      {/* model preview */}
      <div
        key={model.id}
        className="bg-white p-4 border border-gray-300 rounded-lg mb-4 flex flex-col justify-center items-center"
      >
        <div>
          <h2 className="text-center mb-6 w-full text-theme text-2xl">
            {model.model_name}
          </h2>
          <div>
            <div className="border-b-2 border-gray-500 grid grid-cols-2 justify-between items-center w-full text-xl font-semibold gap-6">
              <span>Field Name</span>
              <span className="text-theme">Type</span>
            </div>
            {model?.fields?.map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-2 justify-between items-center w-full text-xl font-semibold gap-6"
              >
                <span>{field.name}</span>
                <span className="text-theme">{field.type}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <code className="bg-gray-100 p-2 rounded-lg">{model.api_route}</code>
          <Button
            icon={<CopyOutlined />}
            onClick={() => {
              const url = `${process.env.NEXT_PUBLIC_DYNAMIC_MODEL_URL}${model.api_route}`;
              navigator.clipboard.writeText(url);
              message.success("Copied to clipboard!");
            }}
          />
        </div>
      </div>
      {/* model data */}
    </div>
  );
};

export default CustomModelTable;
