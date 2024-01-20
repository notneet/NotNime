export const API_DOMAIN: string = process.env.NEXT_PUBLIC_API_DOMAIN || "";
export const BASEURL_ASSET: string =
  process.env.NEXT_PUBLIC_BASEURL_ASSET || "";

const env = {
  API_DOMAIN,
  BASEURL_ASSET,
};

export default env;
