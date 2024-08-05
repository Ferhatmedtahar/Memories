import Logo from "./Logo";

function Header({ children }) {
  return (
    <header className="flex w-9/12 items-center justify-center self-center rounded-lg border-2 border-stone-400 bg-stone-100 py-2 shadow-2xl transition-colors duration-200 hover:bg-slate-200">
      <h1 className="xs:text-3xl px-2 font-sans text-lg font-medium text-blue-600 transition-colors duration-300 hover:cursor-default hover:text-blue-700 sm:text-4xl">
        {children}
      </h1>
      <Logo />
    </header>
  );
}

export default Header;
