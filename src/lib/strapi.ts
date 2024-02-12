import qs from "qs";

export enum Page {
  Article,
  Other,
}

export enum Resource {
  "Blog Post" = "Blog Post",
  "Report" = "Report",
  "Case Study" = "Case Study",
  "Press Release" = "Press Release",
  "Webinar" = "Webinar",
  "Infographic" = "Infographic",
  "News Article" = "News Article",
  "All" = "All",
}

interface Props {
  endpoint: string;
  query?: Record<any, any>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props) {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  let url = `${import.meta.env.STRAPI_URL}/api/${endpoint}`;

  if (query) {
    const queryString = qs.stringify(query, {
      encodeValuesOnly: true,
    });

    url = `${url}?${queryString}`;
  }

  const httpHeaders = {
    Authorization: `Bearer ${import.meta.env.STRAPI_API_KEY}`,
  };

  const headers = new Headers(httpHeaders);
  const res: Response = await fetch(url, { headers });
  let data = await res.json();
  if (!res.ok) {
    const { error } = data;

    console.error(`Strapi Request failed (${url})
Response: 
  Status: ${error.status}
  Name: ${error.name}
  Message: ${error.message}
  Details: ${JSON.stringify(error.details, null, 2)}`);
    throw new Error(error.message);
  }
  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }
  return data;
}

export async function getNavigation(navigationIdOrName: string | number) {
  let navigation = await fetchApi({
    endpoint: `navigation/render/${navigationIdOrName}`,
    query: { type: "TREE" },
  });

  return navigation;
}

export async function getPageBlocksByPageId(pageId: number, pageType: Page) {
  const endpoint = getEndpoint();
  const data = await fetchApi({
    endpoint,
    query: {
      populate: "deep",
    },

    wrappedByKey: "data",
  });

  return data.attributes?.blocks;

  function getEndpoint() {
    let endpoint;
    switch (pageType) {
      case Page.Other:
        endpoint = `pages/${pageId}`;
        break;
      default:
        endpoint = `articles/${pageId}`;
    }

    return endpoint;
  }
}

export async function getSocials() {
  const data = await fetchApi({ endpoint: "socials", wrappedByKey: "data" });

  return data;
}

export async function getGlobalSettings() {
  const data = await fetchApi({ endpoint: "global", wrappedByKey: "data" });
  return data;
}

export function getBaseUrl(path: string) {
  if (!path) return undefined;
  return import.meta.env.STRAPI_URL + path;
}

export async function getPageMetadataByPath(targetPath: any) {
  const allPagePaths = await getAllPagesMetadata();
  const foundPage = allPagePaths.find((page) => page.path === targetPath);
  return foundPage;
}

async function getAllPagesMetadata() {
  const getPages = fetchApi({
    endpoint: "pages",
    query: {
      fields: ["slug", "parentPath", "title", "description"],
    },
    wrappedByKey: "data",
  });

  const getAllPages = [getPages];

  const pageResults = await Promise.all(getAllPages);

  let [pages, articles] = pageResults;

  pages.forEach((page: { type: Page }) => (page.type = Page.Other));

  const allPages = [...pages];

  const paths = allPages.map((page) => {
    let parentPath =
      page.attributes.parentPath ??
      page.attributes?.resource?.data?.attributes?.parentPath;

    const fullPath = parentPath
      ? parentPath + "/" + page.attributes.slug
      : page.attributes.slug;

    return {
      id: page.id,
      path: fullPath,
      title: page.attributes.title,
      description: page.attributes.description,
      image: page.attributes.image,
      seo: page.attributes.seo,
      published: page.attributes.published || page.attributes.publishedAt,
      pageType: page.type,
      resourceType: page.attributes?.resource?.data?.attributes?.type,
    };
  });

  return paths;
}
