
import { Home, Users, BookOpen, Play, Key, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const navigationItems = [
    {
      header: "Application",
      items: [
        { name: "Home", path: "/", icon: Home },
        // { name: "MCP Clients", path: "/mcp-clients", icon: Users },
        // { name: "Documentation", path: "/documentation", icon: BookOpen },
        // { name: "Playground", path: "/playground", icon: Play },
        { name: "API Keys", path: "/api-keys", icon: Key },
      ],
    },
    {
      header: "Settings",
      items: [
        { name: "Billing", path: "/billing", icon: CreditCard },
      ],
    },
  ];

  return (
    <div className="w-[200px] min-h-screen bg-white border-r flex flex-col justify-between">
      <div>
        <div className="p-4">
          <h1 className="text-xl font-bold text-blue-500">GroundDocs</h1>
        </div>

        <div className="mt-6">
          {navigationItems.map((section) => (
            <div key={section.header} className="mb-6">
              <p className="px-4 text-xs text-gray-500 mb-2">{section.header}</p>
              <ul>
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-2 text-sm ${
                        path === item.path
                          ? "bg-gray-100 text-black font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t flex items-center">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium mr-3">
          IS
        </div>
        <div className="flex-1 truncate">
          <p className="text-sm font-medium">Ishaan Sehgal</p>
          <p className="text-xs text-gray-500 truncate">ishaan.seh...</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;