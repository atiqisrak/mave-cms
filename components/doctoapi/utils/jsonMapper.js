// components/doctoapi/utils/jsonMapper.js
import { v4 as uuidv4 } from "uuid";
export const mapYamlToJson = (yamlData) => {
  const mappedSections = yamlData.sections?.map((section) => {
    const sectionId = uuidv4();
    const mappedData = section.data
      ?.map((element) => {
        const elementId = uuidv4();
        switch (element.type) {
          case "title":
            return {
              type: "title",
              _id: elementId,
              value: element.value,
            };
          case "description":
            return {
              type: "description",
              _id: elementId,
              value: element.value,
            };
          case "media":
            return {
              type: "media",
              _id: elementId,
              id: element.id,
            };
          case "menu":
            return {
              type: "menu",
              _id: elementId,
              id: element.id,
            };
          case "navbar":
            return {
              type: "navbar",
              _id: elementId,
              id: element.id,
            };
          case "slider":
            return {
              type: "slider",
              _id: elementId,
              id: element.id,
            };
          case "card":
            return {
              type: "card",
              _id: elementId,
              id: element.id,
            };
          case "footer":
            return {
              type: "footer",
              _id: elementId,
              id: element.id,
            };
          default:
            return null;
        }
      })
      .filter((item) => item !== null);

    return {
      _id: sectionId,
      sectionTitle: section.sectionTitle,
      data: mappedData,
    };
  });

  const jsonPayload = {
    // title: yamlData.title,
    page_name_en: yamlData.title,
    page_name_bn: yamlData.title,
    type: "Page",
    head: yamlData.additional,
    slug: yamlData.slug,
    meta_title: yamlData.metadata.metaTitle,
    meta_description: yamlData.metadata.metaDescription,
    keywords: yamlData.metadata.keywords,
    body: mappedSections,
    additional: yamlData.additional || [],
    status: yamlData.status || 1,
  };

  console.log("Mapped JSON Payload:", jsonPayload); // Add this line

  return jsonPayload;
};
