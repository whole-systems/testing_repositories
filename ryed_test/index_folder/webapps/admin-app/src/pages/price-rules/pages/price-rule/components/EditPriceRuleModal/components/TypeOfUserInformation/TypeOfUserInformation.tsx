import { FC, useEffect, useState } from 'react';
import { InitialEditPriceRuleValues } from '../../utils/models';
import { FormikProps } from 'formik';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Combobox,
} from '@ryed/ui';
import { useLazyGetDispatchersQuery } from '@/api/priceRulesEndpoints';
import { useLazyGetAgenciesQuery } from '@/api/priceRulesEndpoints';

interface Props {
  formik: FormikProps<InitialEditPriceRuleValues>;
}

export const TypeOfUserInformation: FC<Props> = ({ formik }) => {
  const [getAgencies, { isFetching: isGetAgenciesFetching, data: agencies }] =
    useLazyGetAgenciesQuery();
  const [
    getDispatchers,
    { isFetching: isGetDispatchersFetching, data: dispatchers },
  ] = useLazyGetDispatchersQuery();
  const [openDispatcherCombobox, setOpenDispatcherCombobox] = useState(false);
  const [openTravelAgencyCombobox, setOpenTravelAgencyCombobox] =
    useState(false);
  // const [openAgentCombobox, setOpenAgentCombobox] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      if (formik.values.typeOfUsers === 'dispatcher') {
        await getDispatchers();
      }
      if (formik.values.typeOfUsers === 'travel-agency') {
        await getAgencies();
      }
    };
    getUsers();
  }, [formik.values.typeOfUsers, getDispatchers, getAgencies]);
  console.log(formik.values);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Type of users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <Select
              disabled
              onValueChange={(value) =>
                formik.setFieldValue('typeOfUsers', value)
              }
              value={formik.values.typeOfUsers || 'all'}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type of users" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="agent">Agent</SelectItem> */}
                <SelectItem value="travel-agency">Travel Agency</SelectItem>
                <SelectItem value="dispatcher">Dispatcher</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-red-700 text-sm">{formik.errors.typeOfUsers}</p>
          </div>

          <div className="flex flex-col">
            {formik.values.typeOfUsers === 'dispatcher' && (
              <Combobox
                open={openDispatcherCombobox}
                setOpen={setOpenDispatcherCombobox}
                value={formik.values.user?.id || ''}
                setValue={(value) => {
                  const findUser = dispatchers?.find(
                    (dispatcher) => dispatcher.id === value
                  );
                  formik.setFieldValue('user', findUser);
                }}
                isLoading={isGetDispatchersFetching}
                options={dispatchers?.map((dispatcher) => ({
                  value: dispatcher.id,
                  label: dispatcher.companyName,
                }))}
                selectText="Select dispatcher"
              />
            )}
            {formik.values.typeOfUsers === 'travel-agency' && (
              <Combobox
                open={openTravelAgencyCombobox}
                setOpen={setOpenTravelAgencyCombobox}
                value={formik.values.user?.id || ''}
                setValue={(value) => {
                  const findUser = agencies?.find(
                    (agency) => agency.id === value
                  );
                  formik.setFieldValue('user', findUser);
                }}
                isLoading={isGetAgenciesFetching}
                options={agencies?.map((agency) => ({
                  value: agency.id,
                  label: agency.name,
                }))}
                selectText="Select travel agency"
              />
            )}
            {/* {formik.values.typeOfUsers === 'agent' && (
              <div className="flex flex-col gap-2">
                <Combobox
                  open={openTravelAgencyCombobox}
                  setOpen={setOpenTravelAgencyCombobox}
                  value={formik.values.agencyId || ''}
                  setValue={(value) => formik.handleGetAgents(value)}
                  isLoading={data.isGetAgenciesFetching}
                  options={data.agencies?.map((agency) => ({
                    value: agency.id,
                    label: agency.name,
                  }))}
                  selectText="Select agency"
                />
                <Combobox
                  open={	openAgentCombobox}
                  setOpen={setOpenAgentCombobox}
                  value={formik.values.user?.id || ''}
                  setValue={(value) => {
                    const findUser = data.agents?.find(
                      (agent) => agent.id === value
                    );
                    formik.setFieldValue('user', findUser);
                  }}
                  isLoading={data.isGetAgentsFetching}
                  options={data.agents?.map((agent) => ({
                    value: agent.id,
                    label: `${agent.firstName} ${agent.lastName}`,
                  }))}
                  selectText="Select agent"
                  disabled={!data.values.agencyId}
                />
              </div>
            )} */}
            <p className="text-red-700 text-sm">{formik.errors.user}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
