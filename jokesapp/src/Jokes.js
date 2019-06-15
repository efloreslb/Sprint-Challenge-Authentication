import React from 'react';
import api from './helpers/api';

class Jokes extends React.Component {
   state = {
      jokes: []
   }

   async componentDidMount() {
      try {
         const result = await api.get('/jokes');
         console.log(result);
         this.setState({jokes: result.data})
      } catch (err) {
         console.log(err);
      }
   }

   render() {
      return (
         <>
            <h3>Jokes</h3>
            <ol>
               {this.state.jokes.map((joke, index) => {
                  return <li key={index}>{joke.joke}</li>
               })}
            </ol>
         </>
      )
   }
}

export default Jokes;