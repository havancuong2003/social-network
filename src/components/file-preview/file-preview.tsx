import clsx from "clsx";
import React from "react";

interface FilePreviewProps {
  files: File[]; // Danh sách các file đã chọn
  handleCloseModal: () => void; // Hàm đóng modal
  isModalOpen: boolean; // Trạng thái modal
  fileURLs: string[]; // Danh sách các URL cho các file video
  handleRemoveFile: (index: number) => void; // Hàm xử lý xóa file

  classes?: {
    [key: string]: string;
  };
}
export const FilePreview: React.FC<FilePreviewProps> = ({
  files,
  handleCloseModal,
  isModalOpen,
  fileURLs,
  handleRemoveFile,
  classes,
}) => {
  return (
    <div className="mt-2">
      {isModalOpen && (
        <div
          className={clsx(
            classes?.fixed,
            "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center w-screen h-screen"
          )}
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-4 rounded-lg w-4/5 w-full h-5/6 overflow-auto"
            onClick={(e) => e.stopPropagation()} // Ngăn không cho nhấn vào modal đóng modal
          >
            <h2 className="text-lg font-bold">Tệp đã chọn</h2>
            <div className="mt-2">
              <div className="grid grid-cols-2 gap-2 lg:gap-4 mt-2">
                {files.map((file, index) => {
                  return (
                    <div
                      key={index}
                      className="h-auto bg-gray-100 flex items-center justify-center relative overflow-hidden"
                    >
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-auto max-w-full max-h-80 object-cover"
                        />
                      ) : file.type.startsWith("video/") ? (
                        <video
                          src={fileURLs[index]} // URL video cho các file video
                          className="w-full h-auto max-w-full max-h-80 object-cover"
                          controls
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-500">
                          <span>Không hỗ trợ xem tệp này</span>
                        </div>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Ngăn không cho sự kiện nhấn vào nút "X" làm mở modal
                          handleRemoveFile(index); // Xóa file khi nhấn vào nút "X"
                        }}
                        className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 hover:bg-red-700"
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 text-white bg-red-500 rounded-full p-2"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
