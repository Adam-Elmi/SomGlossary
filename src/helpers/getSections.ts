const matches = import.meta.glob("../pages/glossary/*.md", { eager: true });
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
        header: "General",
        get contents() {
            return matchedContents(this.header);
        },
    },
    {
        header: "Web Development",
        get contents() {
            return matchedContents(this.header);
        },
    },
    {
        header: "Mobile Development",
        get contents() {
            return matchedContents(this.header);
        },
    },
    {
        header: "Desktop Development",
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
        header: "Programming Languages",
        get contents() {
            return matchedContents(this.header);
        },
    },
    {
        header: "Operating Systems",
        get contents() {
            return matchedContents(this.header);
        },
    },
    {
        header: "Cybersecurity",
        get contents() {
            return matchedContents(this.header);
        },
    },
    {
        header: "DevOps & Tools",
        get contents() {
            return matchedContents(this.header);
        },
    },
];
export default sections;