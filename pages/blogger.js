import React, { useState, useEffect } from "react";

function Blogger() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return <div className="ViewContainer">{isBrowser && <h1>Welcome</h1>}</div>;
}

export default Blogger;
