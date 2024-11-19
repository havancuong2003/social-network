import React, { useState, useRef } from "react";

const TextSubmitComponent = () => {
  const [submittedText, setSubmittedText] = useState<string>("");
  const inputRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (inputRef.current) {
      // Lấy nội dung từ div contentEditable
      const text = inputRef.current.innerText;

      // Chuyển đổi các ký tự xuống dòng thành <br> hoặc \n
      const formattedText = text.replace(/\n/g, "<br />");

      try {
        // Gửi dữ liệu tới backend
        //  await axios.post("/api/submit", { content: formattedText });
        setSubmittedText(formattedText); // Lưu dữ liệu đã gửi
        inputRef.current.innerText = ""; // Xóa nội dung div
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div
          ref={inputRef}
          className="w-full p-2 border rounded-md resize-none border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          contentEditable
          style={{
            height: "auto",
            minHeight: "40px",
          }}
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>

      {submittedText && (
        <div className="mt-4 p-2 border-t-2">
          <strong>Văn bản bạn đã nhập:</strong>
          <div
            // Đảm bảo hiển thị đúng định dạng xuống dòng
            className="text-left"
            dangerouslySetInnerHTML={{ __html: submittedText }}
          />
        </div>
      )}
    </div>
  );
};

export default TextSubmitComponent;
