const getFiles = () => {
  return fetch("/get-files").then((res) => res.json());
};

const uploadFiles = (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    console.log({file});
    formData.append("files", file);
  });
  console.log({ formData });
  return fetch("/upload-files", {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
};

export { getFiles, uploadFiles };
