import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { FunctionComponent } from 'react';

export interface IProfilePreviewProps {
  avatarSrc: string;
  email: string;
  organizationName?: string;
}

export const ProfilePreview: FunctionComponent<IProfilePreviewProps> = ({
  avatarSrc,
  email,
  organizationName,
}) => {
  const getInitials = (fullName: string) =>
    fullName
      .split(' ')
      .map((name) => name[0])
      .join('');

  return (
    <div className="flex flex-row gap-4 items-center">
      <div>
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatarSrc}></AvatarImage>
          <AvatarFallback>{getInitials(email)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-xs">{email}</p>
        {organizationName && <p className="text-xs">{organizationName}</p>}
      </div>
    </div>
  );
};
