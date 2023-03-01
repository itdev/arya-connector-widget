import React, { memo, useEffect, useMemo, useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Button, CustomInputField, Spinner, SubmitButton } from '../shared';
import styles from './AryaWidget.module.css';

enum WidgetInputType {
  text = 'text',
  date = 'date',
  time = 'time',
  button = 'button',
  email = 'email',
}

export type WidgetConfigT = {
  type: WidgetInputType;
  placeholder: string;
  name: string;
  title: string;
  validation?: {
    required?: boolean;
    regex?: string;
  };
};

type WidgetConfig = {
  form: Array<{ type: WidgetInputType; placeholder: string; name: string; title: string; validation?: any }>;
  metadata: Record<'jobId', string>;
};

enum WidgetState {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

type Widget = {
  config: WidgetConfig;
  createdAt: string;
  deletedAt?: string;
  description?: string;
  id: string;
  name: string;
  currentState: WidgetState;
  organizationId: string;
  updatedAt: string;
};

export interface IWidget {
  user: string;
  auth: string;
  widget: string;
}

type State = {
  widget?: Widget;
  loading: boolean;
  error?: string;
};

type AryaPostableEvent = {
  userId: string;
  jobId: string;
  ts: number;
  data: { key: string; value: string }[];
  isManualPayout?: boolean;
};

const AryaWidget = memo<IWidget>(({ user, auth, widget }) => {
  const [state, setState] = useState<State>({
    loading: true,
  });

  const onSubmitForm = async (values: Record<string, string>, actions: FormikHelpers<any>) => {
    try {
      if (state.widget?.config.metadata.jobId) {
        const event: AryaPostableEvent = {
          userId: user,
          jobId: state.widget.config.metadata.jobId,
          ts: new Date().getTime(),
          data: [
            {
              key: 'Timezone',
              value: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
          ],
        };
        for (const parameterKey of Object.keys(values)) {
          event.data.push({
            key: parameterKey,
            value: values[parameterKey],
          });
        }

        if (state.widget.description) {
          event.data.push({
            key: 'Description',
            value: state.widget.description,
          });
        }

        await fetch('https://v2.api.aryaworks.com/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${auth}`,
          },
          body: JSON.stringify([event]),
        });

        actions.setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Retrieves the widget config
    fetch(`https://api.aryaworks.com/customer-api/v1/widgets/${widget}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
        'content-type': 'application/json',
        accept: 'application/json',
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          throw Error(error.errorMessage);
        }
        return response.json();
      })
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          widget: response,
          loading: false,
        }));
      })
      .catch((err) => {
        console.log(err);
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: err.message,
        }));
      });
  }, [auth, widget]);

  const initialValues = useMemo(
    () =>
      state.widget?.config.form.reduce((acc, curr) => {
        acc[curr.name] = '';
        return acc;
      }, {} as Record<string, string>) || {},
    [state.widget?.config.form]
  );

  const renderWidgetForm = () => {
    if (state.loading) {
      return <Spinner />;
    }

    if (state.widget?.currentState === WidgetState.DRAFT) {
      return <p>Widget is in Draft state.</p>;
    }

    if (state.widget?.deletedAt) {
      return <p>Widget is deleted.</p>;
    }

    if (state.error) {
      return <p>{state.error}</p>;
    }

    return (
      <Formik onSubmit={onSubmitForm} initialValues={initialValues}>
        {(formikProps) => {
          return (
            <Form className={styles.form}>
              {state.widget?.config.form.map((widgetObject, index) => {
                if (widgetObject.type === WidgetInputType.button) {
                  return <Button widgetConfigObject={widgetObject} key={index} />;
                }
                return <Field key={index} component={CustomInputField} {...widgetObject} />;
              })}
              <SubmitButton disabled={formikProps.isSubmitting} />
            </Form>
          );
        }}
      </Formik>
    );
  };

  return (
    <div className={styles.root}>
      <h1>{state.widget?.name}</h1>
      <p>Description: {state.widget?.description}</p>
      <p>User: {user}</p>
      <p>Job Id: {state.widget?.config.metadata.jobId}</p>
      {state.widget?.currentState === WidgetState.DRAFT}
      {renderWidgetForm()}
    </div>
  );
});

export default AryaWidget;
