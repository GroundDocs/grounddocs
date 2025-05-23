
import { ExternalLink, Key, Play, Users } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Home = () => {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
  ];

  const actionCards = [
    // {
    //   title: "Explore documentation",
    //   icon: ExternalLink,
    //   path: "/documentation",
    //   external: true,
    // },
    {
      title: "Get API keys",
      icon: Key,
      path: "/api-keys",
    },
    // {
    //   title: "Try the MCP Servers in Playground",
    //   icon: Play,
    //   path: "/playground",
    // },
    // {
    //   title: "Go to Billing",
    //   icon: Users,
    //   path: "/billing",
    // },
  ];

  return (
    <DashboardLayout>
      <Breadcrumb items={breadcrumbItems} />
      <div className="p-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-10">Welcome to GroundDocs</h1>
        <div className="w-full max-w-xl space-y-4">
          {actionCards.map((card) => (
            <Card key={card.title} className="border overflow-hidden">
              <Link to={card.path}>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 h-auto rounded-md bg-white hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <card.icon className="w-5 h-5 mr-3" />
                    <span>{card.title}</span>
                  </div>
                  {/* {card.external && (
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  )} */}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;