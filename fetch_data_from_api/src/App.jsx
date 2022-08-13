import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import { useState, useEffect } from 'react'
import AddItem from './AddItem'
import SearchItem from './SearchItem'

function App() {
  const APP_URL = 'http://localhost:3500/items'

  // const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));
  // const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setItems(JSON.parse(localStorage.getItem('shoppinglist')))
    // localStorage.setItem('shoppinglist', JSON.stringify(items));
    // from localStorage to Api
    const fetchItems = async () => {
      try {
        const response = await fetch(APP_URL);
        if(!response.ok) throw Error("Did not receive expected data")
        const listItems = await response.json();
        console.log(listItems)
        setItems(listItems);
        setFetchError(null);
      } catch(err) {
        // console.log(err.message);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    // simulating loading
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000)
    // fetchItems();
  }, [])

  // const setAndSaveItems = (newItems) => {
  //   setItems(newItems);
  //   // localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  // }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNeweItem = {  id, checked: false, item};
    const listItems = [...items, myNeweItem];
    setItems(listItems);
  }


  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item)
    setItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem);
    setNewItem('')
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
       />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
          items={
            items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))
          } 
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length} />
    </div>
  )
}


export default App
