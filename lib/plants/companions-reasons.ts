/**
 * Explanations for why two plants are good companions.
 * Based on classical French organic gardening (compagnonnage végétal).
 *
 * Keys are plain pairs joined by `|`, order-insensitive (lookup tries both).
 */
export const COMPANION_REASONS: Record<string, string> = {
    "tomate|basilic": "Éloigne pucerons, améliore la saveur",
    "tomate|carotte": "Carotte ameublit le sol, tomate fait ombre",
    "tomate|ail": "Répulsif contre les araignées rouges",
    "tomate|oignon": "Protège des maladies fongiques",
    "tomate|aubergine": "Même famille, besoins similaires",
    "tomate|poivron": "Solanacées, cohabitation facile",

    "basilic|poivron": "Protège contre les thrips",
    "basilic|aubergine": "Éloigne les nuisibles",
    "basilic|courgette": "Repousse les insectes volants",

    "carotte|salade": "Optimise l'espace au sol",
    "carotte|oignon": "Se protègent des mouches mutuellement",
    "carotte|ail": "Protège contre les ravageurs",
    "carotte|poivron": "Cohabitation compatible",

    "courgette|mais": "Trio des 3 sœurs (avec haricot)",
    "courgette|salade": "Différents niveaux d'occupation",

    "poivron|oignon": "Répulsif contre les parasites",
    "poivron|aubergine": "Solanacées compatibles",

    "salade|ail": "Protège contre les limaces",
    "salade|oignon": "Éloigne les pucerons",
    "salade|fraise": "Couvre-sol complémentaire",
    "salade|brocoli": "Familles compatibles",

    "brocoli|oignon": "Protège contre la piéride du chou",
    "brocoli|ail": "Répulsif contre les chenilles",
    "brocoli|pomme-de-terre": "Rotation favorable entre familles",

    "pomme-de-terre|mais": "Rotation compatible",

    "ail|fraise": "Protège contre la pourriture grise",
    "ail|pomme": "Protège contre la tavelure",
    "ail|poire": "Éloigne les parasites",

    "oignon|fraise": "Protège contre la pourriture",
    "oignon|pomme": "Éloigne les pucerons",
    "oignon|poire": "Répulsif contre les parasites",
};
