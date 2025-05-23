import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-4 md:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-xl font-bold">GroundDocs</span>
      </div>
      <div className="flex space-x-4 items-center">
        <SignedOut>
          <Link to="/sign-in">
            <Button variant="outline" className="font-medium text-base px-8 bg-green-500 hover:bg-green-600 text-white">
              Sign in
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button className="font-medium">
              Sign up <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link to="/home">
            <Button variant="outline" className="mr-2 font-medium text-base px-8 bg-green-500 hover:bg-green-600 text-white">
              Dashboard
            </Button>
          </Link>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "border-2 border-primary",
              }
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
