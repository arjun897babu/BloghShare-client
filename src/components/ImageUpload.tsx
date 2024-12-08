import React, { MouseEvent, useEffect, useRef, useState } from "react";
type ImageUploadProps = {
    changeImage: (file: File) => void;
    url?: string
}
const ImageUpload: React.FC<ImageUploadProps> = ({ changeImage, url }) => {

    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [preview, setPreview] = useState(false);
    const uploadRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return
        const imageUrl = URL.createObjectURL(file)
        setImageSrc(imageUrl)
        changeImage(file)
    };

    useEffect(() => {

        if (url) {
            setImageSrc(url)
            setPreview(true)
        }

        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc)
                setImageSrc(null);
                setPreview(false)
            }
        }
    }, [url])


    const handleParentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest('input[type="file"]')) return;
        e.preventDefault()
        e.stopPropagation()
        if (uploadRef.current) {
            console.log("Opening file dialog");
            uploadRef.current.click();
        }
    }

    function removeImage(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setImageSrc(null);
        setPreview(false);
    }


    return (

        <div className="max-w-xs bg-base-200 rounded-lg shadow-md  relative  " >
            <div className="px-4 py-4" onClick={handleParentClick}>
                <div
                    id="image-preview"

                    className={`max-w-xs p-4 mb-4 bg-gray-100 border-dashed border-2 border-emerald-300 rounded-lg items-center mx-auto text-center cursor-pointer ${imageSrc ? "" : "flex items-center justify-center"
                        }`}
                >
                    <input
                        id="uploadInput"
                        type="file"
                        ref={uploadRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {
                        !imageSrc ? (
                            <label htmlFor="uploadInput" className="cursor-pointer capitalize">
                                <div className="flex justify-center">
                                    <img className="object-cover w-8 h-8 " src="https://img.icons8.com/wired/64/1A1A1A/upload--v1.png" alt="upload--v1" />
                                </div>
                                <p className="font-normal text-xs leading-3 text-gray-400 md:px-6">
                                    <span>choose photo</span><br />
                                    size should be less than <b className="text-gray-600">2mb</b>
                                </p>
                            </label>
                        ) : (
                            <div className="h-60 w-48 sm:h-32 sm:w-64  ">
                                <img
                                    src={imageSrc}
                                    alt={`image preview`}
                                    className="w-full h-full object-scale-down"
                                />
                            </div>
                        )}
                </div>
                <div className="flex items-center justify-center ">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        className="w-full z-20 transition-colors ease-in btn-sm focus:outline-none text-white  font-medium btn bg-emerald-500 hover:bg-emerald-600"
                    >
                        <span className="text-center ml-2">Upload</span>
                    </button>
                </div>
            </div>
            {preview && <button
                className="absolute rounded-full bg-white top-2 right-2 glass  z-50 "
                onClick={removeImage}
            >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 30 30">
                    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                </svg>
            </button>}
        </div>
    );
};

export default ImageUpload;