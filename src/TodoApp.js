import React, { Component } from 'react';
import app from "./base";
import './SignUp.css';
import FlipMove from "react-flip-move";

class TodoApp extends Component 
{

  state = { currentUser: null }
  componentDidMount() 
  {
      const { currentUser } = app.auth()
      this.setState({ currentUser })
  }

  constructor()
  {
    super();
    const { currentUser } = this.state
    var user = currentUser && currentUser.email
    if(localStorage.getItem(user)==null)
    {
      this.state = 
      {
        items: []
      };
    }
    else
    {
      this.state = 
      {
        items: JSON.parse(localStorage.getItem(user))
      };
    }
  }

  add()
  {
    const { currentUser } = this.state
    var user = currentUser && currentUser.email;
    var title = this.refs.title.value;
    if(localStorage.getItem(user) == null)
    {
      var items = [];
      items.push(title);
      localStorage.setItem(user, JSON.stringify(items));
    }
    else
    {
      var items = JSON.parse(localStorage.getItem(user));
      items.push(title);
      localStorage.setItem(user, JSON.stringify(items));
    }
    this.setState({
      items: JSON.parse(localStorage.getItem(user))
    });
  }

  delete(e)
  {
    const { currentUser } = this.state
    var user = currentUser && currentUser.email;
    var index = e.target.getAttribute('data-key');
    var list = JSON.parse(localStorage.getItem(user));
    list.splice(index, 1);
    this.setState({
      items: list
    });
    localStorage.setItem(user, JSON.stringify(list));
  }

  render()
  {
    const { currentUser } = this.state
    return(
      <div class="form-style-5">
        <h3 align="center">Welcome {currentUser && currentUser.email}!</h3>
        <input type = "text" placeholder = "What to do?" ref="title"/>
        <button class="btn" onClick={this.add.bind(this)} > Add </button>
        <br/>
        <ul className="theList" align="center">
        <FlipMove duration={250} easing="ease-out">
          {
            this.state.items.map(function(work, index)
            {
              return(
                <button class="btn_2" onClick={this.delete.bind(this)} data-key={index}> <li key = {index}>{work}<br/></li></button>
              );
            }, this)
          }
          </FlipMove>
        </ul>
        <br/>
        <button class="btn" onClick={() => app.auth().signOut()}>Log Out</button>
      </div>
    );
  }
}

export default TodoApp;
