type TemplateKey = "blog-post";

export interface Tag {
  label: string;
  href: string;
}

export interface SongFields {
  slug: string;
}

export interface SongFrontMatter {
  title: string;
  order?: number;
  excerpt: string;
}

export interface SongNode {
  id: string;
  fields: SongFields;
  frontmatter: SongFrontMatter;
}

export interface BlogPost {
  template: TemplateKey;
  publishedDate: Date;
  featured: boolean;
  title: string;
  description: string;
  img: string;
  imgAlt?: string;
  slug: string;
  tags: string[];
  content: JSX.Element;
}
