import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Combobox,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ryed/ui';
import { FC } from 'react';
import {
  priorityOptions,
  useCommonInformation,
} from './hooks/useCommonInfromation';
import { EJourneyType } from '@/models/price-rules';

export const CommonInformation: FC = () => {
  const { data, handlers } = useCommonInformation();

  return (
    <div className="flex flex-col justify-between h-full">
      <Card>
        <CardHeader>
          <CardTitle>Common information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col w-full">
              <Input
                value={data.values.name}
                onChange={(e) => handlers.handleChange(e)}
                placeholder="Name"
                name="name"
              />
              <p className="text-red-700 text-sm">{data.errors.name}</p>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-full">
                <Combobox
                  open={data.openPriorityCombobox}
                  setOpen={handlers.setOpenPriorityCombobox}
                  value={data.values.priority}
                  setValue={(value) =>
                    handlers.setFieldValue('priority', value)
                  }
                  options={priorityOptions}
                  selectText="Select priority of rule"
                />
                <p className="text-red-700 text-sm">{data.errors.priority}</p>
              </div>
              <div className="flex flex-col w-full">
                <Select
                  onValueChange={(value) =>
                    handlers.setFieldValue('typeOfJourney', value)
                  }
                  value={data.values.typeOfJourney}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type of journey" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(EJourneyType).map((journeyType) => (
                      <SelectItem key={journeyType} value={journeyType}>
                        {journeyType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-red-700 text-sm">
                  {data.errors.typeOfJourney}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-row justify-end">
        <Button onClick={handlers.submitForm}>Next</Button>
      </div>
    </div>
  );
};
