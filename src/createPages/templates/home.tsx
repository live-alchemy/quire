import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";
import { Song } from "../../components/Song";
import { Layout } from "../../components/layout";
import { SongNode } from "../../types";
import { SEO } from "../../components/seo";

export const pageQuery = graphql`
  {
    songs: allMarkdownRemark(
      limit: 20
      filter: { frontmatter: { template: { eq: "song" } } }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

interface QueryData {
  songs: {
    edges: { node: SongNode }[];
  };
}

interface Home {
  data: QueryData;
}

const Home: FunctionComponent<Home> = ({ data }) => {

  const songData: SongNode[] = data.songs.edges.map(s => s.node);
  return (
    <>
      <SEO title="Home" image="/logo.png"/>
      <Layout>
        {songData.map((s: SongNode, i: number) => <Song song={s} key={i} />)}
      </Layout>
    </>
  );
};

export default Home;
