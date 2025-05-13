import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mrbqebdd', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been added to our waitlist. We'll be in touch soon!",
        });
        setEmail("");
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Unable to join the waitlist. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4 pt-16 pb-10">
      {/* <div className="inline-flex items-center rounded-full border px-4 py-1.5 mb-8 bg-white/5 backdrop-blur-sm"> */}
        {/* <span className="text-sm font-medium">Backed by ___</span> */}
      {/* </div> */}
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
        🔒 Ground Your LLMs in Real, Trusted Knowledge
      </h1>
      
      <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
      Connect your AI to verified, version-correct documentation — across open-source projects, languages, and your code.
      </p>
      {/* <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
      
      </p> */}
      
      <Button 
        type="submit"
        size="lg"
        className="font-medium text-base px-8 mb-12 mt-1 bg-green-500 hover:bg-green-600 text-white"
      >
        <a href="https://www.npmjs.com/package/@grounddocs/grounddocs" target="_blank" rel="noopener noreferrer">
          Try the Alpha
        </a>
      </Button>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-md gap-2 mb-4">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Enter your email"
            className="pl-10 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <Button 
          type="submit" 
          size="lg"
          className="font-medium text-base px-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Joining..." : "Join the waitlist"} 
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>

      <p className="mt-6 text-sm text-muted-foreground">
      Currently supports: Kubernetes and Python - grounded answers, zero setup.
      </p>
    </div>
  );
};

export default Hero;
