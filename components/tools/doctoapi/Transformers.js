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

  let parsedObj = {
    _id: generateId(),
    _category: "root",
    sectionTitle: "",
    data: [],
  };

  let currentSection = null;
  let isContentArray = false;

  lines.forEach((line) => {
    if (line.startsWith("type: section")) {
      if (currentSection) {
        parsedObj.data.push(currentSection);
      }
      currentSection = {
        _id: generateId(),
        type: "title",
        content: "",
      };
    } else if (line.startsWith("title:")) {
      parsedObj.sectionTitle = line.replace("title:", "").trim();
    } else if (line.startsWith("content: [")) {
      isContentArray = true;
    } else if (line.startsWith("]")) {
      isContentArray = false;
    } else if (line.startsWith("type: text") && isContentArray) {
      if (currentSection) {
        currentSection = {
          _id: generateId(),
          type: "text",
          content: "",
        };
      }
    } else if (line.startsWith("content:") && isContentArray) {
      if (currentSection) {
        currentSection.content = line
          .replace("content:", "")
          .trim()
          .replace(/["']/g, "");
      }
    }
  });

  if (currentSection) {
    parsedObj.data.push(currentSection);
  }

  return [parsedObj];
};

export { Transformer };
