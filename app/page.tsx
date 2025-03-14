import Image from "next/image";
export default function Home() {
  return <section className="grid place-items-center h-screen">
    <Image src="/construction.jpg" alt="Construction" width={750} height={750} />
  </section>;
}
