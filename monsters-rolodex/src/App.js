import { Component } from 'react'

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state);
          }
        )

      );
  }

  onSearchChange = (event) => {
    this.setState(() => {
      return { searchField: event.target.value.toLowerCase() }
    });
  }

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField));
    return (
      <div className="App" >
        <h1 className='app-title'>Mosters Rolo-dex</h1>
        <SearchBox onChangeHandler={onSearchChange} placeholder="search monsters" className="search-box" />

        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
