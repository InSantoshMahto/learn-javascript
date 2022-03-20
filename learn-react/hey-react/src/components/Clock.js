import React from 'react';

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), isToggleOn: true };
    this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  handleToggle(msg, e) {
    e.preventDefault();
    console.log(msg);
    this.setState((state) => ({ isToggleOn: !state.isToggleOn }));
  }

  render() {
    return (
      <div>
        <button onClick={(e) => this.handleToggle(this.state.isToggleOn, e)}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
