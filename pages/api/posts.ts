import type { NextApiRequest, NextApiResponse } from "next";
import { clamp } from "@foxkit/util/clamp";
import staticData from "../../posts.json";

type Post = PostMeta & { tags?: string[] };
type ApiResponse = { posts: Post[]; tags: TagMap; page: number; pages: number };
interface ReqBody {
  ps?: number;
  page?: number;
  tag?: string;
}

const staticPosts: Post[] = staticData.posts;
const staticTags: TagMap = staticData.tags;

// TODO: Sorting? (default: date descending)
// TODO: text search?

export default function GetPostList(req: NextApiRequest, res: NextApiResponse) {
  const body: ReqBody = req.body;
  const pageSize: number = clamp({ min: 3, value: body.ps || 10, max: 50 });
  const page: number = clamp({ min: 1, value: body.page || 1 });
  const responseBody: ApiResponse = { posts: [], tags: {}, page, pages: 0 };

  // Tags
  const includedTags = new Set<string>();
  const searchedTags: string[] = body.tag ? body.tag.split(",") : [];

  // Filter list
  const results = new Array<Post>();
  for (let i = 0; i < staticPosts.length; i++) {
    const post = staticPosts[i];

    // filter by searched tag
    if (
      searchedTags.length &&
      !searchedTags.every(tag => post.tags?.includes(tag))
    ) {
      continue;
    }

    // include tags in response
    for (const tag of post.tags) {
      if (includedTags.has(tag)) continue;
      includedTags.add(tag);
      responseBody.tags[tag] = staticTags[tag];
    }

    // add to list
    results.push(post);
  }

  // add slice and page count to response
  responseBody.posts = results.slice((page - 1) * pageSize, page * pageSize);
  responseBody.pages = clamp({
    min: 1,
    value: Math.ceil(results.length / pageSize)
  });

  // send response
  res.status(200).json(responseBody);
}
