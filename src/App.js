import './App.css';
import React from 'react';

const welcome = {
  greeting: 'Hey',
  title: 'React'
};



const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1
    }
  ];

  const handleSearch = (event) => {
    console.log(event);
  }

  return (
    <div>
      <h1>{welcome.greeting + ' ' + welcome.title}</h1>
      <Search onSearch={handleSearch}></Search>
      <hr />
      <List list={stories}></List>
    </div>
  );
}

const List = (props) => {
  return (
    <ul>
      {props.list.map(item =>
        (
          <Item item={item} key={item.objectID}></Item>
        )
      )}
    </ul>
  );
}

const Item = (props) => {
  return (
    <li key={props.item.objectID}>
      <span>
        <a href={props.item.url}>{props.item.title}</a>
      </span>
      <span>{props.item.author}</span>
      <span>{props.item.num_comments}</span>
      <span>{props.item.points}</span>
    </li>
  );
};


const Search = (props) => {
  const [searchTerm, setSearchterm] = React.useState('');
  const handleChange = (event) => {
    setSearchterm(event.target.value);
    props.onSearch(event);
  };
  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" onChange={handleChange}></input>
      <p>Searching for <strong>{searchTerm}</strong>.</p>
    </div>
  );
}

export default App;
