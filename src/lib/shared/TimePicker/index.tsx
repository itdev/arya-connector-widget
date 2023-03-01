import React, { useState } from 'react';
import { Form, Picker, Space } from 'antd-mobile';
import { PickerValue } from 'antd-mobile/es/components/picker-view';
import { FormInstance } from 'antd-mobile/es/components/form';

const hours = Array.from({ length: 13 }, (_, i) => {
  return {
    label: String(i).padStart(2, '0'),
    value: String(i).padStart(2, '0'),
  };
});

const minutes = Array.from({ length: 60 }, (_, i) => {
  return {
    label: String(i).padStart(2, '0'),
    value: String(i).padStart(2, '0'),
  };
});

const columns = [
  [...hours],
  [...minutes],
  [
    { label: 'AM', value: 'am' },
    { label: 'PM', value: 'pm' },
  ],
];

type Props = {
  form: FormInstance;
  name: string | Array<string | number>;
  label?: string;
  placeholder?: string;
  formArrayName?: string;
  withMeridiem?: boolean;
};

const TimePicker: React.FC<Props> = ({
  name,
  label,
  placeholder,
  form,
  formArrayName = 'breaks',
  withMeridiem = true,
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<PickerValue[]>([]);

  const pickerColumns = !withMeridiem ? columns.slice(0, 2) : columns;

  return (
    <Form.Item
      name={name}
      label={label}
      onClick={() => {
        setVisible(true);
      }}
      rules={[{ required: true, message: 'Required' }]}
    >
      <Picker
        columns={pickerColumns}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={(v) => {
          setValue(v);
          if (Array.isArray(name) && formArrayName) {
            form.setFieldValue([formArrayName, ...name], v);
          } else {
            form.setFieldValue(name, v);
          }
        }}
        value={value}
      >
        {(items) => {
          const time = items.slice(0, 2);
          const meridiem = items[2];
          return (
            <Space align="center">
              <>
                {time.every((item) => item === null) ? (
                  <span>{placeholder}</span>
                ) : (
                  time.map((item) => item?.label).join(':')
                )}{' '}
                {meridiem?.label}
              </>
            </Space>
          );
        }}
      </Picker>
    </Form.Item>
  );
};

export default TimePicker;
