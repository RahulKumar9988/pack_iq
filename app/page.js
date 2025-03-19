import HomepageNavbar from "@/components/Navbar";
import Homepage from "@/components/wind/home/Homepage";

export default function Home() {
  return (
    // <main className="flex max-w-[1291px] min-h-screen flex-col lg:gap-12 items-center max-mobile:justify-between">
    <main className="flex flex-col w-full items-center relative">
      {/* Ensure Navbar is positioned absolutely and has a high z-index */}
      <div className="ml:absolute w-full top-0 left-0 z-[100] max-mobile:hidden mobile:px-5 xs:px-8 xl:px-16 max-ml:bg-[#ead4bf] ">
        <HomepageNavbar />
      </div>
      <Homepage />
    </main>
  );
}
