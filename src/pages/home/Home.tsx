import blogImg from "/blog.svg";
import { useEffect } from "react";
import { Button, Image } from "antd";
import { useSelector } from "react-redux";
import HomeStyles from "./Home.module.scss";
import { useAppDispatch } from "../../store/store";
import { blogs } from "../../store/selectors/blogs";
import { getToken } from "../../utils/helpers/getToken";
import { fetchBlogData } from "../../store/reducers/blogs/blogsSlice";
import { FILTER_LIST } from "../../utils/constants/filter-list/filterList";



export default function Home() {
    const dispatch = useAppDispatch();
    const blogsData = useSelector(blogs);


    useEffect(() => {
        const fetchBlogs = async () => {
            const token = await getToken();
            dispatch(fetchBlogData(token))
        }
        fetchBlogs();
    }, [])

    // console.log('Home:', blogsData);
    return (
        <section className={HomeStyles.home_section}>
            <div className={HomeStyles.home_section_top}>
                <h1>ბლოგი</h1>
                <Image
                    className={HomeStyles.home_section_top_image}
                    src={blogImg}
                    alt="blog-img"
                    preview={false}
                    draggable={false}
                />
            </div>

            <div className={HomeStyles.home_section_filterList}>
                <ul>
                    {FILTER_LIST.map(({ title, color, bgColor }, index) => (
                        <li key={index}>
                            <Button
                                size="middle"
                                shape="round"
                                type="primary"
                                htmlType="button"
                                style={{ background: bgColor, color: color }}
                            >
                                {title}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                {blogsData.map((item: any) => (
                    <div>{item.title}</div>
                ))}
            </div>
        </section>
    )
}
