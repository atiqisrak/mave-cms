// components/PageBuilder/PageEditForm.jsx

import React, { useState } from "react";
import { Button, Input, Radio, Select, message } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import MediaSelectionModal from "./Modals/MediaSelectionModal";

const { Option } = Select;

const PageEditForm = ({ page, onSubmit, onCancel }) => {
  const [tempPageNameEn, setTempPageNameEn] = useState(page.page_name_en);
  const [tempPageNameBn, setTempPageNameBn] = useState(page.page_name_bn);
  const [tempPageSlug, setTempPageSlug] = useState(page.slug);
  const [tempPageType, setTempPageType] = useState(
    page.additional && page.additional.length > 0
      ? page.additional[0].pageType
      : "Page"
  );
  const [tempPageMetaTitle, setTempPageMetaTitle] = useState(
    page.additional && page.additional.length > 0
      ? page.additional[0].metaTitle
      : ""
  );
  const [tempPageMetaDescription, setTempPageMetaDescription] = useState(
    page.additional && page.additional.length > 0
      ? page.additional[0].metaDescription
      : ""
  );
  const [tempPageMetaKeywords, setTempPageMetaKeywords] = useState(
    page.additional && page.additional.length > 0
      ? page.additional[0].keywords
      : []
  );
  const [tempPageMetaImage, setTempPageMetaImage] = useState(
    page.additional && page.additional.length > 0
      ? page.additional[0].metaImage
      : ""
  );
  const [tempPageMetaImageAlt, setTempPageMetaImageAlt] = useState(
    page.additional && page.additional.length > 0
      ? page.additional[0].metaImageAlt
      : ""
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = () => {
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

    onSubmit({
      id: page.id,
      pageNameEn: tempPageNameEn,
      pageNameBn: tempPageNameBn,
      slug: tempPageSlug,
      pageType: tempPageType,
      metaTitle: tempPageMetaTitle,
      metaDescription: tempPageMetaDescription,
      keywords: tempPageMetaKeywords,
      metaImage: tempPageMetaImage,
      metaImageAlt: tempPageMetaImageAlt,
    });
  };

  const handleSelectMedia = (media) => {
    // Assuming media[0].file_path contains the relative path
    setTempPageMetaImage(
      `${process.env.NEXT_PUBLIC_MEDIA_URL}/${media[0].file_path}`
    );
  };

  return (
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

      {/* Page Name Alt */}
      <div className="flex flex-col">
        <label className="font-semibold">Page Name (Alt):</label>
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
          // disabled
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

      {/* Page Meta */}
      <div className="flex flex-col gap-4">
        <label className="font-semibold">Page Meta Title:</label>
        <Input
          value={tempPageMetaTitle}
          onChange={(e) => setTempPageMetaTitle(e.target.value)}
          placeholder="Enter Meta Title"
          allowClear
          size="large"
        />

        <label className="font-semibold">Page Meta Description:</label>
        <Input.TextArea
          value={tempPageMetaDescription}
          onChange={(e) => setTempPageMetaDescription(e.target.value)}
          placeholder="Enter Meta Description"
          allowClear
          size="large"
          rows={4}
        />

        <label className="font-semibold">Page Meta Keywords:</label>
        <Select
          mode="tags"
          value={tempPageMetaKeywords}
          onChange={(value) => setTempPageMetaKeywords(value)}
          placeholder="Enter Meta Keywords"
          allowClear
          size="large"
          showSearch
        >
          {tempPageMetaKeywords?.map((keyword) => (
            <Option key={keyword} value={keyword}>
              {keyword}
            </Option>
          ))}
        </Select>

        <label className="font-semibold">Page Meta Image:</label>
        <Button
          icon={<PlusCircleOutlined />}
          onClick={() => setIsModalVisible(true)}
          className="mavebutton"
        >
          Select Meta Image
        </Button>
        {tempPageMetaImage && (
          <div className="relative w-32 h-32 mt-2">
            <Image
              src={tempPageMetaImage}
              alt="Meta Image"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        )}

        <MediaSelectionModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSelectMedia={handleSelectMedia}
          selectionMode="single"
        />

        <label className="font-semibold">Page Meta Image Alt Text:</label>
        <Input
          value={tempPageMetaImageAlt}
          onChange={(e) => setTempPageMetaImageAlt(e.target.value)}
          placeholder="Enter Meta Image Alt Text"
          allowClear
          size="large"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-4">
        <Button
          icon={<CheckCircleFilled />}
          onClick={handleSubmit}
          className="mavebutton"
        >
          Submit
        </Button>
        <Button
          icon={<CloseCircleFilled />}
          onClick={onCancel}
          className="mavecancelbutton"
        >
          Discard
        </Button>
      </div>
    </div>
  );
};

export default PageEditForm;
