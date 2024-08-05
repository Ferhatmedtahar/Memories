import { MdOutlineCreateNewFolder } from "react-icons/md";
function Notification({ formRef }) {
  function handleClick() {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <button
      title="create new Post 🥰"
      onClick={handleClick}
      className="xs:right-10 xs:top-10 absolute right-5 top-7 rounded-md bg-blue-300 p-1 text-2xl text-blue-500 opacity-50 transition-all duration-150 hover:bg-blue-400 hover:text-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
    >
      <MdOutlineCreateNewFolder />
    </button>
  );
}

export default Notification;
