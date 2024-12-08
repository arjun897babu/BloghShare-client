import { FC, MouseEvent, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { IResponse, SingleBlog } from "../utility/types"
import { serverInstance, endPoint } from "../service/api";
import { Action, ResponseStatus } from "../utility/enum";
import useErrorObject from "../custom hook/useErrorObject";
import { useUser } from "../custom hook/useUser";
import { ButtonLoader } from "./ButtonLoader";

export type IBlogCardListpProps = {
    blogData: SingleBlog;
    deleteCB: (blogId: string) => void
}

const BlogCard: FC<IBlogCardListpProps> = ({ blogData, deleteCB }) => {
    const { showToast } = useUser()
    const [isHome, setIsHome] = useState(true);
    const location = useLocation()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const handleApiError = useErrorObject()
    useEffect(() => {
        if (location.pathname === '/') {
            setIsHome(true)
        } else {
            setIsHome(false)
        }
    }, [location.pathname])

    function editBlog() {
        navigate('/write', { state: { blogData: blogData } })
    }

    async function deleteBlog() {
        setLoading(true)
        try {
            const imageId = blogData.file && 'publicId' in blogData.file ? blogData.file.publicId : undefined

            const response = (await serverInstance.delete<IResponse>(endPoint.editBlog(blogData.uId), { params: imageId })).data
            if (response.status === ResponseStatus.SUCCESS) {
                showToast(ResponseStatus.SUCCESS, response.message)
                deleteCB(blogData.uId)
            }

        } catch (error) {
            handleApiError(error)
        } finally {
            setLoading(false)
        }
    }

    function onAction(e: MouseEvent<HTMLButtonElement>, action: Action) {
        e.preventDefault()
        if (action === Action.Edit) {
            editBlog()
        } else {
            deleteBlog()
        }
    }

    if (!blogData || blogData.file instanceof File) return

    return (

        <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
                <img
                    src={blogData.file?.url}
                    alt={blogData.file?.publicId}
                />
            </figure>
            <div className="card-body bg-white ">
                {/* title */}
                <h2 className="card-title capitalize font-bold">{blogData.title}</h2>
                {/* context with text ellipse */}
                <p className="truncate  text-sm font-light leading-4">{blogData.content}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-neutral">
                        <Link to={`/blog/${blogData.uId}`}>Read Now ...</Link>
                    </button>
                </div>
            </div>
            {!isHome &&

                <div className={`absolute right-2 top-2 `}>
                    {
                        loading ?
                            <ButtonLoader btnSize="wide" loader="spinner" />
                            :
                            <>
                                <button onClick={(e) => onAction(e, Action.DELETE)} className="delete opacity-25 hover:opacity-100 transition-opacity ease-in-out">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 30 30">
                                        <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                                    </svg>
                                </button>
                                <button onClick={(e) => onAction(e, Action.Edit)} className="edit  opacity-25 hover:opacity-100 transition-opacity ease-in-out ">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0,0,300,150"
                                        style={{ fill: '#1A1A1A' }}>
                                        <g fill="#1a1a1a" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ 'mixBlendMode': "normal" }}><g transform="scale(3.55556,3.55556)"><path d="M38.406,22.234l11.36,11.36l-20.982,20.982l-12.876,4.307c-1.725,0.577 -3.367,-1.065 -2.791,-2.79l4.307,-12.876zM41.234,19.406l5.234,-5.234c1.562,-1.562 4.095,-1.562 5.657,0l5.703,5.703c1.562,1.562 1.562,4.095 0,5.657l-5.234,5.234z"></path></g></g>
                                    </svg>
                                </button>
                            </>
                    }
                </div >

            }
        </div >

    )
}

export default BlogCard 