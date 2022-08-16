import './App.css';
import React from 'react';

const SET_STORIES = 'SET_STORIES';
const REMOVE_STORY = 'REMOVE_STORY';
const welcome = {
  greeting: 'Hey',
  title: 'React'
};

const storiesReducer = (state, action) => {

  switch (action.type) {
    case SET_STORIES:
      return action.payload;
    case REMOVE_STORY:
      return state.filter(
        (story) => action.payload.objectID !== story.objectID
      );
    default:
      throw new Error();
  }
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
  const [stories, dispatchStories] = React.useReducer(storiesReducer, []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const getAsyncStories = () =>
    new Promise((resolve) =>
      setTimeout(
        () => resolve({ data: { stories: initialStories } }),
        2000
      ));

  React.useEffect(() => {
    setIsLoading(true);
    getAsyncStories().then((result) => {
      dispatchStories({
        type: 'SET_STORIES',
        payload: result.data.stories
      })
      setIsLoading(false);
    })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item
    });
  };

  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

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

      {isError && <p>Something went wrong ...</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
          < List list={searchedStories} onRemoveItem={handleRemoveStory}></List>
        )
      }
    </div >
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
        <button type="text" onClick={() => { onRemoveItem(item) }}>
          Dismiss
        </button>
      </span>
    </li>
  );
};


const InputWithLabel = ({ id, label, value, type = 'text', onInputChange, children, isFocused }) => {

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
