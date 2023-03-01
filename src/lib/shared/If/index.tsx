import React from 'react';

type Props = {
  condition: boolean;
  children?: React.ReactNode;
};

export default class If extends React.PureComponent<Props> {
  static displayName = 'If';

  render() {
    return this.props.condition ? React.Children.only(this.props.children) : null;
  }
}
