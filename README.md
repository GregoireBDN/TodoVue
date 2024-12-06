# Vue Todo App

Une application de gestion de tâches moderne et intuitive construite avec Vue 3 et Vite.

## 🌟 Fonctionnalités

- ✅ Création, modification et suppression de tâches
- 🔄 Filtrage des tâches (Tous, À faire, Terminées)
- 💾 Persistance des données avec localStorage
- 📱 Interface responsive et moderne
- 🎨 Design soigné avec animations et transitions
- ⌨️ Support complet du clavier pour l'édition
- 🧹 Suppression groupée des tâches

## 🛠️ Technologies Utilisées

- Vue 3 (Composition API)
- Vite
- JavaScript/TypeScript
- CSS3 avec variables personnalisées
- Font Awesome pour les icônes

## 📦 Installation

```bash
# Cloner le repository
git clone [url-du-repo]

# Accéder au dossier
cd vue-todo

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 🏗️ Structure du Projet

```
src/
├── components/
│   ├── BaseButton.vue    # Composant réutilisable pour les boutons
│   ├── TodoList.vue      # Composant principal de la liste
│   ├── TodoItem.vue      # Composant pour chaque tâche
│   ├── TodoFilters.vue   # Filtres de la liste
│   └── Footer.vue        # Pied de page avec compteur
├── App.vue               # Composant racine
└── main.ts              # Point d'entrée de l'application
```

## 🎯 Composants Principaux

### TodoList.vue

- Gestion de l'état global des tâches
- Persistance avec localStorage
- Filtrage des tâches
- Gestion des actions principales

### TodoItem.vue

- Affichage d'une tâche individuelle
- Mode édition inline
- Actions rapides (édition, suppression)
- Animations de survol

### TodoFilters.vue

- Filtrage des tâches par état
- Bouton de suppression globale
- Interface utilisateur intuitive

### BaseButton.vue

- Composant réutilisable pour les boutons
- Plusieurs variantes (primary, danger, default)
- Support des icônes
- Option de taille (normal, small)

## 🎨 Styles et Thème

L'application utilise des variables CSS pour une personnalisation facile :

```css
:root {
  --primary-color: #4caf50;
  --danger-color: #ff4444;
  --bg-color: #f5f7fa;
  --card-bg: #ffffff;
  --text-color: #2c3e50;
  --border-color: #e2e8f0;
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

## 🌐 Fonctionnalités Détaillées

### Gestion des Tâches

- Ajout de nouvelles tâches
- Édition inline avec validation
- Suppression individuelle ou globale
- Marquage comme terminé

### Persistance des Données

- Sauvegarde automatique dans localStorage
- Validation des données au chargement
- Gestion des erreurs

### Interface Utilisateur

- Animations fluides
- Retours visuels sur les actions
- Support complet du clavier
- États de survol élégants

## 🔧 Utilisation

1. **Ajouter une tâche**

   - Saisir le texte dans l'input
   - Appuyer sur Entrée ou cliquer sur "Ajouter"

2. **Éditer une tâche**

   - Cliquer sur l'icône d'édition
   - Modifier le texte
   - Valider avec Entrée ou le bouton de validation
   - Annuler avec Échap ou le bouton d'annulation

3. **Filtrer les tâches**

   - Utiliser les boutons de filtre en haut de la liste
   - "Tous", "À faire", "Terminées"

4. **Supprimer des tâches**
   - Individuellement avec le bouton ×
   - Toutes les tâches avec "Tout supprimer"

## 📝 Licence

MIT

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.
