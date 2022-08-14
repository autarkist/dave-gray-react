import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import { useState, useEffect } from 'react'
import AddItem from './AddItem'
import SearchItem from './SearchItem'
import apiRequest from './apiRequest'

function App() {
  const APP_URL = 'http://localhost:3500/items'

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(APP_URL);
        if(!response.ok) throw Error("Did not receive expected data")
        const listItems = await response.json();
        // console.log(listItems)
        setItems(listItems);
        setFetchError(null);
      } catch(err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      // (async () => await fetchItems())();
      fetchItems();
    }, 2000)
  }, [])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNeweItem = {  id, checked: false, item};
    const listItems = [...items, myNeweItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNeweItem),
    }

    // fetch(APP_URL, postOptions)
    //   .then(response => console.log(response))
      // .then(response => response.json())
      // .then(data => console.log(data))

    const result = await apiRequest(APP_URL, postOptions);
    if(result) setFetchError(result);
  }


  const handleCheck =  async (id) => {
    const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item)
    setItems(listItems);

    const myItem = listItems.filter(item => item.id === id);
    const postOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "checked": myItem[0].checked
      })
    }

    const reqUrl = `${APP_URL}/${id}`;
    const result = await apiRequest(reqUrl, postOptions);
    if(result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const postOptions = {
      method: 'DELETE',
    }

    const reqUrl = `${APP_URL}/${id}`;
    const result = await apiRequest(reqUrl, postOptions);
    if(result) setFetchError(result);
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
        {!fetchError && !isLoading && 
        <Content 
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
