import React from 'react';
import { Button, Grid } from 'antd-mobile';
import classNames from 'classnames';
import useStopwatch from '../../hooks/useStopwatch';
import { If } from '../../shared';
import { NavStep } from '../TimeSheetWidget';
import styles from '../styles.module.scss';

const ClockOutView = React.lazy(() => import('./ClockOutView'));

type Props = {
  onSetWidgetFlowStep: (step: NavStep) => void;
  currentViewStep: NavStep;
};

const ClockInView: React.FC<Props> = ({ onSetWidgetFlowStep, currentViewStep }) => {
  const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({
    autoStart: true,
    offsetTimestamp: 0,
  });

  const clockInButtons = [
    {
      key: NavStep.EndBreak,
      name: 'End a Break',
    },
    {
      key: NavStep.StartBreak,
      name: 'Start a Break',
    },
    {
      label: 'Done for the day ?',
      key: NavStep.ClockOut,
      name: 'Clock Out',
    },
    {
      label: 'Tell us when you want to work ?',
      key: NavStep.ScheduleCalendar,
      name: 'Schedule',
    },
  ];

  const onButtonClick = (key: NavStep) => {
    if (key === NavStep.StartBreak) {
      pause();
    } else if (key === NavStep.EndBreak) {
      start();
    } else {
      onSetWidgetFlowStep(key);
    }
  };

  return (
    <>
      <If condition={currentViewStep === NavStep.ClockIn}>
        <Grid columns={1} gap={16}>
          {clockInButtons
            .filter((button) => (isRunning ? button.key !== NavStep.EndBreak : button.key !== NavStep.StartBreak))
            .map((button) => (
              <Grid.Item key={button.name}>
                {button.key === NavStep.StartBreak || button.key === NavStep.EndBreak ? (
                  <p>
                    Start time: {hours}:{minutes}:{seconds}
                  </p>
                ) : (
                  <p className={styles.buttonLabel}>{button.label}</p>
                )}
                <Button
                  color="primary"
                  size="large"
                  onClick={() => onButtonClick(button.key)}
                  className={classNames(styles.button, {
                    [styles.clockOut]: button.key === NavStep.ClockOut,
                  })}
                >
                  {button.name}
                </Button>
              </Grid.Item>
            ))}
        </Grid>
      </If>
      <If condition={currentViewStep === NavStep.ClockOut}>
        <ClockOutView onSetWidgetFlowStep={onSetWidgetFlowStep} />
      </If>
    </>
  );
};

export default ClockInView;
