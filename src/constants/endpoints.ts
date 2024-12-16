export const { VITE_API_ROUTE, VITE_APP } = import.meta.env;

export const apiEndPoint = Object.freeze({
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
    refresh:"/auth/refresh",
    blogs: "/blogs",
    singleBlog: (blogId: string) => `/blogs/blog/${blogId}`,
    write: "/blogs/user/blog", //create specif to user
    getUserBlog: "/blogs/user/blog",
    editBlog: (blogId: string) => `/blogs/user/${blogId}`, //edit and delete a specif blog
});

export const blogSharePath = Object.freeze({
    login: '/login',
    signup: '/signup',
    blogEdior: '/write',
    blog: '/blog/:blogId',
    myBlogs: '/blogs'
})


