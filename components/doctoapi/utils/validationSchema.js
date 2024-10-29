// components/doctoapi/utils/validationSchema.js

import * as Yup from "yup";

export const pageSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  slug: Yup.string().required("Slug is required"),
  metadata: Yup.object().shape({
    metaTitle: Yup.string().required("Meta Title is required"),
    metaDescription: Yup.string().required("Meta Description is required"),
    keywords: Yup.array().of(Yup.string()).required("Keywords are required"),
  }),
  sections: Yup.array()
    .of(
      Yup.object().shape({
        sectionTitle: Yup.string().required("Section Title is required"),
        data: Yup.array()
          .of(
            Yup.object().shape({
              type: Yup.string().required("Element type is required"),
              value: Yup.string().when("type", (type, schema) => {
                if (type === "title" || type === "description") {
                  return schema.required("Value is required for text elements");
                }
                return schema;
              }),
              id: Yup.number().when("type", (type, schema) => {
                if (
                  [
                    "media",
                    "menu",
                    "navbar",
                    "slider",
                    "card",
                    "footer",
                  ].includes(type)
                ) {
                  return schema.required(
                    "ID is required for component elements"
                  );
                }
                return schema;
              }),
            })
          )
          .min(1, "At least one element is required in data"),
      })
    )
    .min(1, "At least one section is required"),
});
