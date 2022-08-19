import { useEffect } from "react";
import { useState } from "react";
import Form from "./Form";
import List from "./List";

function App() {
  const [items, setItems] = useState([])
  const [reqType, setReqType] = useState('users')

  const APP_URL = "https://jsonplaceholder.typicode.com";

  useEffect(() => {
    const reqUrl = `${APP_URL}/${reqType}`
    const fetchItems = async () => {
      try {
        const response = await fetch(reqUrl);
        if(!response.ok) throw Error("N/A")
        const listItems = await response.json();
        setItems(listItems);
      } catch(err) {
        console.log(err)
      }
    }
    fetchItems();

  }, [reqType])


  return (
    <div className="App">
      <Form reqType={reqType} setReqType= {setReqType} />
      <List items={items} />
    </div>
  )
}

export default App
