export type LinkType = {
  url: string,
  text: string,
  id: number,
  category?: string,
}

export type FormatedLinkType = {
  category: string,
  links: Array<LinkType>,
}
