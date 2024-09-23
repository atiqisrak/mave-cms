import React from "react";
import PageList from "../../components/creator/main/PageList"; // Import PageList

const Pages = () => {
  const handleEditPage = (pageId) => {
    // Redirect to page editor when editing a page
    router.push({ pathname: "/creator", query: { id: pageId } });
  };

  return <PageList onEditPage={handleEditPage} />;
};

export default Pages;
