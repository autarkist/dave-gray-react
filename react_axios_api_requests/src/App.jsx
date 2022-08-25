import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
// import { Route, Switch, useHistory } from 'react-router-dom'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Layout from './Layout'
import api from './api/posts'
import EditPost from './EditPost'

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts')
        // console.log(response);
        setPosts(response.data);
      }catch (err) {
        // Not in the 200 response range
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    } 
    fetchPosts();
  },[])
  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
      )
    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id  + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {
      id,
      title: postTitle,
      body: postBody,
      datetime: datetime
    }
    try {
      const response = await api.post('/posts', newPost)
      const allPosts = [ ...posts, response.data ]
      // const allPosts = [ ...posts, newPost ]
      setPosts(allPosts);
      setPostTitle('')
      setPostBody('')
      navigate('/')
    } catch (err) {
      console.log(`Error: ${err.message}`);
  }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp")
    const updatePost = {
      id,
      title: editTitle,
      body: editBody,
      datetime
    }

    try {
      const response = await api.put(`/posts/${id}`, updatePost)
      setPosts(posts.map(post => post.id === id ? {...response.data} : post))
      setEditTitle('')
      setEditBody('')
      navigate(`/post/${id}`)
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList);
      navigate('/')
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
      <Routes>
        <Route path="/" element={<Layout
          search={search}
          setSearch={setSearch}
         />}>
          <Route index element={<Home posts={searchResults} />} />
          <Route path="post">
            <Route index element={<NewPost 
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              setPostBody={setPostBody}
              postBody={postBody}
            />} />
            <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
          </Route>
          <Route
            path="edit/:id" element={<EditPost
              posts={posts} 
              handleEdit={handleEdit}
              editBody={editBody}
              editTitle={editTitle}
              setEditBody={setEditBody}
              setEditTitle={setEditTitle}
               />}
           />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
  )
}

export default App
