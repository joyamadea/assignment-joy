import NewsData from '../../public/assets/data.json';
import { sanitize } from "isomorphic-dompurify";

const Comment = ({ comment }) => {
    const sanitized = (html) => {
        return sanitize(html, { USE_PROFILES: { html: true } });
    }

    return (
        <div className='pl-3.5 my-2 max-w-full '>
            <div className='p-2 bg-blue-50'>
                <div className='font-semibold'>{comment.author}</div>
                <div dangerouslySetInnerHTML={{ __html: sanitized(comment.text)}} className='break-words'/>
            </div>
            {comment?.children?.map((cmnt) => {
                return <Comment key={cmnt.id} comment={cmnt}/>
            })}
        </div>
    )
}

export default function Soal3() {
    return(
        <div className="container mx-auto p-20">
            <a
                href="/"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
                rel="noopener noreferrer"
                >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                    <span className="inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
                        &lt;-
                    </span>
                    Back
                </h2>
            </a>
            
            <div className='text-2xl font-bold'>{NewsData.title}</div>
            <div className='font-semibold'>Author: {NewsData.author}</div>

            <div className='mt-4 text-lg font-bold'>Comments</div>
            <div className="mb-3 w-full max-w-full">
                {NewsData.children?.length > 0 ?
                NewsData?.children?.map((data) =>
                    <Comment key={data.id} comment={data} />
                ) : 'No comments available'}
            </div>
        </div>
    )
}

