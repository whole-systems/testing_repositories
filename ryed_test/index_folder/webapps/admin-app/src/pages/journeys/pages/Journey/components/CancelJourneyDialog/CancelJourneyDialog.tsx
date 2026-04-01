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

import { Input } from '@ryed/ui/ui/Input';
import { FC } from 'react';
import { useCancelJourneyDialog } from './hooks/useCancelJourneyDialog';
import { useTranslation } from 'react-i18next';
import { TJourney } from '@/models/journey';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';

const pathToCancelModalTranslation =
  'journeys:journey.journeyAction.cancelModal';

export const CancelJourneyDialog: FC<{ journeyData: TJourney }> = ({
  journeyData,
}) => {
  const { data, handlers } = useCancelJourneyDialog();
  const { t } = useTranslation();

  return (
    <Dialog open={data.openModal} onOpenChange={handlers.setOpenModal}>
      <DialogTrigger asChild>
        <Button
          onClick={() => handlers.setOpenModal((state) => !state)}
          variant="destructive"
        >
          {t(`${pathToCancelModalTranslation}.openModalBtn`)}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {t(`${pathToCancelModalTranslation}.title`)}
          </DialogTitle>
          <DialogDescription>
            {t(`${pathToCancelModalTranslation}.description`)}
            {journeyData.journeyPayment && (
              <div className="border border-gray-200 rounded-md p-4 mt-4">
                <h2 className="text-base font-medium mb-4">
                  Make sure you refund the payment from provider
                </h2>
                <p className="text-sm mb-2 flex flex-row items-center gap-2">
                  Payment ID:{' '}
                  <span
                    className="font-bold cursor-pointer hover:opacity-80 flex items-center gap-2"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        journeyData.journeyPayment?.id || ''
                      );
                      toast.success('Payment ID copied to clipboard');
                    }}
                  >
                    {journeyData.journeyPayment?.id} <Copy size={16} />
                  </span>
                </p>
                <p className="text-sm flex flex-row items-center gap-2">
                  Invoice ID:{' '}
                  <span
                    className="font-bold cursor-pointer hover:opacity-80 flex items-center gap-2"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        journeyData.journeyPayment?.invoiceId || ''
                      );
                      toast.success('Invoice ID copied to clipboard');
                    }}
                  >
                    {journeyData.journeyPayment?.invoiceId} <Copy size={16} />
                  </span>
                </p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            name="reason"
            value={data.formik.values.reason}
            onChange={data.formik.handleChange}
            placeholder={t(
              `${pathToCancelModalTranslation}.reasonFieldPlaceholder`
            )}
          />
          <div>
            <span className="text-rose-600">
              {data.formik.errors.reason ?? ''}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button
            loading={data.isLoading}
            onClick={data.formik.submitForm}
            variant={'destructive'}
          >
            {t(`${pathToCancelModalTranslation}.confirmBtn`)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
