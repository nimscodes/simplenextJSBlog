import Head from 'next/head'
// import Image from 'next/image'
import styles from '@/styles/Home.module.css';
import { chickenSoupCover, meatballsCover, tunaSaladCover } from '@/public';
import Image from '../components/image/Image';
import { getAllPost } from '@/lib/posts';
import Link from 'next/link';


export default function Home() {

  const posts = getAllPost();
  return (
    <div className={styles.main}>
      <Head>
        <title>Simple Blog</title>
      </Head>
      <div>
        <h1>Simple Blog Website</h1>
      </div>
      <div>
        {
          posts.map((post) => {
            return <BlogPostPreview key={post.id} data={post} />
          })
        }
      </div>
    </div>
  )
}


const BlogPostPreview = (props) => {
  const { data } = props;
  return (
    <div style={{ maxWidth: '400px', marginBottom: '50px' }}>
      <Image src={data.coverImage} layout='fill' />
      <h2>
        <Link legacyBehavior href={`/blog/${data.slug}`} >
          <a style={{ textDecoration: 'none', color:'inherit' }}>{data.title}</a>
        </Link>
      </h2>
      <div>{data.publishDate}</div>
      <p>
        {data.excerpt}
      </p>
      <div style={{ fontWeight: 'bold' }}>{data.author}</div>
    </div>
  )
}

