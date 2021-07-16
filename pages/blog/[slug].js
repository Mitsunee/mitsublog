import getPostList from "@utils/blog/getPostList";
import getPost from "@utils/blog/getPost";
import parsePost from "@utils/blog/parsePost";
import buildPostData from "@utils/blog/buildPostData";

import Meta from "@components/Meta";
import MainContent from "@components/MainContent";
import PostDate from "@components/blog/PostDate";

export default function BlogPost({ data, content }) {
  // TODO: styling for header section for blog posts (title, date)
  // TODO: styling for footer section for blog posts (tags, permalink)
  // TODO: handle optional image and youtube video

  return (
    <>
      <Meta
        title={data.title}
        description={data.description}
        image={data.image}
        route={`blog/${data.slug}`}
      />
      <main>
        <MainContent>
          <h1>{data.title}</h1>
          <PostDate date={data.date} hasTime={data.hasTime} />
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <h3>Tags (temp)</h3>
          <p>{JSON.parse(data.tags).join(", ")}</p>
          <p>
            <a href={`/blog/${data.slug}/`}>Permalink</a>
          </p>
        </MainContent>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const postList = await getPostList();
  const paths = postList.map(({ slug }) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const postRaw = await getPost(slug);
  const { data: rawData, content } = await parsePost(postRaw);
  const data = buildPostData(rawData, `${slug}.md`);
  return { props: { data, content } };
}
