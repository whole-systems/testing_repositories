import { FC, useState } from 'react';
import { EJourneyType, InitialEditPriceRuleValues } from '../../utils/models';
import { FormikProps } from 'formik';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Combobox,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@ryed/ui';

interface Props {
  formik: FormikProps<InitialEditPriceRuleValues>;
}
const priorityOptions = Array.from({ length: 100 }, (_, index) => ({
  label: (index + 1).toString(),
  value: (index + 1).toString(),
}));
export const CommonInformation: FC<Props> = ({ formik }) => {
  const [openPriorityCombobox, setOpenPriorityCombobox] = useState(false);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Common Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div>
            <Input
              name="name"
              disabled
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <p className="text-red-700 text-sm">{formik.errors.name}</p>
          </div>
          <div>
            <Combobox
              open={openPriorityCombobox}
              setOpen={setOpenPriorityCombobox}
              value={formik.values.priority}
              setValue={(value) => formik.setFieldValue('priority', value)}
              options={priorityOptions}
              selectText="Select priority of rule"
            />
            <p className="text-red-700 text-sm">{formik.errors.priority}</p>
          </div>
          <Select
            onValueChange={(value) =>
              formik.setFieldValue('typeOfJourney', value)
            }
            value={formik.values.typeOfJourney}
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
          <p className="text-red-700 text-sm">{formik.errors.typeOfJourney}</p>
        </div>
      </CardContent>
    </Card>
  );
};
