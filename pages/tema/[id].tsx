import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { Box, Typography } from '@mui/material'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Box bgcolor='#2F2F2F' minHeight='100vh' color="white" px={{xs: 10, lg: 30, xl:50}} py={{xs: 5, lg: 6, xl:10}}>
        <article style={{backgroundColor: '#2F2F2F' }}>
          <Typography variant="h4" fontWeight='bold'>{postData.title}</Typography>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Box>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  console.log(paths)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  console.log(postData)
  return {
    props: {
      postData
    }
  }
}
