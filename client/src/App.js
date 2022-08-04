import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetails from "./components/PostDetails";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Posts from "./components/Posts";
import Register from "./components/Register";

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/:topicName" element={<Posts />} />
          <Route path="/posts/:topicName/:id" element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
