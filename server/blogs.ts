import {BlogDetail, BlogPost} from '../types/blog'
import {discussionDetailGql, discussionGql} from './gql'

const API_URL = process.env.GITHUB_API_URL as string
const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN
const DISCUSSION_CATEGORY_ID = process.env.GITHUB_DISCUSSION_CATEGORY_ID
const fetchHeaders = {
  Authorization: `token ${ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
}

export async function getBlogs(): Promise<BlogPost[]> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: fetchHeaders,
    body: JSON.stringify({
      query: discussionGql(DISCUSSION_CATEGORY_ID as string),
    }),
  })
  const res = await response.json()
  const discussions = res.data.repository.discussions.nodes
  const posts = discussions.map((discussion: any) => {
    const {
      title,
      author,
      createdAt,
      lastEditedAt: lastEdited,
      number: id,
      bodyHTML: html,
      bodyText,
      labels,
      url: discussionUrl,
    } = discussion
    const url = `/blog/${id}`
    const authorUrl = author.url
    const authorName = author.login
    const authorAvatar = author.avatarUrl
    const tags: string[] = labels.nodes.map((tag: {name: string}) => tag.name)
    const post = {
      id,
      url,
      discussionUrl,
      title,
      html,
      bodyText,
      tags,
      createdAt,
      lastEdited,
      author: {url: authorUrl, name: authorName, avatar: authorAvatar},
    }
    return post
  })
  return posts
}

export async function getBlogDetail(blogId: number): Promise<BlogDetail> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: fetchHeaders,
    body: JSON.stringify({query: discussionDetailGql(blogId)}),
  })
  let res = await response.json()
  let discussion = res.data.repository.discussion
  const {
    author: {url: authorUrl, login: authorName, avatarUrl: authorAvatar},
    createdAt,
    title: title,
    bodyHTML: html,
  } = discussion
  const detail = {
    author: {url: authorUrl, name: authorName, avatar: authorAvatar},
    createdAt,
    title,
    bodyHTML: html,
  }
  return detail
}
