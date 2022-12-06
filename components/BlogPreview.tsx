import {BlogPost} from '../types/blog'
import BlogHeader from './BlogHeader'

const BlogPreview = (props: BlogPost) => {
  const {bodyText, title, createdAt, tags, author} = props
  const previewText: string = bodyText.substring(0, 150) + '...'
  return (
    <section>
      <BlogHeader createdAt={createdAt} author={author} />
      <h2 className="font-bold"> {title} </h2>
      <p className="mt-2"> {previewText} </p>
      <div className="flex gap-3">
        {tags.map((tag, idx) => (
          <p
            className="label transition-all duration-300 text-white font-light px-3 bg-sky-600"
            key={idx}
          >
            {tag}
          </p>
        ))}
      </div>
    </section>
  )
}

export default BlogPreview
