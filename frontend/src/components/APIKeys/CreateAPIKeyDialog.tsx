import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

interface CreateAPIKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
  loading?: boolean;
}

const CreateAPIKeyDialog = ({ open, onOpenChange, onSubmit, loading = false }: CreateAPIKeyDialogProps) => {
  const [name, setName] = useState("");
  const form = useForm();

  const handleSubmit = () => {
    if (name.trim() && !loading) {
      onSubmit(name);
      setName("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New API Key</DialogTitle>
          <DialogDescription>
            Provide a name for your new API key.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <FormField
              name="apiKeyName"
              render={() => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input
                      placeholder="e.g., My Production Key"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full"
                      autoFocus
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={!name.trim() || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Key"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAPIKeyDialog;