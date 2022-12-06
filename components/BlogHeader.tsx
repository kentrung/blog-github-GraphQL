/* eslint-disable @next/next/no-img-element */
interface IProps {
  createdAt: string
  author: {
    name: string
    avatar: string
    url: string
  }
}

const BlogHeader = ({createdAt, author}: IProps) => {
  const createdDate: Date = new Date(createdAt)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }
  return (
    <div className="flex">
      <img
        className="rounded-[50%] max-w-[50px] max-h-[50px] mb-4 mr-4"
        src={author.avatar}
        alt={author.name}
      />
      <div className="flex flex-col">
        <p className="font-semibold text-[1rem]">{author.name}</p>
        <ul className="flex flex-wrap">
          <li className="list-none font-normal text-[0.85rem] md:mr-4 sm:mr-0">
            {author.url}
          </li>
          <li className="list-none font-normal text-[0.85rem]">
            {createdDate.toLocaleDateString('en-US', options)}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BlogHeader
