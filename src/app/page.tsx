import Link from "next/link";

export default function Home() {
  return (
    <div className=" min-h-screen flex justify-center ">
      <div className="flex flex-wrap items-center justify-center gap-2 py-4 px-1">
        <Link href="/card">Card</Link>
      </div>
    </div>
  );
}
