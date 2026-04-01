import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Combobox,
  Button,
} from '@ryed/ui';
import { FC } from 'react';
import { useTypeOfUserInformation } from './hooks/useTypeOfUserInformation';

export const TypeOfUserInformation: FC = () => {
  const { data, handlers } = useTypeOfUserInformation();

  return (
    <div className="flex flex-col h-full justify-between">
      <Card>
        <CardHeader>
          <CardTitle>Type of users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <Select
                onValueChange={(value) => {
                  handlers.handleChangeTypeOfUsers(value);
                  if (value === 'all') {
                    handlers.setFieldValue('user', null);
                  }
                }}
                value={data.values.typeOfUsers}
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
              <p className="text-red-700 text-sm">{data.errors.typeOfUsers}</p>
            </div>

            <div className="flex flex-col">
              {data.values.typeOfUsers === 'dispatcher' && (
                <Combobox
                  open={data.openDispatcherCombobox}
                  setOpen={handlers.setOpenDispatcherCombobox}
                  value={data.values.user?.id || ''}
                  setValue={(value) => {
                    const findUser = data.dispatchers?.find(
                      (dispatcher) => dispatcher.id === value
                    );
                    handlers.setFieldValue('user', findUser);
                  }}
                  isLoading={data.isGetDispatchersFetching}
                  options={data.dispatchers?.map((dispatcher) => ({
                    value: dispatcher.id,
                    label: dispatcher.companyName,
                  }))}
                  selectText="Select dispatcher"
                />
              )}
              {data.values.typeOfUsers === 'travel-agency' && (
                <Combobox
                  open={data.openTravelAgencyCombobox}
                  setOpen={handlers.setOpenTravelAgencyCombobox}
                  value={data.values.user?.id || ''}
                  setValue={(value) => {
                    const findUser = data.agencies?.find(
                      (agency) => agency.id === value
                    );
                    handlers.setFieldValue('user', findUser);
                  }}
                  isLoading={data.isGetAgenciesFetching}
                  options={data.agencies?.map((agency) => ({
                    value: agency.id,
                    label: agency.name,
                  }))}
                  selectText="Select travel agency"
                />
              )}
              {data.values.typeOfUsers === 'agent' && (
                <div className="flex flex-col gap-2">
                  <Combobox
                    open={data.openTravelAgencyCombobox}
                    setOpen={handlers.setOpenTravelAgencyCombobox}
                    value={data.values.agencyId}
                    setValue={(value) => handlers.handleGetAgents(value)}
                    isLoading={data.isGetAgenciesFetching}
                    options={data.agencies?.map((agency) => ({
                      value: agency.id,
                      label: agency.name,
                    }))}
                    selectText="Select agency"
                  />
                  <Combobox
                    open={data.openAgentCombobox}
                    setOpen={handlers.setOpenAgentCombobox}
                    value={data.values.user?.id || ''}
                    setValue={(value) => {
                      const findUser = data.agents?.find(
                        (agent) => agent.id === value
                      );
                      handlers.setFieldValue('user', findUser);
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
              )}
              <p className="text-red-700 text-sm">{data.errors.user}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-row justify-end gap-4">
        <Button variant="outline" onClick={handlers.handlePreviousStep}>
          Back
        </Button>
        <Button onClick={handlers.submitForm}>Next</Button>
      </div>
    </div>
  );
};
