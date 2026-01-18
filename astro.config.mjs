import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from '@shikijs/transformers'
import mdx from "@astrojs/mdx";
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      transformers: [
        transformerMetaHighlight(),
        transformerNotationDiff(),
        {
          name: 'transformer-add-line-class',
          preprocess(code) {
            return code.replace(/\n$/, '');
          },
          code(node) {
            if (node.tagName === 'pre') {
              const codeEl = node.children.find(c => c.type === 'element' && c.tagName === 'code');
              if (codeEl && codeEl.hasOwnProperty('children')) {
                codeEl.children = codeEl.children.filter(c => c.type !== 'text' || !/^\s*$/.test(c.value));
                const children = codeEl.children;
                if (!children) return;
                children.forEach(lineNode => {
                  if (lineNode.type === 'element') {
                    const classes = new Set(lineNode.properties.class || []);
                    classes.add('line');
                    lineNode.properties.class = Array.from(classes);
                  }
                })
              }
            }
          }
        }
      ],
    },
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 5173,
  },
  integrations: [mdx()],
});
