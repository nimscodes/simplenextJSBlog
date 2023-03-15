import { getAllSlugs, getPostData } from "@/lib/posts"
import styles from '../../styles/Blog.module.css'
import Image from '../../components/image/Image'
import Link from 'next/link'


export default function BlogPost(props){

    const { postData } = props; 
    return (
        <div className={styles.main}>
            <div style={{maxWidth: '600px', marginTop: '20px'}}>
                <Image src={postData.coverImage} layout='fill'/>
                <h1>{postData.title}</h1>
                <div><span style={{fontWeight: 'bold'}}>{postData.author}</span> / {postData.publishDate}</div>
                <p>{postData.content}</p>
                <p>🔙 {" "}
                    <Link legacyBehavior  href="/">
                        <a style={{textDecoration: 'none', color:'inherit'}}>Back to Home</a>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export function getStaticPaths(){
    const paths = getAllSlugs();
    return {
        paths,
        fallback: false,
    }
}

export function getStaticProps({ params }){
    const postData = getPostData(params.slug)
    return {
        props:{
            postData,
        }
    }
}