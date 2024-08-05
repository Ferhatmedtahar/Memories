import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
function BackMenu() {
  return (
    <Link
      className="flex w-fit items-center gap-1 text-lg text-blue-600 underline transition-colors duration-200 hover:text-blue-900"
      to={"/"}
    >
      {" "}
      <IoMdArrowBack /> <p>back to menu</p>
    </Link>
  );
}

export default BackMenu;
