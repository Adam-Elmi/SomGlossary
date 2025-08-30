import fs from "fs/promises";
import path from "node:path";

const NO_MATCH_FOUND = "NO MATCH FOUND!";

function extractFrontmatter(content) {
  if (content && typeof content === "string") {
    const regex = /^---\n([\s\S]*?)\n---/;
    content = content.match(regex);
    return Array.isArray(content) ? content[0] : NO_MATCH_FOUND;
  }
  throw new Error(
    "PLEASE ENSURE THAT THE VALUE IS DEFINED AND THE DATA TYPE IS A STRING.",
  );
}

export function extractTitle(frontmatter, prop) {
  if (frontmatter === NO_MATCH_FOUND) return;
  if (frontmatter && typeof frontmatter === "string" && prop) {
    let title = frontmatter.slice(frontmatter.indexOf(prop));
    title = title.slice(title.indexOf(prop), title.indexOf("\n"));
    return title.slice(title.indexOf(":") + 1).trim();
  }
}

async function getDirectories(path) {
  try {
    await fs.access(path).catch(() => {
      throw new Error("THE PATH DOES NOT EXIST!");
    });
    return await fs.readdir(path);
  } catch (error) {
    console.error(error);
  }
}
const targetPath = path.join("src", "pages", "glossary");
const folders = await getDirectories(targetPath);

async function getFileContent(filePath) {
  if (filePath && typeof filePath === "string") {
    return await fs.readFile(filePath, "utf-8");
  }
}

async function createData() {
  const data = [];
  try{
    if (Array.isArray(folders) && folders.length > 0) {
      for (const file of folders) {
        const filePath = path.join(targetPath, file);
        const filename = path.basename(filePath);
        const content = await getFileContent(filePath);
        const frontmatter = extractFrontmatter(content);
        const title = extractTitle(frontmatter, "title");
        if (filename && title) {
          data.push({
            file: filename,
            title: title,
          });
        }
      }
      return data;
    }
  } catch(error) {
    console.log(error);
  }
}

async function createJsonFile() {
  try {
    const data = await createData();
    if (data.length > 0) {
      await fs.access("glossary_data").catch(() => {
        fs.mkdir(path.join("glossary_data"), (err) => {
          if (err) {
            if (err.code === "EEXIST") {
              console.log("Directory already exists");
            } else {
              console.error("Error creating directory:", err);
            }
            return;
          }
          console.log("Directory created successfully");
        });
      })
      await fs.writeFile(
        path.join("glossary_data", "output.json"),
        JSON.stringify(data, null, 2),
      );
    }
  } catch (error) {
    console.error(error);
  }
}
createJsonFile();
