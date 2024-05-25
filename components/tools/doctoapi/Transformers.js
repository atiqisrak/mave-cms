// Transformer component for images
const ImageTransformer = ({ contentItem }) => {
  return {
    type: contentItem.type,
    medias: [{ ...contentItem }],
  };
};

// Transformer component for text/description
const TextTransformer = ({ contentItem }) => {
  return {
    type: contentItem.type,
    content: contentItem.content,
  };
};

// Transformer component for descriptions
const DesctiptionTransformer = ({ contentItem }) => {
  return {
    type: contentItem.type,
    content: contentItem.content,
  };
};
