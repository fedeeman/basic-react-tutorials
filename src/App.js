import './App.css';

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

  return (
    <div>
      <h1>{welcome.greeting + ' ' + welcome.title}</h1>
      <Search></Search>
      <hr />
      <List list={stories} novinka={stories} ran={'dsada'}></List>
    </div>
  );
}

const List = (props) => {
  console.log(props);
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


const Search = () => {

  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
  };
  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" onChange={handleChange}></input>
    </div>
  );
}

export default App;
