import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';

import { FiCalendar } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <div className={commonStyles.container}>
      <Header />
      <main className={styles.posts}>
        <Link href="/">
          <a className={styles.post}>
            <strong>Title</strong>
            <p>subtitle</p>
            <span>
              <FiCalendar />
              14 de mar 2021
            </span>
            <span>
              <FiUser />
              Thiago Fragata
            </span>
          </a>
        </Link>
        <button type="button">Carregar mais posts</button>
      </main>
    </div>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
