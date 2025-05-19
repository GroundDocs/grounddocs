import { useState } from "react";
import { Key, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import CreateAPIKeyDialog from "@/components/APIKeys/CreateAPIKeyDialog";
import DeleteAPIKeyDialog from "@/components/APIKeys/DeleteAPIKeyDialog";
import APIKeyCreatedDialog from "@/components/APIKeys/APIKeyCreatedDialog";

interface APIKey {
  id: string;
  name: string;
  prefix: string;
  created: string;
  lastUsed: string | null;
  status: "active" | "inactive";
}

const APIKeys = () => {
  const { toast } = useToast();
  const [keys, setKeys] = useState<APIKey[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isKeyCreatedDialogOpen, setIsKeyCreatedDialogOpen] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");
  const [keyToDelete, setKeyToDelete] = useState<APIKey | null>(null);

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "API Keys", path: "/api-keys" },
  ];

  const handleCreateKey = (name: string) => {
    // Generate a random key prefix (in real app would come from backend)
    const keyPrefix = `NWnvBhiT${Math.random().toString(36).substring(2, 6)}`;
    
    // Generate a full key (in real app would come from backend)
    const fullKey = `${keyPrefix}${Math.random().toString(36).substring(2, 15)}frEce3UunwehPIfwIE=`;
    
    const newKey: APIKey = {
      id: Math.random().toString(),
      name,
      prefix: `${keyPrefix}...`,
      created: "less than a minute ago",
      lastUsed: "Never",
      status: "active",
    };

    setKeys([...keys, newKey]);
    setNewApiKey(fullKey);
    setIsCreateDialogOpen(false);
    setIsKeyCreatedDialogOpen(true);
  };

  const handleDeleteKey = () => {
    if (keyToDelete) {
      setKeys(keys.filter(key => key.id !== keyToDelete.id));
      setIsDeleteDialogOpen(false);
      setKeyToDelete(null);
      
      toast({
        title: "API Key deleted successfully.",
        variant: "default",
      });
    }
  };

  const openDeleteDialog = (key: APIKey) => {
    setKeyToDelete(key);
    setIsDeleteDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <Breadcrumb items={breadcrumbItems} />
      <div className="p-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">API Keys</h1>
            <p className="text-gray-500">Manage your API keys</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New API Key
          </Button>
        </div>

        {keys.length === 0 ? (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-semibold text-xl mb-2">No API Keys Found</h2>
            <p className="text-gray-600">You haven't created any API keys yet. Get started by creating one.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Key Prefix</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-medium">{key.name}</TableCell>
                    <TableCell className="font-mono">{key.prefix}</TableCell>
                    <TableCell>{key.created}</TableCell>
                    <TableCell>{key.lastUsed || "Never"}</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-500">{key.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => openDeleteDialog(key)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <CreateAPIKeyDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSubmit={handleCreateKey}
        />

        <DeleteAPIKeyDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          keyToDelete={keyToDelete}
          onConfirm={handleDeleteKey}
        />

        <APIKeyCreatedDialog
          open={isKeyCreatedDialogOpen}
          onOpenChange={setIsKeyCreatedDialogOpen}
          apiKey={newApiKey}
        />
      </div>
    </DashboardLayout>
  );
};

export default APIKeys;