import Link from "next/link";

export default function Home() {
  return (
    <div className=" min-h-screen flex justify-center bg-main ">
      <div className="flex flex-wrap items-center justify-center gap-2 py-4 px-1 text-white">
        <Link href="/card">Card</Link>
        <Link href="/photobooth">Photobooth</Link>
        <Link href="/sugaverse">Sugaverse</Link>
        <Link href="/hobipalooza">Hobipalooza</Link>
        <Link href="/vpassport">Vpassport</Link>
        <Link href="/hopeisback">Hope is Back</Link>
        <Link href="/virthday">(V)irthday</Link>
        <Link href="/lovenotes">Love Notes</Link>
        <Link href="/seokjin">Fish with JIN</Link>
        <Link href="/rps">Rock-Paper-Siccors</Link>
      </div>
    </div>
  );
}
