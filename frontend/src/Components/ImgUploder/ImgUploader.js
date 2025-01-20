import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ImgUploader from './Components/ImgUploader/ImgUploader';


function ImgUploader() {
  const [image, setImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle image submission
  const submitImg = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setIsUploading(true);  // Start uploading

    try {
      const result = await axios.post(
        "http://localhost:3000/uploadImg",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Image uploaded successfully:", result.data);
      getImages();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload the image. Please try again.");
    } finally {
      setIsUploading(false);  // Reset uploading state
    }
  };

  // Handle image file input change
  const onImgChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));  // Set image preview
  };

  // Fetch all uploaded images
  const getImages = async () => {
    try {
      const result = await axios.get("http://localhost:3000/getImages");
      setAllImages(result.data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Failed to fetch images. Please try again.");
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div>
      <h1>Image Uploader</h1>
      <form onSubmit={submitImg}>
        <input
          type="file"
          accept="image/*"
          onChange={onImgChange}
          required
        />
        {preview && (
          <img src={preview} alt="preview" style={{ width: "150px", height: "150px", objectFit: "cover" }} />
        )}
        <button type="submit">Upload</button>
      </form>

      {isUploading && <p>Uploading...</p>}

      <h2>Uploaded Images:</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {allImages.length > 0 ? (
          allImages.map((img, index) => (
            <div key={index}>
              <img
                src={`http://localhost:3001/files/${img.filename}`}
                alt={img.filename}
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <p>{img.filename}</p>
            </div>
          ))
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default ImgUploader;
