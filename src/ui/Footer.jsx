import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="flex items-center justify-center p-4 text-blue-50 hover:cursor-default">
      <p className="mr-2">© 2024</p>
      <a
        href="https://github.com/Ferhatmedtahar"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-blue-400 transition-colors duration-150 hover:text-blue-600"
      >
        <FaGithub className="mr-1" size={20} />
        Ferhat Mohamed Tahar
      </a>
    </footer>
  );
}

export default Footer;
