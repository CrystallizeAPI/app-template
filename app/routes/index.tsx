import type { LinksFunction } from "remix";
import stylesUrl from "../styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
  return (
    <div className="outer">
      <div className="stars"></div>
      <div className="inner">
        <div className="p-6">
          <img
            src="/crystallize_logo_white.svg"
            alt="Crystallize logo"
            width="213"
            height="72"
          />
        </div>
        <div className="p-6 pt-20 max-w-md mx-auto text-center">
          <a href="/dashboard" className="text-3xl">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
