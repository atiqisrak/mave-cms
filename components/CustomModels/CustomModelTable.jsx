// components/CustomModels/CustomModelTable.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Collapse, Divider } from "antd";
import instance from "../../axios";
import {
  CheckCircleFilled,
  CopyOutlined,
  DeleteOutlined,
  EditFilled,
} from "@ant-design/icons";
import CustomModelData from "./CustomModelData";

const CustomModelTable = ({ model }) => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    model && setData(model);
  }, [model]);

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
          <Collapse ghost>
            <Collapse.Panel header={`${model.model_name} fields`} key="1">
              <Table
                dataSource={model.fields}
                columns={[
                  {
                    title: "Field Name",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Type",
                    dataIndex: "type",
                    key: "type",
                  },
                ]}
                pagination={false}
                rowKey="name"
              />
            </Collapse.Panel>
          </Collapse>
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
      <CustomModelData model={model} />
    </div>
  );
};

export default CustomModelTable;
