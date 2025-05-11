
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SourceVerifiedImage from "@/components/SourceVerifiedImage";
import FeatureList from "@/components/FeatureList";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar />
      <main className="flex-1 container mx-auto flex flex-col">
        <Hero />
        <div className="my-12">
          <SourceVerifiedImage />
        </div>
        <FeatureList />
      </main>
      <footer className="mt-4 py-6 text-center text-sm text-muted-foreground">
        <p>© 2025 GroundDocs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
