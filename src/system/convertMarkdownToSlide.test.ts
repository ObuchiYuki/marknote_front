import { promises as fs } from "fs";

import { convertMarkdownToSlide } from "./convertMarkdownToSlide";

describe("convertMarkdownToSlide", () => {
  it("converts markdown to slide", () => {
    const markdown = `
# Slide Title

\`\`\`js
const a = "Hello World"

function sayHello() {
  console.log(a)
}
\`\`\`

1. Yuki
2. Tomoko
3. Kenichi

`;
    const { html, css } = convertMarkdownToSlide(markdown);
    // 4. Use output in your HTML
    const htmlFile = `
    <!DOCTYPE html>
    <html><body>
      <style>${css}</style>
      ${html}
    </body></html>
    `
    fs.writeFile("output.html", htmlFile);
  });
});