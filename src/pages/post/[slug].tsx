import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

interface Post {
    first_publication_date: string | null;
    data: {
        title: string;
        banner: {
            url: string;
        };
        author: string;
        content: {
            heading: string;
            body: {
                text: string;
            }[];
        }[];
    };
}

interface PostProps {
    post: Post;
}

export default function Post({ post }: PostProps) {
    return (
        <>
            <Head>
                <title>spacetraveling | slug</title>
            </Head>
            <Header />
            <img src="/teste.png" alt="Banner" className={styles.banner} />
            <main className={commonStyles.container}>
                <div className={styles.post}>
                    <div className={styles.postTop}>
                        <h1>Algum title</h1>
                        <ul>
                            <li>
                                <FiCalendar />
                                12 Mar 2021
                            </li>
                            <li>
                                <FiUser />
                                Thiago Fragata
                            </li>
                            <li>
                                <FiClock />
                                5 minutos
                            </li>
                        </ul>
                        
                    </div>
                    <article>
                        <section>
                            <h2>lorem ipsum</h2>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Quod blanditiis atque, velit
                                labore ipsam iste! <a href="#">Vero</a> eius
                                ipsa aliquid qui maiores voluptate tenetur
                                assumenda doloribus numquam repellat quae, rerum
                                hic.
                            </p>
                        </section>
                        <section>
                            <h2>lorem ipsum</h2>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit.{' '}
                                <strong>Quod blanditiis </strong> atque, velit
                                labore ipsam iste! Vero eius ipsa aliquid qui
                                maiores voluptate tenetur assumenda doloribus
                                numquam repellat quae, rerum hic.
                            </p>
                        </section>
                        <section>
                            <h2>lorem ipsum</h2>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Quod blanditiis atque, velit
                                labore ipsam iste! Vero eius ipsa aliquid qui
                                maiores voluptate tenetur assumenda doloribus
                                numquam repellat quae, rerum hic.
                            </p>
                        </section>
                    </article>
                </div>
            </main>
        </>
    );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
