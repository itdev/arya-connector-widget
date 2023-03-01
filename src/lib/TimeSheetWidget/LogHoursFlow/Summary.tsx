import React, { useMemo } from 'react';
import { FormItemsT } from './LogHoursFlow';
import { List } from 'antd-mobile';
import dayjs from 'dayjs';

type Props = {
  formData?: FormItemsT;
};

const Summary: React.FC<Props> = ({ formData }) => {
  const summaryMessage = useMemo(() => {
    const clockInTime = formData?.clockIn.slice(0, 2);
    const clockInMeridiem = formData?.clockIn[2];
    const clockOutTime = formData?.clockOut.slice(0, 2);
    const clockOutMeridiem = formData?.clockOut[2];

    return `On ${dayjs(formData?.date).format('MMMM D')} you worked from ${clockInTime?.join(
      ':'
    )} ${clockInMeridiem} to ${clockOutTime?.join(':')} ${clockOutMeridiem}`;
  }, [formData?.clockIn, formData?.clockOut, formData?.date]);

  const breaks = useMemo(() => {
    if (formData?.hasBreaks && formData.breaks?.length) {
      return (
        <List header="Breaks" mode="card">
          {formData.breaks?.map((item, index) => {
            const clockInTime = item?.clockIn.slice(0, 2);
            const clockInMeridiem = item?.clockIn[2];
            const clockOutTime = item?.clockOut.slice(0, 2);
            const clockOutMeridiem = item?.clockOut[2];
            return (
              <List.Item key={index}>
                {clockInTime?.join(':')} {clockInMeridiem} to {clockOutTime?.join(':')} {clockOutMeridiem}
              </List.Item>
            );
          })}
        </List>
      );
    }
    return null;
  }, [formData?.breaks, formData?.hasBreaks]);

  return (
    <div>
      <p>{summaryMessage}</p>
      {breaks}
    </div>
  );
};

export default Summary;
