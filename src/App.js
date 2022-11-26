import { useEffect, useState } from "react";
import FilesList from "./FilesList";
import UploadContainer from "./UploadContainer";
import { getFiles } from "./api";
import "./App.css";

const App = () => {
  const [allFiles, setAllFiles] = useState(null);

  useEffect(() => {
    getFiles().then((files) => {
      setAllFiles(files);
    });
  }, []);
  return (
    <div className="App">
      <FilesList files={allFiles} />
      <UploadContainer />
    </div>
  );
};

export default App;
