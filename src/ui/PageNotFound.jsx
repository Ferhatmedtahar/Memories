import { GoAlertFill } from "react-icons/go";
import BackMenu from "./BackMenu";

function PageNotFound() {
  return (
    <div className="animate-background my-auto flex min-h-screen flex-col gap-3 bg-gradient-to-tl from-red-400 via-red-700 to-yellow-500 bg-[length:200%_140%] px-4 py-8">
      <BackMenu />
      <h1 className="text-xl font-semibold text-stone-800">page not found🙃</h1>
      <p className="flex items-center gap-2 text-lg text-stone-800">
        <GoAlertFill fill="#e4a811" size={24} />
        Please go back to the menu
      </p>
    </div>
  );
}

export default PageNotFound;
