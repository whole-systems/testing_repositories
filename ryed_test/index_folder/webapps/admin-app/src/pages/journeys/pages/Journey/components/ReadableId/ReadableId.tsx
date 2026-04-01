import { Badge } from '@ryed-ui/ui/Badge';
import { Copy } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface ReadableIdProps {
  id: string;
}

export const ReadableId: React.FC<ReadableIdProps> = ({ id }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    toast('ID copied to clipboard');
  };

  return (
    <Badge
      variant="default"
      className="cursor-pointer hover:bg-slate-400"
      onClick={handleCopy}
    >
      <span className="mr-2 text-base">ID: {id}</span>
      <Copy size={14} />
    </Badge>
  );
};
