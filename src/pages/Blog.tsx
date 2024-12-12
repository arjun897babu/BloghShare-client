import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { serverInstance } from "../service/api"
import { BlogResponse, SingleBlog } from "../utility/types"
import {  ResponseStatus } from "../constants/enum"
import { apiEndPoint } from "../constants/endpoints"
import useErrorObject from "../custom hook/useErrorObject"

const Blog = () => {
    const { blogId } = useParams()
    const handleApiError = useErrorObject()
    const [data, setData] = useState<SingleBlog | null>(null)
    const navigate = useNavigate()
    async function fetchSingleBlog() {
        if (!blogId) {
            return
        }
        try {
            const response = (await serverInstance.get<BlogResponse>(apiEndPoint.singleBlog(blogId))).data
            if (response.status === ResponseStatus.SUCCESS) {
                setData(response.data.blog)
            }
        } catch (error) {
            handleApiError(error)
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
                            <span className="capitalize font-bold text-lg bg-gradient-to-r from-gray-500 to-teal-700 bg-clip-text text-transparent ">
                                @ {data?.user?.name}
                            </span>
                            |
                            <span className="bg-gradient-to-r from-slate-400 to-gray-900 bg-clip-text text-transparent font-bold capitalize p-1">
                                published {new Date(data.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
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