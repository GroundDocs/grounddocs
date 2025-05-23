import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Join GroundDocs</h1>
        <p className="text-center text-muted-foreground">Create your account</p>
      </div>
      <div className="w-full max-w-md">
        <ClerkSignUp 
          routing="path" 
          path="/sign-up" 
          signInUrl="/sign-in"
          afterSignUpUrl="/home"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-card shadow-lg border border-border rounded-lg",
              headerTitle: "text-primary",
              headerSubtitle: "text-muted-foreground",
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
              formFieldInput: "bg-background border border-input",
              footerActionText: "text-muted-foreground",
              footerActionLink: "text-primary hover:text-primary/90",
            }
          }}
        />
      </div>
      <button 
        onClick={() => navigate("/")}
        className="mt-4 text-sm text-primary hover:underline"
      >
        Back to home
      </button>
    </div>
  );
};

export default SignUp; 