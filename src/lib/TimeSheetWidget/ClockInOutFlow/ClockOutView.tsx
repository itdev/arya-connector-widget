import React from 'react';
import { Button, Grid } from 'antd-mobile';
import { NavStep } from '../TimeSheetWidget';
import styles from '../styles.module.scss';

type Props = {
  onSetWidgetFlowStep: (step: NavStep) => void;
};

const ClockOutView: React.FC<Props> = ({ onSetWidgetFlowStep }) => {
  return (
    <Grid columns={1}>
      <Grid.Item>
        <p className={styles.buttonLabel}>Sure you want to Clock Out ?</p>
        <Button
          color="primary"
          className={styles.button}
          size="large"
          onClick={() => onSetWidgetFlowStep(NavStep.Main)}
        >
          Confirm
        </Button>
      </Grid.Item>
    </Grid>
  );
};

export default ClockOutView;
