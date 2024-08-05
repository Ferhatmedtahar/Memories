import { FiAlertCircle } from "react-icons/fi";
function Textarea({
  name,
  register,
  placeHolder = "",
  editValue = "",
  errorMessage = "",
}) {
  const registed = name?.toLowerCase();
  return (
    <div className="flex w-full flex-col gap-1 sm:max-w-80 md:max-w-96">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-900 transition-all duration-200 hover:text-blue-500"
      >
        {name}

        <textarea
          {...register(registed, {
            required: "This field is required",
            minLength: {
              value: 8,
              message: `${name} should cotain at least two words`,
            },
          })}
          id={name}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-2 text-sm text-gray-900 transition-all duration-200 hover:border-blue-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-700"
          placeholder={placeHolder}
          defaultValue={editValue}
        />
      </label>
      {errorMessage && (
        <p className="flex max-w-fit cursor-default items-center gap-1 rounded-md bg-red-200 px-2 text-sm text-red-600 transition-colors duration-200 hover:bg-red-300 hover:text-red-800 focus:cursor-text">
          <FiAlertCircle />
          {errorMessage.message + " !"}
        </p>
      )}
    </div>
  );
}

export default Textarea;
