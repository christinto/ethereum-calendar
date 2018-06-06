import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class EventForm extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    var initialState = {};

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
        if (abi[i].name === this.props.method) {
            this.inputs = abi[i].inputs;

            for (var i = 0; i < this.inputs.length; i++) {
                initialState[this.inputs[i].name] = '';
            }

            break;
        }
    }

    this.state = initialState;
  }

  handleSubmit() {
    // convert date inputs to unix time using helper function
    // update requires id, add new event doesnt
    this.contracts[this.props.contract].methods[this.props.method].cacheSend(...Object.entries(this.state).map(keyValPair => {
      if (keyValPair[0] === 'start' || keyValPair[0] === 'end') {
        return this.convertToUnixTime(keyValPair[1]);
      } else {
        return keyValPair[1];
      }
    }));
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  translateType(type) {
    switch(true) {
        case /^uint/.test(type):
            return 'number'
            break
        case /^string/.test(type) || /^bytes/.test(type):
            return 'text'
            break
        case /^bool/.test(type):
            return 'checkbox'
            break
        default:
            return 'text'
    }
  }

  convertToUnixTime(time) {
    let date1 = new Date(time);
    return date1.getTime() / 1000;
  }

  render() {
    return (
      <form className="pure-form pure-form-stacked">
        {this.inputs.map((input, index) => {
          if (input.name === 'start') {
            var inputType = 'datetime-local';
            var inputLabel = 'Start time';
          } else if (input.name === 'end') {
            var inputType = 'datetime-local';
            var inputLabel = 'End time';
          } else {
            var inputType = this.translateType(input.type)
            var inputLabel = this.props.labels ? this.props.labels[index] : input.name
            // check if input type is struct and if so loop out struct fields as well
          }

            return (
              <ls key={input.name}>
                <label>{ inputLabel }:</label>
                <input id={input.name} type={inputType} name={input.name} value={this.state[input.name]} onChange={this.handleInputChange} />
              </ls>
            )
        })}
        <button key="submit" className="pure-button" type="button" onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

EventForm.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default EventForm;
