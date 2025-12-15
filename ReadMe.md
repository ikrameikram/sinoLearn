# 🇨🇳 SinoLearn — Plateforme Interactive d’Apprentissage du Chinois Mandarin

SinoLearn est une application **full-stack** composée d’un **backend Laravel** et d’un **frontend React**, permettant aux apprenants d’étudier le chinois mandarin de manière interactive.
Les administrateurs et professeurs disposent d’outils avancés pour gérer les cours, les utilisateurs, les statistiques et l’export PDF.

---

## 🚀 Fonctionnalités

### 👤 Utilisateur

* Inscription / Connexion
* Tableau de bord personnalisé (niveau, progression, badges)
* Parcours d’apprentissage HSK (1 → 6)
* Leçons multimédias (texte, audio, vidéo)
* Quiz interactifs & correction automatique
* Mock tests HSK chronométrés
* Forum + Chat en temps réel
* Gamification : badges, niveaux
* Gestion du profil et des préférences

### 👨‍🏫 Professeur

* Création / modification / suppression de cours
* Gestion des quiz et exercices
* Suivi de la progression des étudiants
* Ajout de vidéos, documents, audios pédagogiques

### 🛡️ Administrateur

* Tableau de bord global
* Gestion des utilisateurs, professeurs et rôles
* Modération (forum, chat)
* Suivi des statistiques d’activité
* Export PDF (logs, rapports, utilisateurs)
* Gestion complète des contenus (cours, tests, médias)

---

## 🛠️ Technologies Utilisées

### Backend — Laravel

* Laravel
* Laravel Sanctum
* MySQL
* Eloquent ORM

### Frontend — React

* React.js
* JavaScript
* Tailwind CSS
* React Router DOM
* Redux Toolkit
* Axios
* Vite

---

## 📐 Conception

* Diagramme de classes
* Diagramme de cas d’utilisation
* Maquettes Figma

---

## 🔗 Liens utiles

- <a href="https://docs.google.com/document/d/1bQBuLDfPF-J7Z6UsUWCVJAV19gR1uSJnQH5BpG63RIE/edit?tab=t.0" target="_blank" style="text-decoration:none;">
  <kbd>📋 Voir le Cahier de charge </kbd>
</a>

- <a href="https://sino-learn.atlassian.net/jira/software/projects/TASK/boards/35/backlog" target="_blank" style="text-decoration:none;">
  <kbd>📋 Voir le Planning Jira</kbd>
</a>

- <a href="https://lucid.app/lucidchart/89d83f45-253c-48d7-95dd-4776e0516f03/edit?invitationId=inv_d7fe5747-df10-488f-a4b0-b6de2077cb46&page=0_0# " target="_blank" style="text-decoration:none;">
  <kbd>📐 Diagramme de Classes UML</kbd>
</a>

- <a href="https://lucid.app/lucidchart/c8f6566b-a302-4455-99e1-5c33d6eb7f26/edit?beaconFlowId=18CA595575E285D1&invitationId=inv_5a78313f-9222-4752-8fe3-254f6fcad28c&page=0_0#" target="_blank" style="text-decoration:none;">
  <kbd>📄 Diagramme de Cas d'Utilisation UML</kbd>
</a>

- <a href="    " target="_blank" style="text-decoration:none;">
  <kbd>🎨 Maquettage Figma</kbd>
</a>

## 🔌 Routes API Principales

| Méthode | Endpoint | Description | Accès |
| :--- | :--- | :--- | :---: |
| <kbd>POST</kbd> | `/api/login` | Connexion utilisateur & récupération token | 🔓 Public |
| <kbd>POST</kbd> | `/api/register` | Création d'un nouveau compte | 🔓 Public |
| <kbd>GET</kbd> | `/api/lessons` | Récupérer la liste de toutes les leçons | 🔐 Auth |
| <kbd>GET</kbd> | `/api/lessons/{id}` | Détails d'une leçon spécifique | 🔐 Auth |
| <kbd>GET</kbd> | `/api/lessons/{id}/quiz` | Récupérer les questions du quiz associé | 🔐 Auth |
| <kbd>POST</kbd> | `/api/quiz/submit` | Envoyer les réponses et obtenir le score | 🔐 Auth |
| <kbd>GET</kbd> | `/api/hsk/tests` | Liste des tests blancs HSK disponibles | 🔐 Auth |
| <kbd>POST</kbd> | `/api/forum/posts` | Créer un nouveau sujet de discussion | 🔐 Auth |



---

## 👥 Projet réalisé par

**Ikrame ELBAGHLI**
