export const ADMIN_EMAIL = 'admin@trugraph.io';
export const SITE_DOMAIN = 'markdown.trugraph.io';
export const BRAND_NAME = 'Markdown Converter';
export const TRUGRAPH_URL = 'https://trugraph.io';

export const createMailtoLink = (type: 'bug' | 'feature') => {
  const subject = type === 'bug'
    ? 'Bug Report - Markdown Converter'
    : 'Feature Request - Markdown Converter';

  return `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}`;
};