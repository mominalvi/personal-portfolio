import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import IndexModule from "@/components/IndexModule";
import Awards from "@/components/Awards";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-[100px] px-lg md:px-xl max-w-container-max mx-auto pb-xxl flex-grow">
        <Hero />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-gutter gap-y-xl md:gap-y-xxl">
          <div className="md:col-span-8 md:col-start-1 md:row-start-1">
            <Experience />
          </div>
          <div className="md:col-span-8 md:col-start-1 md:row-start-2">
            <Projects />
          </div>
          <div className="md:col-span-4 md:col-start-9 md:row-start-1">
            <IndexModule />
          </div>
          <div className="md:col-span-4 md:col-start-9 md:row-start-2">
            <Awards />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
