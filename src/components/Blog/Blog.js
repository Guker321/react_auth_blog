import React, { useEffect, useState } from 'react';
import BlogArticles from './BlogArticles';

import styles from './Blog.module.css';

const DATABASE_URL = 'https://react-blog-a14ad-default-rtdb.firebaseio.com/';

const Blog = (props) => {
  const [postsData, setPosts] = useState([]);

  const fetchPosts = () => {
    fetch('https://react-blog-a14ad-default-rtdb.firebaseio.com/posts.json')
      .then((response) => {
        return response.json();
      })
      .then((posts) => {
        let loadedPosts = [];
        for (let key in posts) {
          loadedPosts.push({
            key: key,
            author: posts[key].author,
            text: posts[key].postText,
            date: posts[key].date,
          });
        }
        setPosts(loadedPosts);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.blog}>
      <button>Add New Post</button>
      <h2 className={styles.blog__title}>Blog Posts</h2>
      <ul className={styles.blog__ul}>
        {postsData.map((article) => (
          <BlogArticles
            key={article.key}
            text={article.text}
            date={article.date}
            author={article.author}
          />
        ))}
      </ul>
    </div>
  );
};

export default Blog;

const DUMMY_ARTICLES = [
  {
    id: 'p1',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis illo fugit obcaecati at odit eos laborum dignissimos quidem hic. Incidunt veniam quod modi est quia impedit aperiam qui, omnis explicabo!',
    author: 'Oleg',
    date: new Date().toLocaleDateString(),
  },
  {
    id: 'p2',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis illo fugit obcaecati at odit eos laborum dignissimos quidem hic. Incidunt veniam quod modi est quia impedit aperiam qui, omnis explicabo!',
    author: 'Max',
    date: new Date().toLocaleDateString(),
  },
  {
    id: 'p3',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis illo fugit obcaecati at odit eos laborum dignissimos quidem hic. Incidunt veniam quod modi est quia impedit aperiam qui, omnis explicabo!',
    author: 'Olga',
    date: new Date().toLocaleDateString(),
  },
];
