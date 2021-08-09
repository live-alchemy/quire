import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";
import { SEO } from "../../components/seo";

interface QueryData {
  markdownRemark: {
    html: string;
    frontmatter: {
      title: string;
      score: string;
      details: string;
      finch: string;
      heron: string;
      raven: string;
    };
  };
}

export const pageQuery = graphql`
  query SongBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
      }
    }
  }
`;

interface Page {
  data: QueryData;
}

export const Page: FunctionComponent<Page> = ({ data }) => {
  const {
    markdownRemark: {
      html,
      frontmatter: {
        title,
        score,
        details,
        finch,
        heron,
        raven,
      },
    },
  } = data;

  return (
    <>
      <SEO title={title} />
      <p>{title}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export default Page;
