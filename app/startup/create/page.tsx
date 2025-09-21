import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>


      {/* Form Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#09090b] relative">
        <div className="max-w-7xl mx-auto">
          <StartupForm />
        </div>
      </section>
    </>
  );
};

export default Page;