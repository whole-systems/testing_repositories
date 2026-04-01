import { Button } from '@ryed/ui/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ryed/ui/ui/Dialog';
import { FC, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReplaceAll, HelpCircle } from 'lucide-react';
import { useUpdateStatusDialog } from './hooks/useUpdateStatusDialog';
import { ETripStatus, TJourney } from '@/models/journey';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ryed/ui';
import { createPortal } from 'react-dom';

const pathToUpdateStatusModalTranslation =
  'journeys:journey.journeyAction.updateStatusModal';

// Custom Tooltip component that renders in portal
const CustomTooltip: FC<{
  children: React.ReactNode;
  content: string;
  isVisible: boolean;
  triggerRef: (el: HTMLDivElement | null) => void;
}> = ({ children, content, isVisible, triggerRef }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const currentTriggerRef = useRef<HTMLDivElement | null>(null);

  const handleRef = (el: HTMLDivElement | null) => {
    currentTriggerRef.current = el;
    triggerRef(el);
  };

  useEffect(() => {
    if (isVisible && currentTriggerRef.current) {
      const rect = currentTriggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + 8,
      });
    }
  }, [isVisible]);

  if (!isVisible) return <>{children}</>;

  const tooltipElement = (
    <div
      ref={tooltipRef}
      className="fixed z-[99999] bg-popover border rounded-md px-3 py-1.5 text-sm text-popover-foreground shadow-md max-w-xs"
      style={{
        top: position.top,
        left: position.left,
        transform: 'translateY(-50%)',
      }}
    >
      {content}
    </div>
  );

  return (
    <>
      <div ref={handleRef}>{children}</div>
      {createPortal(tooltipElement, document.body)}
    </>
  );
};

