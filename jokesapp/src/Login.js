import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
   state = {
      username: '',
      password: ''
   }

   handleChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   handleSubmit = async e => {
      e.preventDefault();

      try {
         const { username, password } = this.state;

         const result = await axios.post('http://localhost:3300/api/login', {username, password});

         console.log(result);

         localStorage.setItem('token', result.data.authToken);
         this.props.history.push('/jokes');

      } catch (err) {
         console.log(err);
      }
   }

   render() {
      return (
         <>
            <h3>Login</h3>
            
            <form onSubmit={this.handleSubmit}>
               <input type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleChange} />
               <input type="text" name="password" value={this.state.password} placeholder="Username" onChange={this.handleChange} />
               <button type="submit">Register</button>
            </form>
         </>
      )
   }
}

export default withRouter(Login);