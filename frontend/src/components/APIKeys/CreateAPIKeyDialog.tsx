import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface CreateAPIKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
}

const CreateAPIKeyDialog = ({ open, onOpenChange, onSubmit }: CreateAPIKeyDialogProps) => {
  const [name, setName] = useState("");
  const form = useForm();

  const handleSubmit = () => {
    if (name.trim()) {
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
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={!name.trim()}
            >
              Create Key
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAPIKeyDialog;