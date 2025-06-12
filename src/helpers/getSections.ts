const matches = import.meta.glob("../pages/glossary/*.mdx", { eager: true });
const files = Object.values(matches);

function toLower(arr: string[]) {
  return arr.map(value => value.toLowerCase());
}

function matchedContents(header: string) {
    header = header.toLowerCase();
    return files
        .filter((file: any) => toLower(file.frontmatter.category).includes(header))
        .map((item: any) => item.frontmatter.title);
}

const sections = [
    {
        header: "Languages",
        get contents() {
            return matchedContents(this.header);
        },
    },
    {
        header: "Frameworks",
        get contents() {
            return matchedContents(this.header);
        },
    },
    {
        header: "Libraries",
        get contents() {
            return matchedContents(this.header);
        },
    },
    {
        header: "Platforms",
        get contents() {
            return matchedContents(this.header);
        },
    },
    {
        header: "Databases",
        get contents() {
            return matchedContents(this.header);
        },
    },
    {
        header: "Runtime",
        get contents() {
            return matchedContents(this.header);
        },
    },
    {
        header: "Security",
        get contents() {
            return matchedContents(this.header);
        },
    },
    {
        header: "Dev Tools",
        get contents() {
            return matchedContents(this.header);
        },
    },
];
export default sections;