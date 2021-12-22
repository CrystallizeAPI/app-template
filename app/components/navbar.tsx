interface INavBar {
  title: string;
}

export function NavBar({ title }: INavBar) {
  return (
    <nav className="navbar p-6 bg-purple text-white flex justify-between items-center">
      <a href="/">
        <img
          src="/crystallize_logo_white.svg"
          alt="Crystallize logo"
          width="106"
          height="36"
        />
      </a>
      <div>
        <h1 className="text-3xl">{title}</h1>
      </div>
      <div>
        <a href="/">Log out</a>
      </div>
    </nav>
  );
}
