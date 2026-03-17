// import { LatestThoughts } from "@/components/home/latest-thoughts";

export default function Home() {
  return (
    <div className="bg-background mx-auto flex min-h-screen w-full max-w-xl flex-col gap-16 px-4 py-8 font-serif md:py-32">
      <div className="flex w-full flex-col items-start gap-6">
        <h1 className="text-2xl font-medium tracking-tighter">Jonathan Wong</h1>
        <div className="flex flex-col gap-1 text-sm">
          <p>🧑‍💻 Software Design and Development</p>
          <p>📍 Hong Kong</p>
        </div>
      </div>
      {/* <LatestThoughts /> */}
    </div>
  );
}
