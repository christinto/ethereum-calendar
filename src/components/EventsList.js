import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import ContractData from './ContractData'

/*
 * Create component.
 */

class EventsList extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    // Get the contract ABI
    const abi = this.contracts["Calendar"].abi;

    console.log('EventsList drizzle context: ', context.drizzle);
  }

  render() {
    return null;
  }
}

EventsList.contextTypes = {
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

export default drizzleConnect(EventsList, mapStateToProps)
