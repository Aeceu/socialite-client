import { LucideFacebook, LucideGithub, LucideLinkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthInfo() {
  return (
    <div className="z-10 w-3/5 md:flex hidden flex-col ">
      <h1 className={`text-cursive text-8xl text-emerald-500`}>Socio Media</h1>
      <p className="text-lg ">
        Unlock a World of Interactions - Welcome to Social Media: Your Gateway
        to Global Networking.
      </p>
      <h1 className="text-lg mt-4 hover:underline hover:text-emerald-600 cursor-pointer">
        Support my socials:
      </h1>
      <div className="flex gap-2 py-2">
        <Link to="https://github.com/Aeceu" className="hover:text-emerald-500 ">
          <LucideGithub className="w-5" />
        </Link>
        <Link
          to="https://www.linkedin.com/in/jose-acebuche-4a5b851b5/"
          className="hover:text-emerald-500 "
        >
          <LucideLinkedin className="w-5" />
        </Link>
        <Link
          to="https://www.facebook.com/Aeceuuu"
          className="hover:text-emerald-500 "
        >
          <LucideFacebook className="w-5" />
        </Link>
      </div>
    </div>
  );
}
