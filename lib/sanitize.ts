import sanitizeHtml from 'sanitize-html';

const defaultOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'strong', 'em', 'u', 'strike',
    'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
    'a', 'img',
  ],
  allowedAttributes: {
    'a': ['href', 'target', 'rel'],
    'img': ['src', 'alt', 'width', 'height'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesByTag: {
    img: ['http', 'https', 'data'],
  },
};

export function sanitizeContent(content: string): string {
  return sanitizeHtml(content, defaultOptions);
}