import React, { useMemo } from 'react';
import { FormItemsT } from './ScheduleFlow';
import dayjs from 'dayjs';

type Props = {
  formData?: FormItemsT;
};

const Summary: React.FC<Props> = ({ formData }) => {
  const summaryMessage = useMemo(() => {
    if (Array.isArray(formData?.dates)) {
      return `From ${dayjs(formData?.dates?.[0]).format('MMMM D')} to ${dayjs(formData?.dates?.[1]).format(
        'MMMM D'
      )} you will work minimum: ${formData?.minHours?.join(':')}, maximum: ${formData?.maxHours?.join(':')}`;
    }
    return `On ${dayjs(formData?.dates).format('MMMM D')} you will work minimum: ${formData?.minHours?.join(
      ':'
    )} and maximum: ${formData?.maxHours?.join(':')}`;
  }, [formData?.dates, formData?.maxHours, formData?.minHours]);

  return <p>{summaryMessage}</p>;
};

export default Summary;
