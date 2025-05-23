import { useState, useEffect } from "react";
import { Key, Plus, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/clerk-react";
import DashboardLayout from "@/components/DashboardLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import CreateAPIKeyDialog from "@/components/APIKeys/CreateAPIKeyDialog";
import DeleteAPIKeyDialog from "@/components/APIKeys/DeleteAPIKeyDialog";
import APIKeyCreatedDialog from "@/components/APIKeys/APIKeyCreatedDialog";
import { APIKey } from "@/lib/supabase";
import { createAPIKey, getUserAPIKeys, deleteAPIKey } from "@/services/apiKeys";

const APIKeys = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [keys, setKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isKeyCreatedDialogOpen, setIsKeyCreatedDialogOpen] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");
  const [keyToDelete, setKeyToDelete] = useState<APIKey | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const breadcrumbItems = [
    { name: "Home", path: "/home" },
    { name: "API Keys", path: "/api-keys" },
  ];

  // Load API keys on component mount
  useEffect(() => {
    if (user?.id) {
      loadAPIKeys();
    }
  }, [user?.id]);

  const loadAPIKeys = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const userKeys = await getUserAPIKeys(user.id);
      setKeys(userKeys);
    } catch (error) {
      console.error('Error loading API keys:', error);
      toast({
        title: "Error loading API keys",
        description: "Failed to load your API keys. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKey = async (name: string) => {
    if (!user?.id) return;

    try {
      setCreating(true);
      const { apiKey, fullKey } = await createAPIKey({
        name,
        user_id: user.id,
        usage_limit: 100 // Default limit - can be updated based on user's plan
      });

      setKeys([apiKey, ...keys]);
      setNewApiKey(fullKey);
      setIsCreateDialogOpen(false);
      setIsKeyCreatedDialogOpen(true);
      
      toast({
        title: "API Key created successfully",
        description: "Your new API key has been generated.",
      });
    } catch (error) {
      console.error('Error creating API key:', error);
      toast({
        title: "Error creating API key",
        description: "Failed to create API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteKey = async () => {
    if (!keyToDelete || !user?.id) return;

    try {
      setDeleting(true);
      await deleteAPIKey(keyToDelete.id, user.id);
      setKeys(keys.filter(key => key.id !== keyToDelete.id));
      setIsDeleteDialogOpen(false);
      setKeyToDelete(null);
      
      toast({
        title: "API Key deleted successfully",
        description: "The API key has been permanently deleted.",
      });
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast({
        title: "Error deleting API key",
        description: "Failed to delete API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteDialog = (key: APIKey) => {
    setKeyToDelete(key);
    setIsDeleteDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatLastUsed = (lastUsed: string | null) => {
    if (!lastUsed) return "Never";
    return formatDate(lastUsed);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Breadcrumb items={breadcrumbItems} />
        <div className="p-10 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Breadcrumb items={breadcrumbItems} />
      <div className="p-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">API Keys</h1>
            <p className="text-gray-500">Manage your API keys for GroundDocs API access</p>
          </div>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            disabled={creating}
          >
            {creating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Create New API Key
          </Button>
        </div>

        {keys.length === 0 ? (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-semibold text-xl mb-2">No API Keys Found</h2>
            <p className="text-gray-600 mb-4">
              You haven't created any API keys yet. Create your first API key to start using the GroundDocs API.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First API Key
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Key Prefix</TableHead>
                  <TableHead>Usage</TableHead>
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
                    <TableCell className="font-mono text-sm">
                      {key.api_key.substring(0, 12)}...
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {key.usage_count.toLocaleString()} / {key.usage_limit.toLocaleString()}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${Math.min((key.usage_count / key.usage_limit) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{formatDate(key.created_at)}</TableCell>
                    <TableCell className="text-sm">{formatLastUsed(key.last_used_at)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={key.status === 'active' ? 'default' : 'secondary'}
                        className={key.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}
                      >
                        {key.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => openDeleteDialog(key)}
                        disabled={deleting}
                      >
                        {deleting && keyToDelete?.id === key.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
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
          loading={creating}
        />

        <DeleteAPIKeyDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          keyToDelete={keyToDelete}
          onConfirm={handleDeleteKey}
          loading={deleting}
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