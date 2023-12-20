// if it's inner section then it will send the data in component parser again

import React, { useState, useEffect } from "react";
import ComponentParse from "./ComponentParser";

const InnerSectionParser = ({ item }) => {
  return (
    <div>
      {/* {console.log("Niil 101: ", item.data)} */}
      {/* {item?.data?.map((item, index) => (
        <section>
          {(() => {
            switch (item?.type) {
              case "navbar":
                return <NavbarParser item={item} />;
              case "card":
                return <CardParser item={item} />;
              case "title":
                return <TitleParser item={item} />;
              case "description":
                return <DescriptionParser item={item} />;
              case "press_release":
                return <PressReleaseParser item={item} />;
              case "media":
                return <MediaParser item={item} />;
              case "inner-section":
                return <InnerSectionParser item={item} />;
              default:
                return <h1>{item.type}</h1>;
            }
          })()}
        </section>
      ))} */}
      <ComponentParse section={item.data} />
    </div>
  );
};

export default InnerSectionParser;
