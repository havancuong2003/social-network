import { Posts } from "../../components";

export const Home = () => {
  return (
    <>
      <div className="flex justify-center md:justify-start">
        <div className="w-full md:w-2/3">
          <Posts />
        </div>
      </div>
    </>
  );
};
