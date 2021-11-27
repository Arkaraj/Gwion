import axios from "axios";
import cheerio from "cheerio";

export async function getHTML(url) {
  const { data } = await axios.get(url);
  return data;
}

export async function getGithubFollowers(html) {
  const $ = cheerio.load(html);
  const span = $(".color-fg-default").html();
  console.log(span);
  return 9;
}
export async function getLinkedinFollowers(html) {
  const $ = cheerio.load(html);
  const span = $('[data-nav="followers"] .ProfileNav-value');
  // return span.data("count");
  return 10;
}
export async function getTwitterFollowers(html) {
  const $ = cheerio.load(html);
  const span = $('[data-nav="followers"] .ProfileNav-value');
  return span.data("count");
}

export const getInstagramFollowers = async (html) => {
  const $ = cheerio.load(html);
  const dataInString = $('script[type="application/ld+json"]').html();
  const pageObject = JSON.parse(dataInString);
  return parseInt(
    pageObject.mainEntityofPage.interactionStatistic.userInteractionCount
  );
};

export const getInstagramCount = async () => {
  const html = await getHTML("https://www.instagram.com/arkaraj_ghosh/");
  const instagramCount = await getInstagramFollowers(html);
  return instagramCount;
};
export const getTwitterCount = async () => {
  const html = await getHTML("https://twitter.com/arkaraj3");
  const twitterCount = await getTwitterFollowers(html);
  return twitterCount;
};
export const getGithubCount = async () => {
  const html = await getHTML("https://github.com/Arkaraj");
  const githubCount = await getGithubFollowers(html);
  return githubCount;
};
export async function getLinkedInCount() {
  const html = await getHTML(
    "https://www.linkedin.com/in/arkaraj-ghosh-1957881b1/"
  );
  const linkedinCount = await getLinkedinFollowers(html);
  return linkedinCount;
}
