import { useState } from "react";
//import { stylesheet, css } from "astroturf";
import Link from "next/link";

import Meta from "@components/Meta";
import getPostList from "@utils/blog/getPostList";
import filterUnique from "@utils/filter.unique";

function handleSearch(postList, searchQuery) {
  if (searchQuery === "") return postList;
  const sanitizedQuery = searchQuery.toLowerCase().replace(/[^a-z0-9 ]/g, "");
  if (sanitizedQuery === "") return postList;
  return postList.filter(({ title }) =>
    title.toLowerCase().includes(sanitizedQuery)
  );
}

export default function BlogIndex({ postList, tagList }) {
  const [search, setSearch] = useState("");
  const filteredList = handleSearch(postList, search);
  return (
    <>
      <Meta
        title={"Blog"}
        description={"Mitsunee's Blog"}
        // TODO: BlogIndex meta image
        route={"blog"}
      />
      <main>
        <h1>POSTS</h1>
        <input
          type="text"
          value={search}
          placeholder={"Search"}
          onChange={e => setSearch(e.target.value)}
        />
        {filteredList.length > 0 ? (
          <ul>
            {filteredList.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}/`}>
                  <a title={post.slug}>{post.title}</a>
                </Link>
                <ul>
                  {JSON.parse(post.tags).map(tag => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Posts found for query {`"${search}"`}</p>
        )}
        <h2>Known Tags</h2>
        <p>{tagList.join(", ")}</p>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const postList = await getPostList();

  // TODO: sort posts by date

  const tagList = postList
    .reduce((list, post) => list.concat(JSON.parse(post.tags)), [])
    .filter(filterUnique)
    .sort(); // sort alphabetically
  return { props: { postList, tagList } };
}