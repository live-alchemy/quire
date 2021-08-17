import React, { FunctionComponent } from "react";
import { Link } from "gatsby"
import { SongNode } from "../types";

export const Song: FunctionComponent<{ song: SongNode }> = ({ song }) => {
  return (
    <li className="list-none" key={song.fields.slug}>
      <article
        className="py-2"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2 className="text-xl font-bold underline">
            <Link to={song.fields.slug} itemProp="url">
              <span itemProp="headline">{song.frontmatter.title}</span>
            </Link>
          </h2>
        </header>
      </article>
    </li>
  );
};
