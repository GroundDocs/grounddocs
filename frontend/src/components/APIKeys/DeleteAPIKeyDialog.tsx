import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { APIKey } from "@/lib/supabase";

interface DeleteAPIKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  keyToDelete: APIKey | null;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteAPIKeyDialog = ({ open, onOpenChange, keyToDelete, onConfirm, loading = false }: DeleteAPIKeyDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the API
            key {keyToDelete && `"${keyToDelete.name}" (${keyToDelete.api_key.substring(0, 12)}...)`} and remove its access.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Key"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAPIKeyDialog;