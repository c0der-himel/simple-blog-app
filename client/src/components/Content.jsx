import { useEffect, useState } from 'react';
import axios from 'axios';

const Content = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      title,
      body,
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload,
    })
      .then(() => {
        console.log('Data Sent');
        setTitle('');
        setBody('');
        getBlogPost();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBlogPost = () => {
    axios
      .get('/api')
      .then((response) => {
        const data = response.data;
        setPosts(data);
        console.log('Data received');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBlogPost();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <div className="form shadow-lg rounded-3 p-5">
            <div className="form-title text-center mb-4">
              <h1>Blog Post</h1>
              <hr />
            </div>
            <div className="form-content">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Enter Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={title}
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="body" className="form-label">
                    Enter Body
                  </label>
                  <textarea
                    name="body"
                    id="body"
                    cols="30"
                    rows="7"
                    value={body}
                    className="form-control"
                    onChange={(e) => setBody(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-4 d-grid">
                  <button className="btn btn-dark py-2 shadow-lg">Post</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="posts ms-5 shadow-lg rounded-3 p-5 mb-5">
            <div className="posts-title text-center mb-4">
              <h1>Posts</h1>
              <hr />
            </div>
            <div className="posts-content">
              {posts &&
                posts.map((post, index) => {
                  return (
                    <div
                      className="post px-5 py-4 my-4 shadow-lg rounded-3"
                      key={index}
                    >
                      <h3>{post.title}</h3>
                      <p>{post.body}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
