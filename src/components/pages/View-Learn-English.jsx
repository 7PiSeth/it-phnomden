import React, { useEffect, useState } from "react";

const ViewLearnEnglish = ({ filePath }) => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    if (!filePath) return;

    fetch(filePath) // load from public folder
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error("Error loading HTML:", error));
  }, [filePath]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default ViewLearnEnglish;
