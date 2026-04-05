import type { Plant } from "./types";

/**
 * Hardcoded plants dataset for the POC.
 *
 * Periods reflect typical French temperate climate (zone 8a-8b).
 * Companion associations are based on classical companion planting
 * (compagnonnage végétal) in organic / permaculture gardening.
 *
 * All companion relationships are bilateral: if A lists B, then B lists A.
 */
export const PLANTS: Plant[] = [
    {
        id: "tomate",
        name: "Tomate",
        icon: "noto:tomato",
        category: "legume-fruit",
        phases: {
            sowing: { start: 3, end: 4 },
            planting: { start: 5, end: 5 },
            flowering: { start: 6, end: 8 },
            harvest: { start: 7, end: 10 },
        },
        companions: ["basilic", "carotte", "ail", "oignon", "aubergine", "poivron"],
        description: "Reine du potager, gourmande en soleil et en eau.",
    },
    {
        id: "poivron",
        name: "Poivron",
        icon: "noto:bell-pepper",
        category: "legume-fruit",
        phases: {
            sowing: { start: 2, end: 3 },
            planting: { start: 5, end: 5 },
            flowering: { start: 6, end: 7 },
            harvest: { start: 7, end: 10 },
        },
        companions: ["basilic", "tomate", "oignon", "aubergine", "carotte"],
        description: "Solanacée qui demande beaucoup de chaleur.",
    },
    {
        id: "courgette",
        name: "Courgette",
        icon: "noto:cucumber",
        category: "legume-fruit",
        phases: {
            sowing: { start: 4, end: 5 },
            planting: { start: 5, end: 5 },
            flowering: { start: 6, end: 8 },
            harvest: { start: 6, end: 10 },
        },
        companions: ["basilic", "mais", "salade"],
        description: "Production abondante, à récolter jeune pour plus de tendreté.",
    },
    {
        id: "aubergine",
        name: "Aubergine",
        icon: "noto:eggplant",
        category: "legume-fruit",
        phases: {
            sowing: { start: 2, end: 3 },
            planting: { start: 5, end: 6 },
            flowering: { start: 6, end: 8 },
            harvest: { start: 7, end: 10 },
        },
        companions: ["basilic", "tomate", "poivron"],
        description: "Solanacée frileuse, à installer après les dernières gelées.",
    },
    {
        id: "salade",
        name: "Salade",
        icon: "noto:leafy-green",
        category: "legume-feuille",
        phases: {
            sowing: { start: 2, end: 9 },
            harvest: { start: 3, end: 11 },
        },
        companions: ["carotte", "ail", "oignon", "fraise", "brocoli", "courgette"],
        description: "Semez en échelonné pour en avoir toute l'année.",
    },
    {
        id: "brocoli",
        name: "Brocoli",
        icon: "noto:broccoli",
        category: "legume-feuille",
        phases: {
            sowing: { start: 4, end: 7 },
            planting: { start: 6, end: 8 },
            harvest: { start: 8, end: 11 },
        },
        companions: ["salade", "oignon", "ail", "pomme-de-terre"],
        description: "Crucifère riche en vitamines, apprécie les sols frais.",
    },
    {
        id: "carotte",
        name: "Carotte",
        icon: "noto:carrot",
        category: "legume-racine",
        phases: {
            sowing: { start: 3, end: 7 },
            harvest: { start: 6, end: 11 },
        },
        companions: ["tomate", "salade", "oignon", "ail", "poivron"],
        description: "Préfère un sol meuble et sans cailloux pour de belles racines.",
    },
    {
        id: "pomme-de-terre",
        name: "Pomme de terre",
        icon: "noto:potato",
        category: "legume-racine",
        phases: {
            planting: { start: 3, end: 4 },
            flowering: { start: 5, end: 6 },
            harvest: { start: 6, end: 9 },
        },
        companions: ["mais", "brocoli"],
        description: "À butter régulièrement pour favoriser la formation des tubercules.",
    },
    {
        id: "ail",
        name: "Ail",
        icon: "noto:garlic",
        category: "condiment",
        phases: {
            planting: { start: 10, end: 3 },
            harvest: { start: 6, end: 7 },
        },
        companions: ["tomate", "fraise", "carotte", "salade", "brocoli", "pomme", "poire"],
        description: "Plantation possible en automne (ail d'hiver) ou fin d'hiver.",
    },
    {
        id: "oignon",
        name: "Oignon",
        icon: "noto:onion",
        category: "condiment",
        phases: {
            sowing: { start: 2, end: 4 },
            planting: { start: 3, end: 4 },
            harvest: { start: 7, end: 9 },
        },
        companions: ["carotte", "tomate", "salade", "fraise", "brocoli", "poivron", "pomme", "poire"],
        description: "Repousse de nombreux ravageurs, à marier avec la carotte.",
    },
    {
        id: "basilic",
        name: "Basilic",
        icon: "noto:herb",
        category: "aromatique",
        phases: {
            sowing: { start: 4, end: 5 },
            planting: { start: 5, end: 5 },
            harvest: { start: 6, end: 10 },
        },
        companions: ["tomate", "poivron", "aubergine", "courgette"],
        description: "Protège les solanacées des parasites, à pincer pour qu'il se ramifie.",
    },
    {
        id: "fraise",
        name: "Fraise",
        icon: "noto:strawberry",
        category: "fruit",
        phases: {
            planting: { start: 9, end: 10 },
            flowering: { start: 4, end: 5 },
            harvest: { start: 5, end: 7 },
        },
        companions: ["ail", "oignon", "salade"],
        description: "Plantation à l'automne pour une récolte dès le printemps suivant.",
    },
    {
        id: "pomme",
        name: "Pomme",
        icon: "noto:red-apple",
        category: "fruit",
        phases: {
            planting: { start: 10, end: 3 },
            flowering: { start: 4, end: 5 },
            harvest: { start: 8, end: 10 },
        },
        companions: ["ail", "oignon"],
        description: "Arbre fruitier à planter en automne ou fin d'hiver.",
    },
    {
        id: "poire",
        name: "Poire",
        icon: "noto:pear",
        category: "fruit",
        phases: {
            planting: { start: 10, end: 3 },
            flowering: { start: 4, end: 5 },
            harvest: { start: 7, end: 10 },
        },
        companions: ["ail", "oignon"],
        description: "Apprécie un emplacement chaud et abrité du vent.",
    },
    {
        id: "mais",
        name: "Maïs",
        icon: "noto:ear-of-corn",
        category: "cereale",
        phases: {
            sowing: { start: 4, end: 6 },
            flowering: { start: 7, end: 8 },
            harvest: { start: 8, end: 10 },
        },
        companions: ["courgette", "pomme-de-terre"],
        description: "Composant classique du trio « trois sœurs » avec courgette et haricot.",
    },
];
