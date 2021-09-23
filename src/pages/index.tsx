import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import Prismic from '@prismicio/client';

import { FiCalendar } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Header from '../components/Header';
import styles from './home.module.scss';
import commonStyles from '../styles/common.module.scss';
import { getPrismicClient } from '../services/prismic';

import Head from 'next/head';

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

export default function Home({ postsPagination }: HomeProps) {
    const formattedPost = postsPagination.results.map(post => {
        return {
            ...post,
            first_publication_date: format(
                new Date(post.first_publication_date),
                'dd MMM yyyy',
                {
                    locale: ptBR,
                }
            ),
        };
    });

    const [posts, setPosts] = useState<Post[]>(formattedPost);
    const [nextPage, setNextPage] = useState(postsPagination.next_page);
    const [currentPage, setCurrentPage] = useState(1);

    async function handleNextPage(): Promise<void> {
        if (currentPage !== 1 && nextPage === null) {
            return;
        }

        const postsResults = await fetch(`${nextPage}`).then(response =>
            response.json()
        );

        setNextPage(postsResults.next_page);
        setCurrentPage(postsResults.page);

        const newsPosts = postsResults.results.map(post => {
            return {
                uid: post.uid,
                first_publication_date: format(
                    new Date(post.first_publication_date),
                    'dd MMM yyyy',
                    {
                        locale: ptBR,
                    }
                ),
                data: {
                    title: post.data.title,
                    subtitle: post.data.subtitle,
                    author: post.data.author,
                },
            };
        });

        setPosts([...posts, ...newsPosts]);
    }

    return (
        <>
            <Head>
                <title>spacetraveling</title>
            </Head>
            <div className={commonStyles.container}>
                <Header />
                <main className={styles.posts}>
                    {posts.map(post => (
                        <Link href={`/post/${post.uid}`} key={post.uid}>
                            <a className={styles.post}>
                                <strong>{post.data.title}</strong>
                                <p>{post.data.subtitle}</p>
                                
                                <span>
                                    <FiCalendar />
                                    {post.first_publication_date}
                                </span>
                                <span>
                                    <FiUser />
                                    {post.data.author}
                                </span>
                            </a>
                        </Link>
                    ))}

                    {nextPage && (
                        <button type="button" onClick={handleNextPage}>
                            Carregar mais posts
                        </button>
                    )}
                </main>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
    const postsResponse = await prismic.query(
        [Prismic.Predicates.at('document.type', 'posts')],
        {
            pageSize: 1,
        }
    );

    const posts = postsResponse.results.map(post => {
        return {
            uid: post.uid,
            first_publication_date: post.first_publication_date,
            data: {
                title: post.data.title,
                subtitle: post.data.subtitle,
                author: post.data.author,
            },
        };
    });

    const postsPagination = {
        next_page: postsResponse.next_page,
        results: posts,
    };

    return {
        props: {
            postsPagination,
        },
    };
};
