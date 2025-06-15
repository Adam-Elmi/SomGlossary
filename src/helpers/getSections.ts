import output from "../../data/output.json";

function toLower(arr: string[]) {
  return arr.map(value => value.toLowerCase());
}

function matchedContents(header: string) {
    header = header.toLowerCase();
    return output
        .filter((file: any) => toLower(file.category).includes(header))
        .map((item: any) => item.title);
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
console.log(sections)
export default sections;