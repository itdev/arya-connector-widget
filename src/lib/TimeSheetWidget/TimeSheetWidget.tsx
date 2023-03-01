import React, { memo, useCallback, useState } from 'react';
import { Button, Card, ConfigProvider, Grid } from 'antd-mobile';
import { ClockCircleFill, CloseCircleFill, LeftOutline } from 'antd-mobile-icons';
import { If, MobileSpinner } from '../shared';
import classNames from 'classnames';
import styles from './styles.module.scss';
import historyIcon from './assets/historyIcon.svg';

import enUS from 'antd-mobile/es/locales/en-US';

const MainView = React.lazy(() => import('./MainView'));
const ClockInFlow = React.lazy(() => import('./ClockInOutFlow'));
const LogHoursFlow = React.lazy(() => import('./LogHoursFlow/LogHoursFlow'));
const ScheduleFlow = React.lazy(() => import('./ScheduleFlow/ScheduleFlow'));
const History = React.lazy(() => import('./History'));

export const enum NavStep {
  Main = 'MAIN',
  ClockIn = 'CLOCK_IN',
  ClockOut = 'CLOCK_OUT',
  StartBreak = 'START_BREAK',
  EndBreak = 'END_BREAK',
  LogHoursCalendar = 'LOG_HOURS_CALENDAR',
  LogHoursForm = 'LOG_HOURS_FORM',
  LogHoursSummary = 'LOG_HOURS_SUMMARY',
  ScheduleCalendar = 'SCHEDULE_CALENDAR',
  ScheduleHours = 'SCHEDULE_HOURS',
  ScheduleSummary = 'SCHEDULE_SUMMARY',
  History = 'History',
}

type State = {
  prevSteps: Set<NavStep>;
  currentStep: NavStep;
};

const TimeSheetWidget: React.FC = memo(() => {
  const [widgetOpen, setWidgetOpenState] = useState(false);
  const [widgetNavigationStep, setWidgetNavigationStep] = useState<State>({
    prevSteps: new Set(),
    currentStep: NavStep.Main,
  });

  const toggleWidgetCard = () => {
    setWidgetOpenState((prevState) => !prevState);
  };

  const onSetWidgetFlowStep = useCallback((step: NavStep) => {
    setWidgetNavigationStep((prevState) => {
      const prevSteps = prevState.prevSteps.add(prevState.currentStep);
      if (step === NavStep.Main) {
        prevSteps.clear();
      }
      return {
        prevSteps: prevSteps,
        currentStep: step,
      };
    });
  }, []);

  const onNavBack = useCallback(() => {
    setWidgetNavigationStep((prevState) => {
      const currentStep = Array.from(prevState.prevSteps).pop() || NavStep.Main;
      if (prevState.prevSteps.has(currentStep)) {
        prevState.prevSteps.delete(currentStep);
      }
      return {
        ...prevState,
        currentStep: currentStep,
      };
    });
  }, []);

  const renderCardBody = () => {
    switch (widgetNavigationStep.currentStep) {
      case NavStep.Main:
        return <MainView onSetWidgetFlowStep={onSetWidgetFlowStep} />;
      case NavStep.ClockIn:
      case NavStep.ClockOut:
        return (
          <ClockInFlow onSetWidgetFlowStep={onSetWidgetFlowStep} currentViewStep={widgetNavigationStep.currentStep} />
        );
      case NavStep.LogHoursCalendar:
      case NavStep.LogHoursForm:
      case NavStep.LogHoursSummary:
        return (
          <LogHoursFlow onSetWidgetFlowStep={onSetWidgetFlowStep} currentViewStep={widgetNavigationStep.currentStep} />
        );
      case NavStep.ScheduleCalendar:
      case NavStep.ScheduleHours:
      case NavStep.ScheduleSummary:
        return (
          <ScheduleFlow onSetWidgetFlowStep={onSetWidgetFlowStep} currentViewStep={widgetNavigationStep.currentStep} />
        );
      case NavStep.History:
        return <History />;
      default:
        return <p>404</p>;
    }
  };

  const renderTitle = () => {
    let titleLabel = 'Time Card';
    let backArrow = true;

    switch (widgetNavigationStep.currentStep) {
      case NavStep.Main:
        backArrow = false;
        titleLabel = 'Time Card';
        break;
      case NavStep.LogHoursCalendar:
        titleLabel = 'What Days?';
        break;
      case NavStep.LogHoursForm:
        titleLabel = 'What Hours?';
        break;
      case NavStep.LogHoursSummary:
      case NavStep.ScheduleSummary:
        titleLabel = 'Summary';
        break;
      case NavStep.ScheduleCalendar:
        titleLabel = 'Schedule';
        break;
      case NavStep.History:
        titleLabel = 'All Logged Hours';
        break;
    }

    return (
      <Grid columns={24} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Grid.Item
          span={3}
          className={classNames(styles.backArrowGriDItem, {
            [styles.hide]: !backArrow,
          })}
        >
          <Button onClick={onNavBack} style={{ border: '0' }}>
            <LeftOutline style={{ height: '1.3rem', width: '1.3rem' }} />
          </Button>
        </Grid.Item>
        <Grid.Item span={21} style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '1.3rem' }}>{titleLabel}</span>
        </Grid.Item>
      </Grid>
    );
  };

  const renderToggleWidgetButton = () => {
    if (widgetOpen) {
      return (
        <CloseCircleFill
          onClick={toggleWidgetCard}
          className={classNames(styles.widgetButton, {
            [styles.closeState]: widgetOpen,
          })}
        />
      );
    }
    return <ClockCircleFill onClick={toggleWidgetCard} className={styles.widgetButton} />;
  };

  return (
    <ConfigProvider locale={enUS}>
      <div className={styles.root}>
        <If condition={widgetOpen}>
          <Card
            title={renderTitle()}
            className={styles.card}
            headerClassName={styles.cardHeader}
            extra={
              <Button onClick={() => onSetWidgetFlowStep(NavStep.History)} style={{ border: '0' }}>
                <img style={{ height: '1.3rem', width: '1.3rem' }} src={historyIcon} alt="history" />
              </Button>
            }
          >
            <React.Suspense fallback={<MobileSpinner />}>{renderCardBody()}</React.Suspense>
          </Card>
        </If>
        <div className={styles.footer}>{renderToggleWidgetButton()}</div>
      </div>
    </ConfigProvider>
  );
});

export default TimeSheetWidget;
