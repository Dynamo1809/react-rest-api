import { Component } from 'react';
// Components //
import PokemonDataView from './PokemonDataView';
import PokemonPendingView from './PokemonPendingView';
import PokemonErrorView from './PokemonErrorView';
import pokemonAPI from '../services/pokemon-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

export default class PokemonInfo extends Component {
  state = {
    pokemon: null,
    error: null,
    status: Status.IDLE,
  }

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName
    const nextName = this.props.pokemonName;
    
    if(nextName !== prevName) {
      this.setState({ status: Status.PENDING }); 
      
      pokemonAPI
        .fetchPokemon(nextName)
        .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
        .catch(error => this.setState({ error, status: Status.REJECTED }))
             
    };
  };
  
  render() {
    const { pokemon, status, error } = this.state;
    const { pokemonName } = this.props;
    
    if(status === 'idle') {
      return <p>Веддіть ім`я покемона</p>
    };

    if(status === 'pending') {
      return <PokemonPendingView pokemonName={pokemonName}/>
    };

    if(status === 'rejected') {
      return <PokemonErrorView message={error.message}/>
    };

    if(status === 'resolved') {
      return (
       <PokemonDataView pokemon={pokemon}/> 
      )     
    }
  };

};