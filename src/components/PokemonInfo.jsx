import { Component } from 'react';

export default class PokemonInfo extends Component {
  state = {
    pokemon: null,
    error: null,
    status: 'idle',
  }

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName
    const nextName = this.props.pokemonName;
    // const { loading } = this.state;
    if(nextName !== prevName) {
      console.log('Змінилось імя покемона')

      this.setState({ status: 'idle' }); 
      
        fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
        .then(response => {
          if(response.ok) {
            return response.json()
          }
          return Promise.reject( new Error(`Нема покемона з ім'ям ${nextName}`))
        })
        .then(pokemon => this.setState({ pokemon, status: 'resolved' }))
        .catch(error => this.setState({ error }))
        .finally(this.setState({ loading: false }))      
    };
  };
  
  render() {
    const { pokemon, loading, error } = this.state;
    const { pokemonName } = this.props;
    return (
      <div>
        { error && <h2>{error.message}</h2>}
        { loading && <p>Загружаємо...</p> }
        { !pokemonName && <p>Веддіть ім`я покемона</p> }
        { pokemon && 
          <div>
            <h2>{pokemon.name}</h2>
            <img 
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name} width="300" 
            />
          </div>         
        }         
      </div>
    )
  };

};