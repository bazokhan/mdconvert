export const ADMIN_EMAIL = 'admin@trugraph.io';
export const SITE_DOMAIN = 'md2docx.trugraph.io';

export const createMailtoLink = (type: 'bug' | 'feature') => {
  const subject = type === 'bug' 
    ? 'Bug Report - MD to DOCX Converter'
    : 'Feature Request - MD to DOCX Converter';
  
  return `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}`;
}; 