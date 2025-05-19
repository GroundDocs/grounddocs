import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface APIKeyCreatedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
}

const APIKeyCreatedDialog = ({ open, onOpenChange, apiKey }: APIKeyCreatedDialogProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      description: "API key copied to clipboard",
      duration: 2000,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>API Key Created</DialogTitle>
          <DialogDescription>
            Your new API key has been created. Copy it now, as you won't be 
            able to see it again.
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-md p-4 mb-4 bg-amber-50">
          <div className="flex items-center gap-2 mb-2">
            <Key className="h-4 w-4" />
            <span className="font-medium">Important!</span>
          </div>
          <p className="text-sm">Store this key securely. It will not be shown again.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your New API Key</label>
          <div className="flex items-center gap-2">
            <Input
              readOnly
              value={apiKey}
              className="font-mono text-sm"
            />
            <Button 
              type="button" 
              variant="outline" 
              className="shrink-0"
              onClick={copyToClipboard}
            >
              Copy
            </Button>
          </div>
        </div>

        <Button 
          className="w-full mt-4" 
          onClick={() => onOpenChange(false)}
        >
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default APIKeyCreatedDialog;