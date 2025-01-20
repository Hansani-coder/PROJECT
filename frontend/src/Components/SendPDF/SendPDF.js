import axios from "axios";
import React, { useEffect, useState } from "react";
import PdfComp from "./PdfComp";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function SendPDF() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [allPdf, setAllPdf] = useState([]);
  const [pdfFile, setPDFFile] = useState(null);

  useEffect(() => {
    getpdf();
  }, []);

  const getpdf = async () => {
    try {
      const result = await axios.get("http://localhost:3000/getFile");
      console.log(result.data.data);
      setAllPdf(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs: " + error.message);
      alert("Error fetching PDFs: " + error.message);
    }
  };

  const SubmitPdf = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post(
        "http://localhost:3000/uploadfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);

      if (result.status === 200) {
        alert("Upload Success..!");
        getpdf();
      } else {
        alert("Upload Error..!");
      }
    } catch (error) {
      console.error("Error Uploading: " + error.message);
      alert("Error Uploading: " + error.message);
    }
  };

  const showPdf = (pdfFilename) => {
    setPDFFile(`http://localhost:3000/files/${pdfFilename}`);
  };

  return (
    <div>
      <h1>Send PDF</h1>
      <form onSubmit={SubmitPdf}>
        <label>Pdf Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Select Pdf File</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <h2>Uploaded PDFs:</h2>
      <ul>
        {allPdf.length > 0 ? (
          allPdf.map((pdf, index) => (
            <li key={index}>
              <span>{pdf.title}</span>
              <button onClick={() => showPdf(pdf.pdf)}>View</button>
            </li>
          ))
        ) : (
          <p>No PDFs uploaded yet.</p>
        )}
      </ul>
      {pdfFile && <PdfComp pdfFile={pdfFile} />}
    </div>
  );
}

export default SendPDF;
