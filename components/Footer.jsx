import BigLogoSvg from "./BigLogoSvg";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      dir="ltr"
      className="text-primary-50 p-4 bg-gradient-primary shadow md:px-6 md:py-5 font-bold"
    >
      <div className="flex flex-col items-center sm:flex-row sm:justify-between">
        <Link href="/">
          <a className="flex items-center mb-4 sm:mb-0">
            <BigLogoSvg />
          </a>
        </Link>
        <ul className="flex flex-wrap items-center my-3 text-sm text-gray-300 sm:my-0">
          <li>
            <Link href="#about">
              <a className="mr-4 hover:underline md:mr-6">About</a>
            </Link>
          </li>
          <li>
            <Link href="#privacy-policy">
              <a className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </Link>
          </li>
          <li>
            <Link href="#licensing">
              <a className="mr-4 hover:underline md:mr-6">Licensing</a>
            </Link>
          </li>
          <li>
            <Link href="#contact">
              <a className="hover:underline">Contact</a>
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-5 sm:mx-auto border-primary-100" />
      <div className="flex justify-center">
        <span className="text-center text-sm text-gray-300">
          <span className="font-sans">©</span> 2022{" "}
          <Link href="/">
            <a className="hover:underline">Rewayat Arabia™</a>
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
