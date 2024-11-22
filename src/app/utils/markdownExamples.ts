interface MarkdownExample {
  title: string;
  description: string;
  markdown: string;
}

export const markdownExamples: MarkdownExample[] = [
  {
    title: "Headings",
    description: "Different levels of headings",
    markdown: `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`,
  },
  {
    title: "Text Formatting",
    description: "Bold, italic, strikethrough, and more",
    markdown: `**Bold text** using double asterisks
*Italic text* using single asterisks
***Bold and italic*** using triple asterisks
~~Strikethrough~~ using double tildes
\`Inline code\` using backticks
> Blockquote using greater than symbol

Horizontal rule below:
---`,
  },
  {
    title: "Lists",
    description: "Ordered and unordered lists",
    markdown: `Unordered list using hyphens:
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

Ordered list using numbers:
1. First item
2. Second item
   1. Nested item
   2. Another nested item
3. Third item

Task list:
- [x] Completed task
- [ ] Incomplete task`,
  },
  {
    title: "Tables",
    description: "Tables with alignment",
    markdown: `| Left-aligned | Center-aligned | Right-aligned |
|:------------|:--------------:|-------------:|
| Left        | Center         | Right        |
| aligned     | aligned        | aligned      |
| text        | text           | text         |

Simple table:
| Product | Price | Quantity |
|---------|-------|----------|
| Apple   | $1    | 5        |
| Orange  | $0.8  | 3        |
| Banana  | $0.5  | 6        |`,
  },
  {
    title: "Links and Images",
    description: "Different ways to add links and images",
    markdown: `[Link with title](https://www.example.com "Website title")
[Simple link](https://www.example.com)
<https://www.example.com> - Automatic link

![Image alt text](https://picsum.photos/200/100 "Image title")
[![Clickable image](https://picsum.photos/200/100)](https://www.example.com)`,
  },
  {
    title: "Code Blocks",
    description: "Code blocks with syntax highlighting",
    markdown: `\`\`\`javascript
// JavaScript code block
function greeting(name) {
  return \`Hello, \${name}!\`;
}

const result = greeting('World');
console.log(result);
\`\`\`

\`\`\`python
# Python code block
def greeting(name):
    return f"Hello, {name}!"

result = greeting("World")
print(result)
\`\`\``,
  },
  {
    title: "Advanced Formatting",
    description: "Subscript, superscript, and more",
    markdown: `H~2~O - Subscript
X^2^ - Superscript

==Highlighted text==

Definition list:
Term 1
: Definition 1

Term 2
: Definition 2

Footnote reference[^1]
[^1]: This is the footnote content.

Abbreviation:
*[HTML]: Hyper Text Markup Language
The HTML specification is maintained by W3C.`,
  },
  {
    title: "Complete Example",
    description: "A complete document with multiple elements",
    markdown: `# Document Title

## Introduction
This is a paragraph with **bold** and *italic* text. You can also combine ***bold and italic*** formatting.

### Lists Section
Here's an ordered list:
1. First item
2. Second item with \`inline code\`
3. Third item

And an unordered list:
- Main point
  - Sub-point
  - Another sub-point
- Another point

### Table Section
| Feature | Description | Status |
|---------|-------------|--------|
| Tables  | Format data | ✅     |
| Lists   | Organize content | ✅ |
| Links   | [External links](https://example.com) | ✅ |

### Code Section
\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

> Important quote or note goes here
> Multiple lines are supported

---

## Conclusion
This is the end of the document.`,
  },
];
