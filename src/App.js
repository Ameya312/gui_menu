import React from 'react';
import ReactDOM from 'react-dom';
import My_order from'./Scripts/my_order';
import './App.css'
import incedo from './download.png'
import AdminHome from './OnlinePosts/AdminHome'
import Register from './Scripts/Register';

class App extends  React.Component {
  constructor(props){
    super(props);
    this.state = { //state is by default an object
      Username:"blank",
      PWD:"blank",
      LoginDetail: [],
   }
   this.handleUsername = this.handleUsername.bind(this);
   this.handlePass = this.handlePass.bind(this);

  }

fetchCredintials(){
  fetch('http://localhost:8080/login', {
      method:'POST',
      headers: {     
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        username:this.state.Username,
        password:this.state.PWD,
      }),
  }).then(response => {
console.log(response)
          return response.json()
      }).then(json => {
          this.setState({ 
              LoginDetail:json
          }, () => {
            this.changePage();
          });
      });
}

changePage = ()=>{
  // console.log(this.state.LoginDetail.login_details.role)
  if(this.state.LoginDetail.login_details!=null){
if(this.state.LoginDetail.login_details.role=="USER")
{
ReactDOM.render(<My_order/>, document.getElementById('root'))
}
else if(this.state.LoginDetail.login_details.role=="ADMIN")
{
ReactDOM.render(<AdminHome/>, document.getElementById('root'))
}
  }
else{
alert("Incorrect Credintials");
}
  


}

handleUsername(e){
  this.setState({Username:e.target.value});
}
handlePass(e){
  this.setState({PWD:e.target.value});
}
  
signUp(){
  ReactDOM.render(<Register role="USER"/>, document.getElementById('root'))
}
  render (){

  return (
    <body>
      <div className="App">
        <header className="App-header">
          <center>
              <img src={incedo} alt="Incedo Logo" width="50%"/>
              <table>
              <tr>
                <td><label>Employee ID</label></td><td><input type="text" placeholder="enter here" name="formUserName"  onChange={this.handleUsername}></input></td>
              </tr>
              <tr>
                <td><label>password</label></td><td><input type="password" placeholder="enter here" name="PWD" onChange={this.handlePass}></input></td>
              </tr>
              <tr>
                <td><button onClick = {()=>this.fetchCredintials()} class="appB">login</button></td>
                <td><button class="appC" onClick={()=>this.signUp()} >Sign Up</button></td>
              </tr>
            </table>
          </center>      
        </header>
      </div>
    </body>
  )
  }
}

export default App;