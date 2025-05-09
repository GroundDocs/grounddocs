
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-4 md:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-xl font-bold">GroundDocs</span>
      </div>
      <div className="flex space-x-4 items-center">
        {/* <Button variant="outline" className="font-medium">
          Sign in
        </Button> */}
        {/* <Button className="font-medium">
          Book a demo <ArrowRight className="ml-2 h-4 w-4" />
        </Button> */}
      </div>
    </nav>
  );
};

export default Navbar;
