// @flow
import React from 'react';
import PropTypes from 'prop-types';
import history from '../../core/history';
import Link from '../../components/Link/Link';
import s from './styles.css';

type Props = {
  error?: Error,
  children: any,
}

type State = {
  hasError: boolean,
  error: {},
  info: {
    componentStack?: {}
  }
}

class ErrorBoundary extends React.Component<Props, State> {
  static propTypes = {
    error: PropTypes.object,
    children: PropTypes.node,
  };

  constructor() {
    super();
    this.state = {
      hasError: false,
      error: {},
      info: {},
    };
  }

  componentDidMount() {
    if (this.state.hasError !== true) { return; }
    document.title = 'Error';
  }

  componentDidCatch(error: {}, info: {componentStack?: {}}) {
    // Display fallback UI
    this.setState({ hasError: true, error, info });
  }

  goBack = (event: Event) => {
    event.preventDefault();
    history.goBack();
  };

  render() {
    if (this.state.hasError === false) {
      return this.props.children;
    }
    if (this.props.error) console.error(this.props.error); // eslint-disable-line no-console
    const { error, info } = this.state;

    return (
      <div className={s.container}>
        <main className={s.content}>
          <h1 className={s.code}>ERROR</h1>
          <p className={s.title}>You broke the Web UI, congratulations.</p>
          <p className={s.text}>Hopefully useful information:</p>
          <p className={s.title}>{error.toString()}</p>
          {info && info.componentStack ?
            <p className={s.text}>Trace:<pre>{info.componentStack.toString()}</pre></p> : null}
          <p className={s.text}>
            <a href="/" onClick={this.goBack}>Go back</a>, or head over to the&nbsp;
            <Link to="/">home page</Link> to choose a new direction.
          </p>
        </main>
      </div>
    );
  }
}

export default ErrorBoundary;
