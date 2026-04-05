/**
 * Period expressed as month numbers (1 = January, 12 = December).
 * When end < start, the period wraps around the year (e.g. planting ail from October to March).
 */
export type Phase = {
    start: number;
    end: number;
};

export type PlantCategory =
    | "legume-fruit" // tomate, poivron, courgette, aubergine
    | "legume-feuille" // salade, brocoli
    | "legume-racine" // carotte, pomme de terre
    | "condiment" // ail, oignon
    | "aromatique" // basilic
    | "fruit" // fraise, pomme, poire
    | "cereale"; // maïs

export type Plant = {
    id: string;
    name: string;
    icon: string; // Iconify slug, e.g. "noto:tomato"
    category: PlantCategory;
    phases: {
        sowing?: Phase; // Semis (en intérieur ou extérieur)
        planting?: Phase; // Plantation / Repiquage
        flowering?: Phase; // Floraison (optionnelle selon plante)
        harvest: Phase; // Récolte (toujours présente)
    };
    companions: string[]; // IDs of companion plants
    description?: string;
};
