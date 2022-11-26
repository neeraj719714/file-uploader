import { uploadFiles } from "./api";

const UploadContainer = () => {
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (e) => {
    e.preventDefault();
    const allFiles = [];
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          allFiles.push(file);
        }
      });
      uploadFiles(allFiles).then((res) => {
        console.log(res);
      });
    } else if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      allFiles.push(...e.dataTransfer.files);
    }
  };
  return (
    <div className="container" onDrop={onDrop} onDragOver={onDragOver}>
      Drag and drop the file here
    </div>
  );
};

export default UploadContainer;
