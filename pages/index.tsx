/* eslint-disable react-hooks/exhaustive-deps */
import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {useMemo, useState} from 'react'
import BlogPreview from '../components/BlogPreview'
import {getBlogs} from '../server/blogs'
import {BlogPost} from '../types/blog'

const Home: NextPage = ({
  blogData,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [filterWord, setFilterWord] = useState<string[]>([])
  const [selectedIdx, setSelectedIdx] = useState<number[]>([])
  const filteredBlog: BlogPost[] = useMemo(() => {
    return filterWord.length > 0
      ? blogData.filter((blog: BlogPost) => {
          return filterWord.every((filter) => blog.tags.includes(filter))
        })
      : blogData
  }, [filterWord])
  const filterLabel = (tag: any, idx: number) => {
    if (selectedIdx.includes(idx)) {
      setSelectedIdx(selectedIdx.filter((id) => id !== idx))
      setFilterWord(filterWord.filter((filter) => filter !== tag))
    } else {
      setSelectedIdx([...selectedIdx, idx])
      setFilterWord([...filterWord, tag])
    }
  }

  return (
    <>
      <Head>
        <title>Github Blog GraphQL</title>
      </Head>
      <main className="layout">
        <section>
          <div className="mt-3 text-center">
            <h1 className="text-[3rem]"> Welcome to DevBlog </h1>
            <p>
              A full-stack blog made with Next.js, TailwindCSS, Github GraphQL
            </p>
            <p>
              Link github discussions:
              <a href="https://github.com/kentrung/blog-github-GraphQL/discussions" target="_blank">
                https://github.com/kentrung/blog-github-GraphQL/discussions
              </a>
            </p>
          </div>
        </section>
        <section className="flex flex-col items-center text-[1.15rem] mt-12">
          <div className="flex gap-3 mb-12">
            {tags.map((tag: string, idx: number) => (
              <button
                key={idx}
                className={`label transition-all duration-300 text-white font-light px-3 ${
                  selectedIdx.includes(idx) ? 'label-selected' : ''
                }`}
                onClick={() => filterLabel(tag, idx)}
              >
                {tag}
              </button>
            ))}
          </div>
          {filteredBlog.length <= 0
            ? 'No posts'
            : filteredBlog.map((blog: BlogPost) => (
                <div
                  key={blog.id}
                  className="max-w-[28em] max-h-[20em] overflow-hidden mx-6 mb-6 bg-neutral-300 text-zinc-800 rounded-lg p-4 hover:bg-neutral-500 hover:text-neutral-300 transition-all duration-300"
                >
                  <Link href={blog.url}>
                    <BlogPreview
                      title={blog.title}
                      url={blog.title}
                      bodyText={blog.bodyText}
                      createdAt={blog.createdAt}
                      author={blog.author}
                      tags={blog.tags}
                    />
                  </Link>
                </div>
              ))}
        </section>
      </main>
    </>
  )
}
export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs()
  let tags: string[] = []
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    }
  }
  return {
    props: {
      blogData: blogs,
      tags: tags,
    },
  }
}
