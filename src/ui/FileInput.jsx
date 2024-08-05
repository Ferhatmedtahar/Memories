import { FaRegImage } from "react-icons/fa";
function FileInput({ register, errorMessage = "", isEditSession, image = "" }) {
  const imageName = image.slice(-10);
  return (
    <div className="flex w-96 max-w-72 flex-col gap-x-1 sm:max-w-80 md:max-w-96">
      <label
        htmlFor="files"
        className="inline-block w-full flex-auto cursor-pointer rounded-lg border border-gray-300 bg-gray-50 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-stone-600 transition duration-300 ease-in-out hover:border-blue-500 hover:file:bg-neutral-800 focus:border-blue-500 focus:text-neutral-700 focus:outline-none"
      >
        <input
          accept="image/*"
          {...register("image", {
            required: isEditSession
              ? false
              : "You need an image for your Memory",
          })}
          className="block outline-none file:rounded-md file:border file:border-stone-300 file:bg-slate-300 file:text-stone-700 file:outline-none focus:rounded-md focus:ring"
          id="files"
          type="file"
        />
        {image ? ` already selected : ..${imageName}` : "Select file"}
      </label>
      {errorMessage && (
        <p className="mt-1 flex max-w-fit cursor-default items-center gap-1 rounded-md bg-red-200 px-2 text-sm text-red-600 transition-colors duration-200 hover:bg-red-300 hover:text-red-800 focus:cursor-text">
          <FaRegImage size={15} />
          {errorMessage.message}
        </p>
      )}
    </div>
  );
}

export default FileInput;
