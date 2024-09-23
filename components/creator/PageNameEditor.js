import React, { useState } from "react";

const PageNameEditor = ({ page, onSave }) => {
  const [pageNames, setPageNames] = useState({
    en: page.page_name_en,
    bn: page.page_name_bn,
  });

  const handleChange = (e, lang) => {
    setPageNames({ ...pageNames, [lang]: e.target.value });
  };

  const handleSave = () => {
    onSave({
      page_name_en: pageNames.en,
      page_name_bn: pageNames.bn,
    });
  };

  return (
    <div className="pageContainer" style={{ padding: "2em 0" }}>
      {["en", "bn"].map((lang, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            gap: "2em",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={pageNames[lang]}
            onChange={(e) => handleChange(e, lang)}
            placeholder={
              lang === "en"
                ? "Enter English Page Name"
                : "বাংলা পেইজের নাম লিখুন"
            }
          />
          <button onClick={handleSave}>
            {lang === "en" ? "Save" : "সংরক্ষণ"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PageNameEditor;
