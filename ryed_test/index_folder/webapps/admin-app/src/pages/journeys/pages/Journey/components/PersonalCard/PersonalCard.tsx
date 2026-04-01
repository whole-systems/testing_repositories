import { capitalize } from 'lodash';
import { Card } from '@ryed/ui/ui/Card';
import { FC } from 'react';
import { InfoItem } from '../InfoItem/InfoItem';
import { Avatar, AvatarImage, AvatarFallback } from '@ryed/ui/ui/Avatar';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  name: string;
  phone: string;
  avatar?: string;
  company?: string;
  type?: string;
  onClick?: () => void;
}
const pathToTabsTranslation = 'journeys:journey.tabs';
export const PersonCard: FC<Props> = ({
  title,
  name,
  phone,
  avatar,
  company,
  type,
  onClick,
}) => {
  const { t } = useTranslation();
  const getInitials = (name: string) =>
    name
      ?.split(' ')
      ?.map((n) => n[0])
      ?.join('');
  return (
    <Card className="p-4 flex flex-col cursor-pointer" onClick={onClick}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-600">{type && capitalize(type)}</p>
        </div>
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatar} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </div>
      <InfoItem
        label={t(`${pathToTabsTranslation}.peopleTab.userInfoCard.name`)}
        value={name}
      />
      <InfoItem
        label={t(`${pathToTabsTranslation}.peopleTab.userInfoCard.phone`)}
        value={phone}
      />
      {company && (
        <InfoItem
          label={t(
            `${pathToTabsTranslation}.peopleTab.ordererInfoCard.company`
          )}
          value={company}
        />
      )}
    </Card>
  );
};
