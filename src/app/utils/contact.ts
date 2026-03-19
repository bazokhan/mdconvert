export const ADMIN_EMAIL = 'admin@trugraph.io';
export const SITE_DOMAIN = 'md2docx.trugraph.io';

export const createMailtoLink = (type: 'bug' | 'feature') => {
  const subject = type === 'bug' 
    ? 'Bug Report - md2docx'
    : 'Feature Request - md2docx';
  
  return `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}`;
}; 