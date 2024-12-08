import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { endPoint, serverInstance } from "../../service/api"
import { BlogResponse, SingleBlog } from "../../utility/types"
import { ResponseStatus } from "../../utility/enum"

const Blog = () => {
    const { blogId } = useParams()
    const [loading, setLoading] = useState(false)
    console.log(loading);
    const [data, setData] = useState<SingleBlog | null>(null)
    const navigate = useNavigate()
    async function fetchSingleBlog() {
        setLoading(true)
        if (!blogId) {
            return
        }
        try {
            const response = (await serverInstance.get<BlogResponse>(endPoint.singleBlog(blogId))).data
            if (response.status === ResponseStatus.SUCCESS) {
                setData(response.data.blog)
                console.log(response.data.blog)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (blogId) {
            fetchSingleBlog()
        }
        else {
            navigate('/')
        }
    }, [blogId])

    if (!data) return null

    return (
        <>
            {data && <div className="p-10">
                <div className=" grid grid-cols-1 sm:grid-cols-2">
                    <div className="card-title font-extrabold mb-12 capitalize  tracking-wider text-3xl sm:text-4xl  lg:text-6xl">
                        {data?.title}
                    </div>
                    <div className="mb-8 sm:mb-0 " > 
                        <figure  >
                            <img
                                className="rounded "
                                src={data?.file && 'url' in data?.file ? data?.file.url : ''}
                                alt={data?.title + ' image'} />
                        </figure>
                    </div>
                </div>

                <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                        <div className="bottom-left flex gap-8 md:pt-8">
                            <span className="badge badge-accent capitalize">
                                {data?.user?.name}
                            </span>
                            <span className="badge badge-neutral">
                                {new Date(data.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </span>
                        </div>

                        <div className="md:pt-8 bottom-right">
                            <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">{data.content}</p>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Blog