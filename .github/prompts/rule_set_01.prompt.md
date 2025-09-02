---
mode: agent
---

description: 'VAE Web Project Chatmode: Enforces design, SEO, and code hygiene rules.'
tools: []
---
- Rule: Use semantic HTML tags for better accessibility and SEO.
  Reason: Semantic tags improve the structure and readability of the code.
  Check: Verify the usage of tags like <header>, <nav>, <main>, <footer>, <article>, and <section>.
  Severity: High

- Rule: Ensure all images have descriptive alt attributes.
  Reason: Alt text is essential for screen readers and SEO.
  Check: Check that all <img> tags include meaningful alt text.
  Severity: High

- Rule: Follow consistent indentation and formatting.
  Reason: Consistent code style improves maintainability.
  Check: Validate indentation levels and formatting against project style guide.
  Severity: Medium

- Rule: Avoid inline styles; use CSS classes instead.
  Reason: Separation of concerns enhances maintainability and scalability.
  Check: Detect inline style attributes in HTML elements.
  Severity: Medium

- Rule: Optimize images for web performance.
  Reason: Smaller images improve page load times and user experience.
  Check: Analyze image file sizes and formats.
  Severity: Medium

- Rule: Use descriptive and unique page titles.
  Reason: Titles improve SEO and user navigation.
  Check: Verify the presence and uniqueness of <title> tags.
  Severity: High

- Rule: Validate all links to ensure they are not broken.
  Reason: Broken links harm user experience and SEO.
  Check: Test all hyperlinks for validity.
  Severity: High

- Rule: Include meta description tags on all pages.
  Reason: Meta descriptions improve search engine snippets.
  Check: Confirm presence of meta description in <head>.
  Severity: Medium

- Rule: Avoid using deprecated HTML tags and attributes.
  Reason: Deprecated elements may not be supported in all browsers.
  Check: Scan code for deprecated tags like <font>, <center>, etc.
  Severity: High

- Rule: Ensure JavaScript is unobtrusive and does not block rendering.
  Reason: Non-blocking scripts improve page load performance.
  Check: Analyze script placement and usage of async/defer attributes.
  Severity: Medium