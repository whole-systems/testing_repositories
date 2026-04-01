import Intercom from '@intercom/messenger-js-sdk';
import { FC } from 'react';

interface IIntercomMessengerProps {
  user: {
    id: string;
    name: string;
    email?: string;
    createdAt?: number;
  };
  ActionComponent?: React.ReactNode;
}

export const IntercomMessenger: FC<IIntercomMessengerProps> = ({
  user,
  ActionComponent,
}) => {
  Intercom({
    app_id: 'rwh6g7ip',
    user_id: user.id, // IMPORTANT: Replace "user.id" with the variable you use to capture the user's ID
    name: user.name, // IMPORTANT: Replace "user.name" with the variable you use to capture the user's name
    ...(user.email && { email: user.email }),
    ...(user.createdAt && { created_at: user.createdAt }),
    custom_launcher_selector: '#my-custom-intercom-button',
    hide_default_launcher: true,
  });

  return (
    <div id="my-custom-intercom-button">
      {ActionComponent ? ActionComponent : null}
    </div>
  );
};
