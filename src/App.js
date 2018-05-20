import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import getWeb3 from './utils/getWeb3'

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import logo from "./ethereumlogo.svg";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(1, "days")),
          title: "Some title"
        },
        {
          start: new Date(),
          end: new Date(moment().add(6, "days")),
          title: "wut wut in da butt"
        },
      ]
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
     /*
     comment this out we arent using the simplestorage sample contract
     well modify this version to instantiate our contracts

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
    */
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Ethereum Calendar</h1>
        </header>
        <p className="App-intro">
          Aint nobody got time fo dat!
        </p>
        <Calendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default App;
