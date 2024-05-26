// Transformers.js

// Function to generate unique IDs
const generateId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const Transformer = (input) => {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);

  let sections = [];
  let currentSection = null;
  let isContentArray = false;

  lines.forEach((line) => {
    if (line.startsWith("type: section")) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        _id: generateId(),
        _category: "root",
        sectionTitle: "",
        data: [],
      };
    } else if (line.startsWith("title:")) {
      if (currentSection) {
        currentSection.sectionTitle = line.replace("title:", "").trim();
      }
    } else if (line.startsWith("content: [")) {
      isContentArray = true;
    } else if (line.startsWith("]")) {
      isContentArray = false;
    } else if (isContentArray) {
      if (line.startsWith("{")) {
        currentSection.data.push({});
      } else if (line.startsWith("type:")) {
        const lastIndex = currentSection.data.length - 1;
        currentSection.data[lastIndex].type = line.replace("type:", "").trim();
        currentSection.data[lastIndex]._id = generateId();
      } else if (line.startsWith("content:")) {
        const lastIndex = currentSection.data.length - 1;
        currentSection.data[lastIndex].content = line
          .replace("content:", "")
          .trim()
          .replace(/["']/g, "");
      } else if (line.startsWith("src:")) {
        const lastIndex = currentSection.data.length - 1;
        currentSection.data[lastIndex].src = line
          .replace("src:", "")
          .trim()
          .replace(/["']/g, "");
      } else if (line.startsWith("alt:")) {
        const lastIndex = currentSection.data.length - 1;
        currentSection.data[lastIndex].alt = line
          .replace("alt:", "")
          .trim()
          .replace(/["']/g, "");
      }
    }
  });

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
};

export { Transformer };
