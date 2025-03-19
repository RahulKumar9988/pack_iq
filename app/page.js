import HomepageNavbar from "@/components/Navbar";
import Homepage from "@/components/wind/home/Homepage";

export default function Home() {
  return (
    <main className="flex flex-col w-full items-center relative">
      <div className="hidden sm:block w-full">
        <HomepageNavbar/>    
      </div>
      <Homepage />
    </main>
  );
}
