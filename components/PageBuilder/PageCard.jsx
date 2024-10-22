// components/PageBuilder/PageCard.jsx

import {
  CloseCircleOutlined,
  DeleteFilled,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, message, Popconfirm } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/router";
import PageInfoDisplay from "./PageInfoDisplay";
import PageEditForm from "./PageEditForm";

const PageCard = ({
  page,
  handleExpand,
  expandedPageId,
  handleDeletePage,
  handleEditPageInfo,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const confirmEdit = (updatedData) => {
    handleEditPageInfo(updatedData);
    setIsEditing(false);
  };

  return (
    <Card
      title={`Page ID-${page.id} : ${page.page_name_en}`}
      extra={
        <div className="flex space-x-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => router.push(`/page-builder/${page.id}`)}
            className="mavebutton"
          >
            Edit Page
          </Button>
          <Button
            type="default"
            icon={
              expandedPageId === page.id ? (
                <CloseCircleOutlined />
              ) : (
                <PlusCircleOutlined />
              )
            }
            onClick={() => handleExpand(page.id)}
            className="rounded-md"
          >
            {expandedPageId === page.id ? "Collapse" : "Expand"}
          </Button>
        </div>
      }
      bordered
      className="shadow-md"
    >
      {expandedPageId === page.id && (
        <div className="mt-4">
          {isEditing ? (
            <PageEditForm
              page={page}
              onSubmit={confirmEdit}
              onCancel={cancelEditing}
            />
          ) : (
            <PageInfoDisplay page={page} />
          )}

          {/* Action Buttons when not editing */}
          {!isEditing && (
            <div className="flex space-x-4 mt-4">
              <Button
                icon={<EditOutlined />}
                onClick={startEditing}
                className="mavebutton"
              >
                Edit Page Info
              </Button>
              <Popconfirm
                title="Are you sure you want to delete this page?"
                onConfirm={() => handleDeletePage(page.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button icon={<DeleteFilled />} className="mavecancelbutton">
                  Delete Page
                </Button>
              </Popconfirm>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default PageCard;
