import { getAllSlugs, getPostData } from "@/lib/posts"
import styles from '../../styles/Blog.module.css'
// import Image from '../../components/image/Image'
import Link from 'next/link';
import { Image, StructuredText } from 'react-datocms';
import { request } from "@/lib/datocms";


export default function BlogPost(props) {

    const { postData } = props;
    return (
        <div className={styles.main}>
            <div style={{ maxWidth: '600px', marginTop: '20px' }}>
                <Image data={postData.coverImage.responsiveImage} />
                <h1>{postData.title}</h1>
                <p>
                    {postData.author.name} / {postData.publishDate}
                </p>
                <StructuredText data={postData.content}
                    renderBlock={({ record }) => {
                        switch (record.__typename) {
                          case "ImageRecord":
                            return <Image data={record.image.responsiveImage}/>
                          default:
                            return null;
                        }
                      }}
                />
                <p>🔙 {" "}
                    <Link legacyBehavior href="/">
                        <a style={{ textDecoration: 'none', color: 'inherit' }}>Back to Home</a>
                    </Link>
                </p>
            </div>
        </div>
    )
}

const PATH_QUERY = `
query MyQuery {
    allArticles {
      slug
    }
  }
`;

export async function getStaticPaths() {
    const slugQuery = await request({
        query: PATH_QUERY,
    });

    let paths = [];
    slugQuery.allArticles.map(p => paths.push(`/blog/${p.slug}`))
    return {
        paths,
        fallback: false,
    }
}
const POST_QUERY = `
query MyQuery($slug: String) {
    article(filter: {slug: {eq: $slug}}) {
      author {
        name
      }
      content {
        value
        blocks {
          __typename
          ... on ImageRecord {
            id
            image {
              responsiveImage {
                alt
                aspectRatio
                base64
                bgColor
                height
                sizes
                src
                srcSet
                title
                webpSrcSet
                width
              }
            }
          }
        }
      }
      coverImage {
        responsiveImage {
          alt
          aspectRatio
          base64
          bgColor
          height
          sizes
          src
          srcSet
          title
          webpSrcSet
          width
        }
      }
      publishDate
      slug
      id
      title
    }
  }
`;

export async function getStaticProps({ params }) {

    const post = await request({
        query: POST_QUERY,
        variables : { slug: params.slug}
    })
    return {
        props: {
            postData: post.article,
        }
    }
}