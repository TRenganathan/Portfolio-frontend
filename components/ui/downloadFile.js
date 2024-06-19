export const DownloadFile = async (url, fileName) => {
  try {
    const respose = await fetch(url);
    if (!respose.ok) {
      throw new Error("Network response was not ok.");
    }
    const blob = await respose.blob();
    const urlBlob = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlBlob;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.removeChild(a);
    window.URL.revokeObjectURL(urlBlob);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};
