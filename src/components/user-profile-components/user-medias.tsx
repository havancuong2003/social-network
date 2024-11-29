import { useUserMedia } from "../../contexts";
import { UserType } from "../../model/user-profile.model";

interface UserMediasProps {
  classes?: {
    [key: string]: string;
  };
  userData: UserType | null;
  id: string | undefined;
}
export const UserMedias: React.FC<UserMediasProps> = ({}) => {
  const { medias } = useUserMedia();

  return (
    <>
      <div className="grid p-2 lg:p-0 grid-cols-3 md:grid-cols-6 gap-4 my-10">
        {medias.flatMap((item) =>
          item.mediaShow.map((media) => {
            const isVideo =
              media.endsWith(".mp4") ||
              media.endsWith(".webm") ||
              media.endsWith(".ogg");

            return (
              <div
                key={`${item.post.postId}-${media}`}
                className="overflow-hidden rounded-lg bg-gray-100"
              >
                {isVideo ? (
                  <video
                    src={media}
                    controls
                    className="w-full h-[150px] object-cover md:h-[250px] "
                  ></video>
                ) : (
                  <img
                    src={media}
                    alt=""
                    className="w-full h-[150px] object-cover md:h-[250px] "
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
