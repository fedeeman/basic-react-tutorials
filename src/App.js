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

  const [searchTerm, setSearchterm] = React.useState('');

  const handleSearch = (event) => {
    setSearchterm(event.target.value);    
  }

  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>{welcome.greeting + ' ' + welcome.title}</h1>
      <Search onSearch={handleSearch}></Search>
      <hr />
      <List list={searchedStories}></List>
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
  const handleChange = (event) => {
    props.onSearch(event);
  };
  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" onChange={handleChange}></input>
    </div>
  );
}

export default App;
