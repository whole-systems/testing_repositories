import { useNotifications } from './hooks/useNotifications';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button/Button';
import { Checkbox } from '@/components/ui/checkbox.tsx';

export const Notifications = () => {
  const { data, handlers } = useNotifications();
  const navigate = useNavigate();

  return (
    <div className="min-w-80">
      <div className="flex flex-row">
        <div
          className="flex items-center ml-2 my-2"
          onClick={handlers.selectAllToggle}
        >
          <Checkbox checked={data.selectAll} />
          <span className="ml-3">Select all</span>
        </div>
        {data.checkedList.length > 0 && (
          <Button
            className="ml-auto"
            loading={data.isLoading}
            onClick={handlers.archiveChecked}
          >
            Archive
          </Button>
        )}
      </div>

      <div className="mt-5" style={{ maxHeight: 500, overflow: 'auto' }}>
        {data.notifications?.map((notification, index) => (
          <div
            key={index}
            className={`relative mb-4 grid grid-cols-[25px_1fr] items-start pb-4 p-2 last:mb-0 last:pb-2 hover:bg-gray-800 rounded ${
              notification.type !== 'notify' ? 'cursor-pointer' : ''
            }`}
          >
            {data.checkedList.length > 0 ? (
              <Checkbox
                className="z-20"
                checked={data.checkedList.includes(notification.id)}
                onClick={() =>
                  handlers.toggleSelect(
                    notification.id,
                    data.checkedList.includes(notification.id)
                  )
                }
              />
            ) : (
              <div></div>
            )}
            <div
              className="space-y-1"
              onClick={() => {
                if (notification.type === 'notify') return;

                if (notification.metadata.vehicleDriverId) {
                  navigate(`/drivers/${notification.metadata.vehicleDriverId}`);

                  handlers.refetch();
                } else if (notification.metadata.journeyId) {
                  navigate(`/journeys/${notification.metadata.journeyId}`);

                  handlers.refetch();
                }
              }}
            >
              <p className="text-sm font-medium leading-none">
                {notification.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {notification.description}
              </p>
            </div>
            {notification.type === 'action' && notification.isRead ? (
              <span className="flex h-2 w-2 rounded-full bg-slate-500 absolute top-1 right-1" />
            ) : null}
            {notification.type === 'action' && !notification.isRead ? (
              <span className="flex h-2 w-2 rounded-full bg-sky-500 absolute top-1 right-1" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
