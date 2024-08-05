function Button({ children, buttonType, disabled, onClick }) {
  const style = {
    base: "bg-sky-400  py-2  px-14  text-stone-50 text-lg  uppercase rounded-lg  focus:outline-none  focus:ring focus:ring-2 focus:ring-sky-700 hover:bg-sky-500 transition-colors duration-200  active:bg-sky-00",
    secondary:
      "bg-[#f75c61]  py-1  px-4  max-w-fit  text-stone-50 text-lg  uppercase rounded-lg   hover:bg-red-500  transition-colors duration-200 active:bg-red-600 focus:outline-none  focus:ring focus:ring-2 focus:ring-red-700",
  };
  return (
    <button
      disabled={disabled}
      className={style[buttonType]}
      type={buttonType === "secondary" ? "reset" : "submit"}
      onClick={buttonType === "secondary" ? onClick : () => {}}
    >
      {children}
    </button>
  );
}

export default Button;