export const UpdateStatusDialog: FC<{
  status: ETripStatus;
  journey: TJourney;
}> = ({ status, journey }) => {
  const { data, handlers } = useUpdateStatusDialog({ status });
  const { t } = useTranslation();
  const [hoveredStatus, setHoveredStatus] = useState<ETripStatus | null>(null);
  const triggerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const getConfirmationMessage = (selectedStatus: ETripStatus) => {
    switch (selectedStatus) {
      case ETripStatus.FINISHED:
        return t(`${pathToUpdateStatusModalTranslation}.finishConfirmation`);
      default:
        return '';
    }
  };

  const getStatusDescription = (statusValue: ETripStatus) => {
    return t(
      `${pathToUpdateStatusModalTranslation}.statusDescriptions.${statusValue}`
    );
  };

  const getStatusError = (statusValue: ETripStatus) => {
    if (statusValue === ETripStatus.ARCHIVED) {
      const cancelledStatuses = [
        ETripStatus.CANCELLED_BY_USER,
        ETripStatus.CANCELLED_BY_DRIVER,
        ETripStatus.CANCELLED_BY_TRAVEL_AGENT,
      ];
      if (!cancelledStatuses.includes(journey.status as ETripStatus)) {
        return t(
          `${pathToUpdateStatusModalTranslation}.statusErrors.notCancelled`
        );
      }
    }

    // Check if current status is FINISHED or ARCHIVED - cannot change from these statuses
    if (journey.status === ETripStatus.FINISHED) {
      return t(
        `${pathToUpdateStatusModalTranslation}.statusErrors.alreadyFinished`
      );
    }

    if (journey.status === ETripStatus.ARCHIVED) {
      return t(
        `${pathToUpdateStatusModalTranslation}.statusErrors.alreadyArchived`
      );
    }

    // Check if dispatcher is required but not assigned
    const dispatcherRequiredStatuses = [
      ETripStatus.PENDING_DRIVER_ACCEPTANCE,
      ETripStatus.PENDING_SCHEDULED_JOURNEY,
      ETripStatus.FINISHED,
    ];

    if (
      dispatcherRequiredStatuses.includes(statusValue) &&
      !journey.dispatcherId
    ) {
      return t(
        `${pathToUpdateStatusModalTranslation}.statusErrors.noDispatcher`
      );
    }

    // Check if driver is required but not assigned
    const driverRequiredStatuses = [
      ETripStatus.PENDING_SCHEDULED_JOURNEY,
      ETripStatus.FINISHED,
    ];

    if (
      driverRequiredStatuses.includes(statusValue) &&
      !journey.vehicleDriverId
    ) {
      return t(`${pathToUpdateStatusModalTranslation}.statusErrors.noDriver`);
    }

    return null;
  };

  const isStatusDisabled = (statusValue: ETripStatus) => {
    return getStatusError(statusValue) !== null;
  };

  const getCurrentError = () => {
    if (!data.selectedStatus) return null;
    return getStatusError(data.selectedStatus);
  };

  return (
    <Dialog open={data.openModal} onOpenChange={handlers.handleModalClose}>
      <DialogTrigger asChild>
        <span
          className="text-xs cursor-pointer ml-4"
          onClick={() => handlers.setOpenModal((state) => !state)}
        >
          <ReplaceAll />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {t(`${pathToUpdateStatusModalTranslation}.title`)}
          </DialogTitle>
          <DialogDescription>
            {t(`${pathToUpdateStatusModalTranslation}.description`)}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Current status description */}
          <div className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-md">
            <div className="font-medium mb-1">
              {data.selectedStatus || status}
            </div>
            <div>{getStatusDescription(data.selectedStatus || status)}</div>
          </div>

          {/* Error message */}
          {getCurrentError() && (
            <div className="text-sm text-destructive p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              {getCurrentError()}
            </div>
          )}

          <Select
            value={data.selectedStatus || status}
            onValueChange={(value) =>
              handlers.handleStatusSelect(value as ETripStatus)
            }
          >
            <SelectTrigger>
              <SelectValue
                placeholder={t(
                  `${pathToUpdateStatusModalTranslation}.placeholder`
                )}
              />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {data.availableStatuses?.map((statusValue) => {
                const isDisabled = isStatusDisabled(statusValue);
                const error = getStatusError(statusValue);

                return (
                  <SelectItem
                    key={statusValue}
                    value={statusValue}
                    className={`${
                      statusValue === (data.selectedStatus || status)
                        ? 'opacity-50'
                        : ''
                    } ${isDisabled ? 'text-destructive' : ''}`}
                  >
                    <div className="flex items-center justify-between w-full pr-8">
                      <span className="flex-1">{statusValue}</span>
                      {statusValue !== (data.selectedStatus || status) && (
                        <CustomTooltip
                          content={error || getStatusDescription(statusValue)}
                          isVisible={hoveredStatus === statusValue}
                          triggerRef={(el) => {
                            triggerRefs.current[statusValue] = el;
                          }}
                        >
                          <div
                            onMouseEnter={() => setHoveredStatus(statusValue)}
                            onMouseLeave={() => setHoveredStatus(null)}
                            className="inline-block"
                          >
                            <HelpCircle
                              className={`h-4 w-4 ml-2 flex-shrink-0 ${
                                isDisabled
                                  ? 'text-destructive'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </div>
                        </CustomTooltip>
                      )}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button
            loading={!!data.isLoading}
            onClick={() => handlers.handleUpdateStatus()}
            disabled={!data.selectedStatus || getCurrentError() !== null}
          >
            {t(`${pathToUpdateStatusModalTranslation}.confirmBtn`)}
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Confirmation Dialog */}
      <Dialog
        open={data.showConfirmation && !!data.selectedStatus}
        onOpenChange={handlers.setShowConfirmation}
      >
        <DialogContent className="sm:max-w-[425px] min-h-[200px]">
          <DialogHeader>
            <DialogTitle>
              {t(`${pathToUpdateStatusModalTranslation}.confirmationTitle`)}
            </DialogTitle>
            <DialogDescription>
              {data.selectedStatus &&
                getConfirmationMessage(data.selectedStatus)}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handlers.setShowConfirmation(false)}
            >
              {t(`${pathToUpdateStatusModalTranslation}.cancelBtn`)}
            </Button>
            <Button
              loading={!!data.isLoading}
              onClick={() => handlers.handleConfirmUpdate()}
            >
              {t(`${pathToUpdateStatusModalTranslation}.confirmBtn`)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};
