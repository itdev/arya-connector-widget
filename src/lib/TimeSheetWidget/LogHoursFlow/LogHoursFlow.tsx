import React, { useState } from 'react';
import { Button, Calendar, Form, Grid } from 'antd-mobile';
import { NavStep } from '../TimeSheetWidget';
import { If } from '../../shared';

const HoursForm = React.lazy(() => import('./HoursForm'));
const Summary = React.lazy(() => import('./Summary'));

type Props = {
  onSetWidgetFlowStep: (step: NavStep) => void;
  currentViewStep: NavStep;
};

export type FormItemsT = {
  date?: Date;
  hasBreaks?: boolean;
  clockIn: string[];
  clockOut: string[];
  breaks?: Array<Record<'clockIn' | 'clockOut', string[]>>;
};

const LogHoursView: React.FC<Props> = ({ onSetWidgetFlowStep, currentViewStep }) => {
  const [form] = Form.useForm<FormItemsT>();
  const [formData, setFormData] = useState<FormItemsT>();

  const onSubmit = (values: FormItemsT) => {
    setFormData((prevState) => ({
      ...prevState,
      ...values,
    }));
    onSetStep();
  };

  const onSetStep = () => {
    if (currentViewStep === NavStep.LogHoursCalendar) {
      onSetWidgetFlowStep(NavStep.LogHoursForm);
    }
    if (currentViewStep === NavStep.LogHoursForm) {
      onSetWidgetFlowStep(NavStep.LogHoursSummary);
    }
    if (currentViewStep === NavStep.LogHoursSummary) {
      onSetWidgetFlowStep(NavStep.Main);
    }
  };

  return (
    <Form
      mode="card"
      form={form}
      onFinish={onSubmit}
      initialValues={{
        date: new Date(),
      }}
      footer={
        <Button block color="primary" size="large" type="submit" style={{ width: '100%' }}>
          {currentViewStep === NavStep.LogHoursSummary ? 'Submit' : 'Next'}
        </Button>
      }
    >
      <Grid columns={1}>
        <Grid.Item span={24}>
          <If condition={currentViewStep === NavStep.LogHoursCalendar}>
            <Form.Item name="date">
              <Calendar selectionMode="single" />
            </Form.Item>
          </If>
          <If condition={currentViewStep === NavStep.LogHoursForm}>
            <HoursForm form={form} />
          </If>
          <If condition={currentViewStep === NavStep.LogHoursSummary}>
            <Summary formData={formData} />
          </If>
        </Grid.Item>
      </Grid>
    </Form>
  );
};

export default LogHoursView;
