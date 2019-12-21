import React, { Component } from 'react';
import './FrontPage.css';
export default class FrontPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: 'brak wyniku',
    };
  }

  sort = () => {
    var numbers = this.state.value.split(',').map(function (item) {
      return parseInt(item, 10);
    });
    let vector = { "vector": numbers };
    fetch('http://localhost:8080/project_losko_migdal_backend', {
      method: 'post',
      body: vector
    }).then((response)=> {
      return response.json();
    }).then((data) => {
      this.setState({
        result: data
      })
    })
  }

  onChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <div className="FrontPageContainer" >
        <div className="Header">
          <p className="Title">Sortowanie bąbelkowe </p>
          <p className="Title">wektora liczb całkowitych</p>
        </div>

        <p className="Title">Prosze podać wektor do posortowania (przykład: 1,2,3,4,5)</p>
        <input className="NumberInput" placeholder={"wektor"} value={this.state.value} onChange={this.onChange} />
        <div className="Btn" onClick={this.sort} >Posortuj</div>
        <p className="Title">Wynik: {this.state.result}</p>
      </div>
    );
  }
}