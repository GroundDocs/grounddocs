
import { Link } from "react-router-dom";
import { ChevronRight, FileText } from "lucide-react";

interface BreadcrumbProps {
  items: Array<{
    name: string;
    path: string;
  }>;
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="flex items-center px-6 py-3 border-b bg-white">
      <FileText className="w-4 h-4 mr-2 text-gray-500" />
      {items.map((item, index) => (
        <div key={item.path} className="flex items-center">
          {index > 0 && <ChevronRight className="w-3 h-3 mx-2 text-gray-400" />}
          <Link
            to={item.path}
            className={`text-sm ${
              index === items.length - 1
                ? "text-gray-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;