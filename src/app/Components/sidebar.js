import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      <nav className="font-funnel min-h-screen flex flex-col align-middle text-center items-center space-y-10 bg-main w-1/4 px-8">
        <Image
          className="h-24 mt-3 w-auto mb-0"
          src={require("@/app/assets/logo.png")}
          alt="logo"
        />
        <p className="text-5xl font-extrabold m-0 text-secondary">TechForge</p>

        <Link href="/Builder" className="w-full">
          <button className=" w-full rounded-2xl bg-main border-secondary border-4 p-2  text-secondary font-extrabold font-funnel hover:bg-secondary hover:text-white ">
            Build Your Pc
          </button>
        </Link>
        <button className="block w-full rounded-2xl bg-main border-secondary border-4 p-2 mt-24 text-secondary font-extrabold font-funnel hover:bg-secondary hover:text-white ">
          <Link href="/Guides" className="w-full px-20 py-4">
            Guides
          </Link>
        </button>
        <button className="block w-full rounded-2xl bg-main border-secondary border-4 p-2 mt-24 text-secondary font-extrabold font-funnel hover:bg-secondary hover:text-white ">
          <Link href="/AboutUs" className="w-full px-16 py-2">
            About Us
          </Link>
        </button>
      </nav>
    </>
  );
};
export default Sidebar;
