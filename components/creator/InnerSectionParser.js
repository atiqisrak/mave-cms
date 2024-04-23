// if it's inner section then it will send the data in component parser again

import React, { useState, useEffect } from "react";
import ComponentParse from "./ComponentParser";

const InnerSectionParser = ({ item }) => {
  return (
    <div>
      <ComponentParse section={item.data} />
    </div>
  );
};

export default InnerSectionParser;
