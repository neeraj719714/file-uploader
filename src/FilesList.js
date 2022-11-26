import "./FilesList.css";

const FilesList = (props) => {
  const { files } = props;
  const onDownloadClick = (fileName) => {
    // download file using filename
    fetch(`/download-file/${fileName}`)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };
  return (
    <div className="all-files">
      <h2>All Files</h2>
      {files === null ? (
        <div className="loading">Loading...</div>
      ) : (
        files.map((fileName) => (
          <div className="file" key={fileName}>
            {fileName}
            <button
              onClick={() => onDownloadClick(fileName)}
              className="download-btn"
            >
              download
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FilesList;
