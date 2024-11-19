import React, { useRef, useState, useEffect } from "react";
import { AiOutlineFile } from "react-icons/ai";
import { UserProfile } from "../../../model/user-profile.model";
import { FilePreview } from "../../file-preview";

type UploadPostProps = {
  userData: UserProfile;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  fileError: string;
  handlePostSubmit: () => void;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
};

export const UploadPost: React.FC<UploadPostProps> = ({
  userData,
  handleFileChange,
  files,
  fileError,
  handlePostSubmit,
  setTextValue,
  setFiles,
}) => {
  const inputRef = useRef<HTMLDivElement | null>(null); // Tham chiếu tới div
  const [fileURLs, setFileURLs] = useState<string[]>([]); // Lưu trữ URL của các file để tránh việc tải lại video
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Trạng thái của modal

  const handleOpenModal = () => {
    setIsModalOpen(true); // Mở modal
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Đóng modal
  };
  // Hàm xóa tệp
  const handleRemoveFile = (index: number) => {
    // Lọc tệp để loại bỏ tệp có chỉ mục tương ứng
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles); // Cập nhật lại state
  };
  // Cập nhật lại URLs khi file thay đổi
  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setFileURLs(urls);

    // Cleanup function để giải phóng bộ nhớ sau khi component unmount
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleInputChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setTextValue(e.target.innerText); // Cập nhật giá trị của div có thể chỉnh sửa
  };

  // Điều chỉnh chiều cao của div khi nhập liệu
  if (inputRef.current) {
    inputRef.current.style.height = "auto"; // Reset chiều cao để tính lại
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; // Set chiều cao phù hợp với nội dung
  }

  // Chỉ lấy tối đa 10 file để hiển thị
  const displayedFiles = files.slice(0, 6);
  const remainingFilesCount = files.length - 6;

  return (
    <>
      <div>
        <FilePreview
          files={files}
          handleCloseModal={handleCloseModal}
          isModalOpen={isModalOpen}
          fileURLs={fileURLs}
          handleRemoveFile={handleRemoveFile}
        />
      </div>
      {/* Modal up post */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal p-2 sm:p-5" role="dialog">
        <div className="modal-box w-full sm:w-3/5 lg:max-w-2xl h-auto">
          {/* Box 1: Tạo bài viết và tên */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold text-center">Tạo bài viết</h3>
            <div className="flex items-center mt-4">
              <img
                src={userData?.profileImages.avatar}
                alt="avatar"
                className="w-16 h-16 lg:rounded-full"
              />
              <h6 className="ml-4 font-bold">
                {`${userData.personalInfo.firstName} ${userData.personalInfo.lastName}`}
              </h6>
            </div>
          </div>

          {/* Box 2: Input và review file */}
          <div
            className="flex flex-col  mt-4 p-4 space-y-4"
            style={{
              maxHeight: "500px", // Giới hạn chiều cao tổng thể
              overflowY: "auto", // Thêm cuộn nếu vượt quá
            }}
          >
            {/* Input */}
            <div
              ref={inputRef} // Gắn tham chiếu vào div
              className="w-full p-2 border rounded-md resize-none border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              contentEditable
              onInput={handleInputChange}
              style={{
                height: "auto", // Đặt lại để auto-resize hoạt động
              }}
            />

            {displayedFiles.length > 0 && (
              <div className="mt-2">
                <p className="text-gray-600 font-bold">
                  Tệp đã chọn: {files.length}
                </p>
                <div className="">
                  <div className="flex gap-2"></div>

                  <div className="grid grid-cols-2 gap-1 lg:gap-2 mt-2">
                    {displayedFiles.map((file, index) => {
                      const isLastDisplayedFile =
                        index == displayedFiles.length - 1 &&
                        remainingFilesCount > 0;

                      return (
                        <div
                          key={index}
                          className=" h-80 bg-gray-100 flex items-center justify-center  relative border border-b-gray-400 rounded-md "
                          onClick={() => handleOpenModal()}
                        >
                          {file.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-full object-cover p-2"
                            />
                          ) : (
                            <video
                              src={fileURLs[index]}
                              className="w-full h-full object-cover "
                              controls
                            />
                          )}
                          {isLastDisplayedFile && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
                              <span className="text-white font-bold text-lg">
                                +{remainingFilesCount}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Thông báo lỗi */}
            {fileError && (
              <div className="mt-2 text-red-500">
                <p>{fileError}</p>
              </div>
            )}
          </div>

          {/* Box 3: Thêm file */}
          <div className="flex justify-end mt-4">
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex items-center space-x-2"
            >
              <AiOutlineFile className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              <span className="text-gray-600">
                Chọn ảnh hoặc video để tải lên
              </span>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/jpeg, image/png, image/jpg, video/mp4, video/mov"
                multiple
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="border-b border-gray-300 mt-10"></div>
          {/* Nút đóng và Đăng bài */}
          <div className="modal-action flex justify-between w-full">
            {/* Nút Đăng bài bên trái */}
            <button
              className="btn btn-primary text-white"
              onClick={handlePostSubmit}
            >
              Đăng bài
            </button>

            {/* Nút đóng bên phải */}
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
