// components/PageBuilder/PageCard.jsx

import {
  CheckCircleFilled,
  CloseCircleFilled,
  CloseCircleOutlined,
  DeleteFilled,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, message, Popconfirm, Radio } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const PageCard = ({
  page,
  handleExpand,
  expandedPageId,
  handleDeletePage,
  handleEditPageInfo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempPageNameEn, setTempPageNameEn] = useState(page.page_name_en);
  const [tempPageNameBn, setTempPageNameBn] = useState(page.page_name_bn);
  const [tempPageSlug, setTempPageSlug] = useState(page.slug);
  const [tempPageType, setTempPageType] = useState(
    page.additional && page.additional.length > 0
      ? page.additional[0].pageType
      : "Page"
  );

  const router = useRouter();

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setTempPageNameEn(page.page_name_en);
    setTempPageNameBn(page.page_name_bn);
    setTempPageSlug(page.slug);
    setTempPageType(
      page.additional && page.additional.length > 0
        ? page.additional[0].pageType
        : "Page"
    );
  };

  const confirmEdit = () => {
    if (tempPageNameEn.trim() === "" || tempPageSlug.trim() === "") {
      message.error("Page name and slug cannot be empty.");
      return;
    }

    // Validate slug format (only lowercase letters, numbers, and hyphens)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(tempPageSlug)) {
      message.error(
        "Invalid slug format. Use only lowercase letters, numbers, and hyphens."
      );
      return;
    }

    handleEditPageInfo({
      id: page.id,
      pageNameEn: tempPageNameEn,
      pageNameBn: tempPageNameBn,
      slug: tempPageSlug,
      pageType: tempPageType,
    });

    setIsEditing(false);
    message.success("Page updated successfully.");
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
            <div className="space-y-4">
              {/* Page Name EN */}
              <div className="flex flex-col">
                <label className="font-semibold">Page Name (EN):</label>
                <Input
                  value={tempPageNameEn}
                  onChange={(e) => setTempPageNameEn(e.target.value)}
                  placeholder="Enter English Page Name"
                  allowClear
                  size="large"
                />
              </div>

              {/* Page Name BN */}
              <div className="flex flex-col">
                <label className="font-semibold">Page Name (BN):</label>
                <Input
                  value={tempPageNameBn}
                  onChange={(e) => setTempPageNameBn(e.target.value)}
                  placeholder="Enter Bengali Page Name"
                  allowClear
                  size="large"
                />
              </div>

              {/* Page Slug */}
              <div className="flex flex-col">
                <label className="font-semibold">Page Slug:</label>
                <Input
                  value={tempPageSlug}
                  onChange={(e) => setTempPageSlug(e.target.value)}
                  placeholder="e.g., about-us"
                  allowClear
                  size="large"
                />
                <span className="text-xs text-gray-500">
                  *Use only lowercase letters, numbers, and hyphens.
                </span>
              </div>

              {/* Page Type */}
              <div className="flex flex-col">
                <label className="font-semibold">Page Type:</label>
                <Radio.Group
                  onChange={(e) => setTempPageType(e.target.value)}
                  value={tempPageType}
                  size="large"
                >
                  <Radio value="Page">Page</Radio>
                  <Radio value="Subpage">Subpage</Radio>
                </Radio.Group>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-4">
                <Button
                  icon={<CheckCircleFilled />}
                  onClick={confirmEdit}
                  className="mavebutton"
                >
                  Submit
                </Button>
                <Button
                  icon={<CloseCircleFilled />}
                  onClick={cancelEditing}
                  className="mavecancelbutton"
                >
                  Discard
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Page Name EN */}
              <h1>
                <span className="font-semibold text-theme">
                  Page Name (EN):{" "}
                </span>
                {page.page_name_en}
              </h1>

              {/* Page Name BN */}
              <h1>
                <span className="font-semibold text-theme">পৃষ্ঠার নাম: </span>
                {page.page_name_bn}
              </h1>

              {/* Page Slug */}
              <Link href={`/page-builder/${page.id}`}>
                <div className="cursor-pointer flex gap-1">
                  <h1
                    className="font-semibold text-theme"
                    style={{ color: "var(--theme)" }}
                  >
                    Link:
                  </h1>
                  /{page.slug}
                </div>
              </Link>

              {/* Page Type */}
              <h1>
                <span className="font-semibold text-theme">Page Type: </span>
                <span className="text-gray-600 text-lg font-semibold">
                  {page.additional && page.additional.length > 0
                    ? page.additional.map((type) => type.pageType).join(", ")
                    : "Page"}
                </span>
              </h1>

              {/* Action Buttons */}
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
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default PageCard;
