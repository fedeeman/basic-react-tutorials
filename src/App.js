import './App.css';
import React from 'react';

const welcome = {
  greeting: 'Hey',
  title: 'React'
};



const App = () => {
  const initialStories = [
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

  const useStorageState = (key, initialState) => {

    const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);
    React.useEffect(
      () => {
        localStorage.setItem(key, value);
      },
      [key, value]
    );
    return [value, setValue];
  };

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [stories, setStories] = React.useState([]);

  const getAsyncStories = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve({data: {stories: initialStories}});
      }, 2000)
    }
    );
  }

  React.useEffect(() => {
    getAsyncStories().then((result) => {
      setStories(result.data.stories);
    }, []);
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleRemoveStory = (item) => {
    console.log(item);
    const newStories = stories.filter((story) => {
      return item.objectID !== story.objectID;
    });
    setStories(newStories);
  };

  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleClick = () => {
    setSearchTerm('bla bla bla');
  };

  return (
    <div>
      <h1>{welcome.greeting + ' ' + welcome.title}</h1>
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}>
          <strong>Search:</strong>
      </InputWithLabel>
      <hr />
      <List list={searchedStories} onRemoveItem={handleRemoveStory}></List>
      <button onClick={handleClick}>Set to set search term to "bla bla bla"</button>
    </div>
  );
}

const List = ({ list, onRemoveItem }) => {
  return (
    <ul>
      {list.map((item) => {
        return <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}></Item>
      })}
    </ul>
  );
}

const Item = ({ item, onRemoveItem }) => {

  const handleRemoveItem = () => {
    onRemoveItem(item);
  };

  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="text" onClick={() => {onRemoveItem(item)}}>
          Dismiss
        </button>
      </span>
    </li>
  );
};


const InputWithLabel = ({ id, label, value, type='text', onInputChange, children, isFocused }) => {

  const inputRef = React.useRef();
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        autoFocus={isFocused}
        onChange={onInputChange}></input>
    </>
  );
}

export default App;
