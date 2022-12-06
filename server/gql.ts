const GITHUB_REPOSITORY_OWNER = process.env.GITHUB_REPOSITORY_OWNER
const GITHUB_REPOSITORY_NAME = process.env.GITHUB_REPOSITORY_NAME

// Get all posts
export function discussionGql(categoryId: string) {
  return `{
    repository(owner: "${GITHUB_REPOSITORY_OWNER}", name: "${GITHUB_REPOSITORY_NAME}") {
      discussions(first: 100, categoryId: "${categoryId}") {
        nodes {
          title
          url
          number
          bodyHTML
          bodyText
          createdAt
          lastEditedAt
          author {
            login
            url
            avatarUrl
          }
            labels(first: 100) {
            nodes {
              name
            }
          }
        }
      }
    }
  }`
}

// Get single post
export function discussionDetailGql(postId: number) {
  return `{
    repository(owner: "${GITHUB_REPOSITORY_OWNER}", name: "${GITHUB_REPOSITORY_NAME}") {
      discussion(number: ${postId}) {
        title
        bodyHTML
        createdAt
        author {
          login
          url
          avatarUrl
        }
      }
    }
  }`
}
