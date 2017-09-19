import React, { Component } from 'react';
import fire from './fire';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {messages: []};
  }
  componentWillMount(){
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      let message = {text: snapshot.val(), id: snapshot.key};
      this.setState({messages: [message].concat(this.state.messages)});
    })
  }
  addMessage(e){
    e.preventDefault();
    fire.database().ref('messages').push(this.inputEl.value);
    this.inputEl.value = '';
  }
  render(){
    return(
      <form onSubmit={this.addMessage.bind(this)}>
        <input type="text" ref = {el => this.inputEl = el}/>
        <input type="submit"/>
          <ul>
          {this.state.messages.map(message => <li key={message.id}>{message.text}</li>)}
          </ul>
        </form>
      );
  }
}

// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
