
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, '../pages/glossary');
const outputDir = path.join(__dirname, '../../glossary_data');
const outputFile = path.join(outputDir, 'glossary.json');

async function extractFrontmatter(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const match = content.match(/^---\n([\s\S]*?)\n---/);

    if (!match) return null;

    const frontmatterRaw = match[1];
    const result = {};

    const termMatch = frontmatterRaw.match(/term:\s*(?:["'](.+?)["']|([^\n]+))/);
    if (termMatch) result.term = (termMatch[1] || termMatch[2]).trim();

    const descMatch = frontmatterRaw.match(/description:\s*(?:["'](.+?)["']|([^\n]+))/);
    if (descMatch) result.description = (descMatch[1] || descMatch[2]).trim();

    const sumMatch = frontmatterRaw.match(/summary:\s*(?:["'](.+?)["']|([^\n]+))/);
    if (sumMatch) result.summary = (sumMatch[1] || sumMatch[2]).trim();

    const relatedMatch = frontmatterRaw.match(/related:\s*(\[.*?\])/s);
    if (relatedMatch) {
      try {
        result.related = JSON.parse(relatedMatch[1]);
      } catch (e) {
        result.related = relatedMatch[1]
          .replace(/^\[|\]$/g, '')
          .split(',')
          .map(s => s.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
      }
    }

    return result;

  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

async function main() {
  try {
    await fs.mkdir(outputDir, { recursive: true });

    const files = await fs.readdir(pagesDir);
    const mdxFiles = files.filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

    const data = [];

    for (const file of mdxFiles) {
      const filePath = path.join(pagesDir, file);
      const frontmatter = await extractFrontmatter(filePath);

      if (frontmatter && frontmatter.term) {
        data.push({
          term: frontmatter.term,
          description: frontmatter.description || "",
          summary: frontmatter.summary || "",
          related: frontmatter.related || []
        });
      }
    }

    await fs.writeFile(outputFile, JSON.stringify(data, null, 2));
    console.log(`Generated glossary data with ${data.length} terms at ${outputFile}`);

  } catch (error) {
    console.error("Script failed:", error);
    process.exit(1);
  }
}

main();
