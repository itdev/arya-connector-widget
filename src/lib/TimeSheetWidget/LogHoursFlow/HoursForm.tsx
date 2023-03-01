import React from 'react';
import { TimePicker } from '../../shared';
import BreakOutInputs from './BreakOutInputs';
import { FormInstance } from 'antd-mobile/es/components/form';

type Props = {
  form: FormInstance;
};

const HoursForm: React.FC<Props> = ({ form }) => {
  return (
    <>
      <TimePicker name="clockIn" label="Clocked in at:" placeholder="Enter clock in time" form={form} />
      <BreakOutInputs form={form} />
      <TimePicker name="clockOut" label="Clocked out at:" placeholder="Enter clock out time" form={form} />
    </>
  );
};

export default HoursForm;
