import React from 'react';
import { Button, Divider, Form, Switch } from 'antd-mobile';
import { FormInstance } from 'antd-mobile/es/components/form';
import { AddCircleOutline } from 'antd-mobile-icons';
import { If, TimePicker } from '../../shared';
import styles from './styles.module.scss';
import { FormItemsT } from './LogHoursFlow';

type Props = {
  form: FormInstance;
  formData?: FormItemsT;
};

const BreakOutInputs: React.FC<Props> = ({ form }) => {
  const hasBreaks = Form.useWatch<any>('hasBreaks', form);

  return (
    <>
      <Form.Item name="hasBreaks" label="Did you take a break?" valuePropName="checked">
        <Switch checkedText="Yes" uncheckedText="Nope" />
      </Form.Item>
      <If condition={!!hasBreaks}>
        <div style={{ maxHeight: '200px', overflow: 'auto' }}>
          <Form.Array
            name="breaks"
            onAdd={(operation) => operation.add()}
            renderAdd={() => (
              <Divider contentPosition="right" className={styles.divider}>
                <AddCircleOutline style={{ fontSize: '2rem' }} />
              </Divider>
            )}
            renderHeader={({ index }, { remove }) => (
              <Button
                onClick={() => remove(index)}
                style={{ float: 'right', border: 0, color: '#FF1F1F' }}
                size="small"
              >
                Delete
              </Button>
            )}
          >
            {(fields) =>
              fields.map(({ index }) => (
                <>
                  <TimePicker form={form} name={[index, 'clockIn']} label="Break started:" />
                  <TimePicker form={form} name={[index, 'clockOut']} label="Break ended:" />
                </>
              ))
            }
          </Form.Array>
        </div>
      </If>
    </>
  );
};

export default BreakOutInputs;
