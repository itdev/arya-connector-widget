import React, { useMemo, useState } from 'react';
import { Button, Calendar, Form, Grid, Selector } from 'antd-mobile';
import { NavStep } from '../TimeSheetWidget';
import { If, TimePicker } from '../../shared';
import styles from './styles.module.scss';

const Summary = React.lazy(() => import('./Summary'));

type Props = {
  onSetWidgetFlowStep: (step: NavStep) => void;
  currentViewStep: NavStep;
};

export type FormItemsT = {
  dates?: Date | Date[];
  minHours?: string[];
  maxHours?: string[];
};

const ScheduleView: React.FC<Props> = ({ onSetWidgetFlowStep, currentViewStep }) => {
  const [description, setDescription] = useState('When do you plan to be  available?');
  const [form] = Form.useForm<FormItemsT>();
  const [formData, setFormData] = useState<FormItemsT>();
  const [dateRangeMode, setDateRangeMode] = useState<'single' | 'range'>('range');

  const dates = Form.useWatch<Date | Date[] | null | undefined>('dates', form);
  const minHours = Form.useWatch<string[] | undefined>('minHours', form);
  const maxHours = Form.useWatch<string[] | undefined>('maxHours', form);

  const onSubmit = (values: FormItemsT) => {
    setFormData((prevState) => ({
      ...prevState,
      ...values,
    }));
    onSetStep();
  };

  const onSetStep = () => {
    if (currentViewStep === NavStep.ScheduleCalendar) {
      setDescription('Roughly how many hours total?');
      onSetWidgetFlowStep(NavStep.ScheduleHours);
    }
    if (currentViewStep === NavStep.ScheduleHours) {
      setDescription('');
      onSetWidgetFlowStep(NavStep.ScheduleSummary);
    }
    if (currentViewStep === NavStep.ScheduleSummary) {
      onSetWidgetFlowStep(NavStep.Main);
    }
  };

  const submitButtonDisabledState = useMemo(() => {
    if (currentViewStep === NavStep.ScheduleCalendar) {
      if (dateRangeMode === 'single' && dates) {
        return false;
      }
      if (dateRangeMode === 'range' && Array.isArray(dates) && dates[0].getTime() !== dates[1].getTime()) {
        return false;
      }
    } else if (currentViewStep === NavStep.ScheduleHours && !!minHours?.length && !!maxHours?.length) {
      return false;
    } else if (currentViewStep === NavStep.ScheduleSummary) {
      return false;
    }
    return true;
  }, [currentViewStep, dateRangeMode, dates, maxHours?.length, minHours?.length]);

  return (
    <Form
      mode="card"
      form={form}
      onFinish={onSubmit}
      footer={
        <Button
          block
          color="primary"
          size="large"
          type="submit"
          style={{ width: '100%' }}
          disabled={submitButtonDisabledState}
        >
          {currentViewStep === NavStep.ScheduleSummary ? 'Submit' : 'Next'}
        </Button>
      }
      className={styles.form}
    >
      <Grid columns={1}>
        <Grid.Item>
          <p>{description}</p>
        </Grid.Item>
        <If condition={currentViewStep === NavStep.ScheduleCalendar}>
          <Grid.Item>
            <Selector
              showCheckMark={false}
              options={[
                {
                  label: 'Select Individual',
                  value: 'single',
                },
                {
                  label: 'Select Multiple',
                  value: 'range',
                },
              ]}
              style={{
                '--border-radius': '0px',
                '--border': 'solid transparent 1px',
                '--checked-border': 'solid var(--adm-color-primary) 1px',
                '--padding': '8px',
                '--gap': '0px',
              }}
              value={[dateRangeMode]}
              onChange={(v) => {
                if (v.length) {
                  setDateRangeMode(v[0]);
                }
                form.setFieldValue('dates', null);
              }}
            />
          </Grid.Item>
        </If>
        <Grid.Item>
          <If condition={currentViewStep === NavStep.ScheduleCalendar}>
            <Form.Item name="dates">
              <Calendar selectionMode={dateRangeMode} />
            </Form.Item>
          </If>
          <If condition={currentViewStep === NavStep.ScheduleHours}>
            <>
              <TimePicker name="minHours" label="Minimum" form={form} withMeridiem={false} />
              <TimePicker name="maxHours" label="Maximum" form={form} withMeridiem={false} />
            </>
          </If>
          <If condition={currentViewStep === NavStep.ScheduleSummary}>
            <Summary formData={formData} />
          </If>
        </Grid.Item>
      </Grid>
    </Form>
  );
};

export default ScheduleView;
