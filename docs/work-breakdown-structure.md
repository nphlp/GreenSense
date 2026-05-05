# Work Breakdown Structure

Voici la structure du document. Le découpage se fait en `fonctionnalités`, `composantes de fonctionnalité`, `étapes de développement` et `sous-étapes de développement`.

# Fonctionnalités utilisateur

---

## Plannificateur de cultures

Le **plannificateur de cultures** est utilisé dans les premières minutes après l'installation de l'application. Il permet à l'utilisateur de renseigner les informations nécessaires pour le fonctionnement de l'application.

1. **Terrain**

- Superficie du terrain (en m2)
- Forme du terrain (définition de zones, potager, composte, serre, etc.)
- Localisation du terrain (climat associé, saisonalité, humidité, etc.)
- Type de sol (argileux, sableux, etc.)
- Ensoleillement du terrain (mi ombre, ensoleillé, en été, en hiver, etc.)

2. **Cultures**

- Choix des plantes principales/obligatoires
- Choix des plantes complémentaires
- Sélection des associations

3. **Calendrier**

- Apperçu du calendrier de culture (répartition sur l'année)
- Ajustement des quantités (nombre de semis, nombre de plants, production attendue, etc.)

4. **Outillable & Consommables**

- Outils nécessaires (bêche, râteau, etc.)
- Consommables nécessaires (engrais, paillis, etc.)

## Journal de bord

Le **journal de bord** indique à l'utilisateur les **activités** à effectuer sur le terrain. Il s'apparente à une checklist des tâches à faire sur les **jours, semaines et mois à venir**. Il est mis à jour en fonction de l'évolution du terrain et des cultures.

À définir...

1. **Activités quotidiennes**
2. **Activités hebdomadaires**
3. **Activités mensuelles**

## Suivi de croissance

Le **suivi de croissance** est une étape régulière d'observation faite par l'utilisateur et la notation de l'état des cultures. C'est un **point d'entrée de données** cruciale pour le bon fonctionnement de l'application. Il nous permet d'intégrer des données de terrain dans notre système pour ajuster le **journal de bord** et le **tableau de bord**.

À définir...

1. **Observation de la croissance**
2. **Notation de l'état des cultures**

## Tableau de bord

Le **tableau de bord** est un espace de visualisation des données du terrain et des cultures. Il permet à l'utilisateur de suivre l'évolution de son jardin, d'avoir une vue d'ensemble sur les productions potentielles, d'observer les tendances et d'ajuster ses pratiques en conséquence.

À définir...

1. **Vue d'ensemble des productions**
2. **Analyse des tendances**
3. **Ajustements de pratiques**

## Notifications intelligentes

Les **notifications intelligentes** sont des alertes personnalisées envoyées à l'utilisateur pour lui rappeler les activités à faire, les observations à faire, ou pour lui fournir des conseils basés sur les données du terrain et des cultures.

À définir...

1. **Notifications du journal de bord**
2. **Notifications du suivi de croissance**
3. **Notifications de météo problématique**
4. **Notifications du tableau de bord**

---

# Systèmes de techniques

---

## Données métier

Les **données métier** sont les informations nécessaires pour le fonctionnement de l'application. Elles sont utilisées lors de la plannification des cultures, pour journal de bord, du suivi de croissance, du tableau de bord et des notifications intelligentes.

À définir...

1. Scrapping de données

- Données plantes (caractéristiques, besoins, etc.)
- Articles scientifiques
- Articles de revues spécialisées
- Articles de blogs

2. Fiche plantes
3. Associations de plantes
4. Calendrier de culture
5. Outils et consommables

## LLM & RAG

Un **LLM connecté à un RAG** sera utilisé pour répondre à des questions spécifiques des utilisateurs, pour rédiger des notifications contextualisées, pour l'interprétation des données de terrain, pour l'ajustement du journal de bord et du tableau de bord, etc.

À définir...

1.

## Machine Learning

Le **Machine Learning** sera utilisé pour prédire des tendances, des rendements, des problèmes potentiels, etc. Il s'appuiera sur les **données de terrain collectées** par les utilisateurs, les capteurs du le terrain, les données externes, et les données métier pour faire des prédictions et des recommandations personnalisées.

À définir...

1.

## IoT & capteurs

Les **capteurs IoT** sont des dispositifs physiques installés sur le terrain pour collecter des données en temps réel sur les conditions du sol, de l'air, de la lumière, etc. Ces données seront utilisées pour ajuster le journal de bord, le tableau de bord, et les notifications intelligentes.

À définir...

1. Capteurs d'humidité du sol
2. Capteurs de température
3. Capteurs de luminosité

Plus tard...

4. Capteurs de CO2 (trop cher)
5. Capteurs de pH (trop complexe)

## API Externes

Les **API externes** sont des sources de données tierces qui peuvent être intégrées dans notre application pour enrichir les fonctionnalités et les données disponibles pour l'utilisateur.

À définir...

1. API météo
2. API de données agricoles
3. API de données de sol
4. API de données de localisation
