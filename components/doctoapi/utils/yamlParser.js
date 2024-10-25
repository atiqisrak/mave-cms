// components/doctoapi/utils/yamlParser.js

import yaml from "js-yaml";

export const parseYaml = (yamlText) => {
  try {
    const data = yaml.load(yamlText);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
