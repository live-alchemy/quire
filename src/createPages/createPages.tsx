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

  const songs = result.data?.allMarkdownRemark.edges;

  if (!songs) throw new Error("No songs found");

  songs.forEach((edge) => {
    console.dir(edge)
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
};
