import { SelectSeparator } from "@/components/ui/select";
import { AiOutlineFile } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

const LaporanHasilPemeriksaanData = {
  value: "link1.",
  label: "link 1",
};

export default async function Home({ params }: { params: { np: string } }) {
  return (
    <>
      <main className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between w-full">
        <div className="lg:w-3/5 mb-0 pb-0">
          <h1 className="text-2xl font-semibold text-mandiriBlue-950 mb-4">
            halo
          </h1>
        </div>
      </main>
    </>
  );
}
