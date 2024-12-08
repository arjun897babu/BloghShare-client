import { useEffect, useState } from "react"
import useErrorObject from "../../../custom hook/useErrorObject"
import { useZodForm } from "../../../custom hook/UseZodForm"
import { BlogFormSchemaType, blogSchema } from "../../../utility/zodSchem"
import Input from "../../../components/Input"
import Label from "../../../components/Label"
import { BlogInitialState } from "./types"
import ImageUpload from "../../../components/ImageUpload"
import ErrorDiv from "../../../components/ErrorDiv"
import { serverInstance, endPoint } from "../../../service/api"
import { useLocation, useNavigate } from "react-router-dom"
import { Blog, IBlogCU } from "../../../utility/types"
import { ResponseStatus } from "../../../utility/enum"
import { ButtonLoader } from "../../../components/ButtonLoader"
import { useUser } from "../../../custom hook/useUser"

const BlogEditor = () => {
    const { showToast } = useUser()
    const location = useLocation();
    const navigate = useNavigate();
    const [blogData, setBlogData] = useState<Blog | null>(null)
    const { register, handleSubmit, setError, setValue, formState: { errors } } = useZodForm(blogSchema, BlogInitialState)

    function chaneImage(newFile: File) {
        setValue('file', newFile);
    }

    function changeErrorCB(key: string, message: string) {
        setError(key as keyof BlogFormSchemaType, { message })
    }

    const handleApiError = useErrorObject(changeErrorCB)

    const [loading, setLoading] = useState(false);

    async function onSubmit(data: BlogFormSchemaType) {
        setLoading(true)
        try {
            let response: IBlogCU;
            if (blogData) {
                const imageId = (blogData?.file && 'publicId' in blogData.file)
                    ? blogData.file.publicId
                    : undefined

                response = (await serverInstance.put<IBlogCU>(endPoint.editBlog(blogData.uId), data, { headers: { "Content-Type": 'multipart/form-data' }, params: { imageId } })).data
            } else {
                response = (await serverInstance.post<IBlogCU>(endPoint.write, data, { headers: { "Content-Type": 'multipart/form-data' } })).data
            }

            if (response.status === ResponseStatus.SUCCESS) {
                showToast(ResponseStatus.SUCCESS, response.message)
                navigate('/blogs')
            };

        } catch (error) {
            handleApiError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const blogData = location.state?.blogData as Blog ?? null
        if (blogData) {
            for (let key in blogData) {
                let val = blogData[key as keyof Blog]
                if (key in blogSchema.shape) {
                    setValue(key as keyof BlogFormSchemaType, val);
                }
                setBlogData(blogData);
            }

            return () => {
                if (blogData) {
                    setBlogData(null)
                    location.state.blodData = null
                }
            }
        }

    }, [location.state])

    return (
        <>
            <h1 className="text-2xl xs:text-5xl text-center font-extrabold capitalize pb-4 title mt-3">
                Share your thoughts
            </h1>
            <div className="flex w-full justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs sm:max-w-lg lg:max-w-2xl border p-2 rounded">
                    <div className="form-control relative mb-3">
                        <Label label="title" />
                        <Input text="title" {...register('title')} />
                        {errors && errors.title?.message && <ErrorDiv message={errors.title.message} />}
                    </div>
                    <div className="form-control relative mb-3 ">
                        <Label label="content" />
                        <textarea placeholder="write your story..." {...register('content')} className="textarea leading-tight  focus:outline-none font-blod bg-gray-50 border border-gray-200" name="content" id="content">
                        </textarea>
                        {errors && errors.content?.message && <ErrorDiv message={errors.content.message} />}
                    </div>
                    <div className="my-10 sm:my-8 form-control relative justify-center flex-row text-center">
                        <ImageUpload changeImage={chaneImage}
                            url={blogData?.file && 'url' in blogData.file ? blogData.file.url : undefined}
                        />
                        {errors && errors.file?.message && <ErrorDiv message={errors.file.message} />}
                    </div>
                    <div className="float-right">
                        <button className="btn  bg-emerald-500 text-white hover:bg-emerald-600 xs:btn-wide uppercase " type="submit">
                            {
                                loading ? <ButtonLoader btnSize="full" loader="progress" />
                                    : !blogData ? 'post' : 'update'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default BlogEditor