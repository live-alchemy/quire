import { CreatePagesArgs } from "gatsby";
import * as path from "path";

interface PostQuery {
  allMarkdownRemark: {
    edges: {
      node: {
        id: string;
        frontmatter: {
          template: string;
        };
        fields: {
          slug: string;
        };
      };
    }[];
  };
}

const POST_PER_PAGE = 10;

export const createPages = async ({
  actions,
  graphql,
}: CreatePagesArgs): Promise<void> => {
  const { createPage } = actions;
  const result = await graphql<PostQuery>(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              template
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    console.error(result.errors);
    throw new Error("Unexpected error from graphql query during create pages");
  }

  createPage({
    path: "/",
    component: path.resolve(`src/createPages/templates/home.tsx`),
    context: {},
  });

  const posts = result.data?.allMarkdownRemark.edges;

  if (!posts) throw new Error("No blog posts found");

  posts.forEach((edge) => {
    const {
      id,
    } = edge.node;
    createPage({
      path: edge.node.fields.slug,
      component: path.resolve(
        `src/createPages/templates/${edge.node.frontmatter.template}.tsx`
      ),
      context: {
        id,
      },
    });
  });

  // Create Blog List Pages
  const numPages = Math.ceil(posts.length / POST_PER_PAGE);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: `/page/${i + 1}`,
      component: path.resolve(`src/createPages/templates/blog-list.tsx`),
      context: {
        limit: POST_PER_PAGE,
        skip: i * POST_PER_PAGE,
        numPages,
        currentPage: i + 1,
        hasNext: i + 1 < numPages,
      },
    });
  });
};
