import metadata from "../data/metadata.json";

const getTerms = () => {
    const glob = import.meta.glob("../pages/glossary/*.mdx", { eager: true });
    return Object.entries(glob)
        .map(([key, mod]: [string, any]) => {
            if (!mod?.frontmatter?.term) return null;

            const metadataKey = key.replace("../", "src/");
            const fileMetadata = (metadata as any)[metadataKey];

            return {
                title: mod.frontmatter.term,
                lastUpdated: fileMetadata?.lastUpdated || mod.frontmatter.lastUpdated || null,
                dateAdded: fileMetadata?.dateAdded || null,
            };
        })
        .filter((item): item is { title: string; lastUpdated: string | null; dateAdded: string | null } => item !== null);
};

const getHighlights = () => {
    const terms = getTerms();

    if (terms.length === 0) {
        return [
            {
                title: "Random Glossary",
                description: "The actual random term.",
                icon: "random",
                link: "",
                data: "N/A",
                label: "Random",
            },
            {
                title: "Newest Glossary Added",
                description: "The latest term updated.",
                icon: "new",
                link: "",
                data: "N/A",
                label: "Newest",
            },
            {
                title: "Glossary of the Day",
                description: "Today’s term.",
                icon: "star",
                link: "",
                data: "N/A",
                label: "Today",
            },
        ];
    }

    const slugify = (text: string) => text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
        hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
        hash |= 0;
    }
    const dayIndex = Math.abs(hash) % terms.length;
    const glossaryOfTheDay = terms[dayIndex];

    const randomIndex = Math.floor(Math.random() * terms.length);
    const randomTerm = terms[randomIndex];

    const newestTerm = [...terms].sort((a, b) => {
        const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
        const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
        const diff = dateB - dateA;
        return diff !== 0 ? diff : a.title.localeCompare(b.title);
    })[0];

    return [
        {
            title: "Random Glossary",
            description: "Expand your knowledge.",
            icon: "random",
            link: randomTerm ? `/glossary/${slugify(randomTerm.title)}` : "",
            data: randomTerm ? randomTerm.title : "N/A",
            label: "Random",
            subLabel: "Term",
        },
        {
            title: "Newest Glossary Added",
            description: "The most recently added term.",
            icon: "new",
            link: newestTerm ? `/glossary/${slugify(newestTerm.title)}` : "",
            data: newestTerm ? newestTerm.title : "N/A",
            label: "Newest",
            subLabel: "Term",
        },
        {
            title: "Glossary of the Day",
            description: "Today's featured term.",
            icon: "star",
            link: glossaryOfTheDay ? `/glossary/${slugify(glossaryOfTheDay.title)}` : "",
            data: glossaryOfTheDay ? glossaryOfTheDay.title : "N/A",
            label: "Today",
            subLabel: "Term",
        },
    ];
};

const advantages = [
    {
        title: "Af-Soomaali",
        description: "Erayo tiknoolaji ah oo lagu sharaxay Af-Soomaali.",
    },
    {
        title: "Kobcinta Aqoon Tiknoolajiyeed",
        description: "Kor u qaadaysa fahamka tiknoolajiga ee bulshada Soomaaliyeed.",
    },
    {
        title: "Open Source",
        description: "Qof walbana wuu ka qayb qaadan kara ama wax wu ku dari karaa.",
    },
];

export { advantages, getHighlights };