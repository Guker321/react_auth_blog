import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './AddNewPostForm.module.css';

const AddNewPostForm = (props) => {
  const [postForm, setPostForm] = useState({
    author: '',
    postText: '',
    date: new Date().toLocaleDateString(),
  });

  const history = useHistory();

  const submitPostHandler = (event) => {
    event.preventDefault();

    fetch('https://react-blog-a14ad-default-rtdb.firebaseio.com/posts.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postForm),
    })
      .then((response) => {
        if (response.ok) {
          history.push('/blog');
        } else {
          console.log('something goes wrong!');
        }
      })
      // .then((data) => console.log(data))
      .catch((error) => {
        console.log(error);
      });

    setPostForm(() => {
      return {
        author: '',
        postText: '',
      };
    });
  };
  const authorHandler = (event) => {
    setPostForm((prevState) => {
      return { ...prevState, author: event.target.value };
    });
  };
  const postTextHandler = (event) => {
    setPostForm((prevState) => {
      return { ...prevState, postText: event.target.value };
    });
  };

  return (
    <form onSubmit={submitPostHandler} className={styles.post__form}>
      <label htmlFor='username'>Write your name:</label>
      <input
        onChange={authorHandler}
        value={postForm.author}
        required
        maxLength='15'
        type='text'
        id='username'
      />
      <label htmlFor='post'>Write your post:</label>
      <textarea
        onChange={postTextHandler}
        value={postForm.postText}
        required
        maxLength='1000'
        className={styles.post__textarea}
        id='post'></textarea>
      <button>Add post</button>
    </form>
  );
};
export default AddNewPostForm;
