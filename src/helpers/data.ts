import output from "../../glossary_data/output.json";

const random_value = output[Math.floor(Math.random() * output.length)].title;
const today = new Date();
const index = today.getDate() % output.length;
const glossaryOfTheDay = output[index];

const advantages = [
    {
        title: "Af-Soomaali",
        description: "Erayo tiknoolaji ah oo lagu sharaxay Af-Soomaali.",
    },
    {
        title: "Kobcinta Aqoon Tiknoolajiyeed",
        description:
            "Kor u qaadaysa fahamka tiknoolajiga ee bulshada Soomaaliyeed.",
    },
    {
        title: "Open Source",
        description:
            "Qof walbana wuu ka qayb qaadan kara ama wax wu ku dari karaa.",
    },
];

const highlights = [
    {
        title: "Total Glossaries",
        description: "Glossaries in the collection",
        icon: "collection",
        link: "",
        data: "Total: " + output.length,
        label: "Collection",
    },
    {
        title: "Random Glossary",
        description: "The actual random term.",
        icon: "random",
        link: "",
        data: random_value,
        label: "Random",
    },
    {
        title: "Newest Glossary Added",
        description: "The latest term added.",
        icon: "new",
        link: "",
        data: "Added Sept 25, 2025",
        label: "Newest",
    },
    {
        title: "Glossary of the Day",
        description: "Today’s term.",
        icon: "",
        link: "",
        data: glossaryOfTheDay.title,
        label: "Today",
    },
];

export {advantages, highlights}