import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

const styles = { form: { marginBottom: 20 } };

export default class PokemonForm extends Component {
  state = {
    pokemonName: '',
  };

  handleNameChange = event => {
    this.setState({ pokemonName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {pokemonName} = this.state

    if (pokemonName.trim() === '') {
      toast.error('Введіть ім`я покемона!');
      return;
    }

    this.props.onSubmit(pokemonName);
    this.setState({ pokemonName: '' });
  };

  render() {
    const { pokemonName } = this.state;
    return (
      <form onSubmit={this.handleSubmit} style={styles.form}>
        <input
          type="text"
          name="pokemonName"
          value={pokemonName}
          onChange={this.handleNameChange}
        />
        <button type="submit">
          <ImSearch style={{ marginRight: 8 }} />
          Знайти
        </button>
      </form>
    );
  }
}