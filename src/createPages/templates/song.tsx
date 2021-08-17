import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";
import { SEO } from "../../components/seo";
import { Layout } from "../../components/layout";

interface FileData {
  absolutePath: string;
  relativePath: string;
  extension: string;
}

interface QueryData {
  markdownRemark: {
    html: string;
    frontmatter: {
      title: string;
      details: string;
      score: FileData;
      finch: FileData;
      heron: FileData;
      raven: FileData;
    };
  };
}

export const pageQuery = graphql`
  query SongBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        score {
          absolutePath
          relativePath
          extension
        }
        details
        finch {
          absolutePath
          relativePath
          extension
        }
        heron {
          absolutePath
          relativePath
          extension
        }
        raven {
          absolutePath
          relativePath
          extension
        }
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
      <SEO title={`Quire song: ${title}`} image="/logo.png"/>
      <Layout>
        <div className="flex flex-col space-y-2">
          <h2 className="text-xl font-bold my-2">{title}</h2>

          <section>
            <p>
              <em>
                {details}
              </em>
            </p>
          </section>

          <section>
            <h4 className="text-lg font-bold my-2">Lyrics</h4>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </section>

          <h4 className="text-lg font-bold">Score</h4>

          <section className="flex space-x-2">
            <a className="text-blue-500 underline" href={`/${score.relativePath}`} download>Download the Score</a>
            <span>|</span>
            <a className="text-blue-500 underline" href={`/${score.relativePath}`} target="_blank">Open score in new tab</a>
          </section>

          <h4 className="text-lg font-bold pt-2">Audio</h4>

          <section className="pb-2">
            <h4 className="my-1 font-bold">
              Finch
              <a href={`/${finch.relativePath}`} download className="text-sm ml-1">⬇️</a>
            </h4>
            <audio controls src={`/${finch.relativePath}`} />
          </section>

          <section className="py-2">
            <h4 className="my-1 font-bold">
              Heron
              <a href={`/${heron.relativePath}`} download className="text-sm ml-1">⬇️</a>
            </h4>
            <audio controls src={`/${heron.relativePath}`} />
          </section>

          <section className="py-2">
            <h4 className="my-1 font-bold">
              Raven
              <a href={`/${raven.relativePath}`} download className="text-sm ml-1">⬇️</a>
            </h4>
            <audio controls src={`/${raven.relativePath}`} />
          </section>

        </div>
      </Layout>
    </>
  );
};

export default Page;
