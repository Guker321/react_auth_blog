import React from 'react';

import styles from './BlogArticles.module.css';

const BlogArticle = (props) => {
  return (
    <li className={styles.article}>
      <p>{props.text}</p>
      <div className={styles.user__info}>
        <p>Author: {props.author}</p>
        <p>Date of publication: {props.date}</p>
      </div>
    </li>
  );
};
export default BlogArticle;
