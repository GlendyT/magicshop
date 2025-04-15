import Link from "next/link";

export default function Home() {
  return (
    <div className=" min-h-screen flex justify-center bg-main ">
      <div className="flex flex-wrap items-center justify-center gap-2 py-4 px-1 text-white">
        <Link href="/card">Card</Link>
        <Link href="/photobooth">Photobooth</Link>
      </div>
    </div>
  );
}
