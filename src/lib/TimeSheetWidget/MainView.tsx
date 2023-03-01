import React from 'react';
import { Button, Grid } from 'antd-mobile';
import { NavStep } from './TimeSheetWidget';
import styles from './styles.module.scss';

type Props = {
  onSetWidgetFlowStep: (step: NavStep) => void;
};

const MainView: React.FC<Props> = ({ onSetWidgetFlowStep }) => {
  const mainCardButtons = [
    {
      label: 'Ready to Work?',
      key: NavStep.ClockIn,
      name: 'Clock In',
    },
    {
      label: 'Forget to clock in?',
      key: NavStep.LogHoursCalendar,
      name: 'Log Hours',
    },
    {
      label: 'Tell us when you want to work?',
      key: NavStep.ScheduleCalendar,
      name: 'Schedule',
    },
  ];

  return (
    <Grid columns={1} gap={16}>
      {mainCardButtons.map((button) => (
        <Grid.Item key={button.name}>
          <p className={styles.buttonLabel}>{button.label}</p>
          <Button
            color="primary"
            className={styles.button}
            size="large"
            onClick={() => onSetWidgetFlowStep(button.key)}
          >
            {button.name}
          </Button>
        </Grid.Item>
      ))}
    </Grid>
  );
};

export default MainView;
