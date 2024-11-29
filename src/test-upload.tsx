// import React, { useState } from "react";
// import axios from "axios";

// const FileUpload = () => {
//   const [files, setFiles] = useState<File[]>([]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setFiles(Array.from(event.target.files)); // Lưu nhiều file
//     }
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     files.forEach((file) => formData.append("media", file)); // Key `images` dùng để gửi

//     try {
//       // check length form data
//       const response = await axios.post(
//         "http://localhost:5000/api/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Upload failed:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" multiple onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default FileUpload;
