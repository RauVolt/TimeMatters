# TimeMatters
Value time, it matters.

## Application — compteur de coût

Application web autonome, en français, sans backend, compte ni intégration. Les calculs restent dans le navigateur. Les polices Google Fonts sont facultatives ; les polices système prennent le relais hors ligne.

## Lancer en local

Depuis ce répertoire, exécuter `npm start` (Python 3 requis), puis ouvrir le port 8080 dans un navigateur. Aucun paquet à installer. Les modules JavaScript nécessitent un serveur HTTP plutôt qu’une ouverture du fichier en `file://`.

## Utilisation

Renseigner les taux horaires (60 €/h pour les internes et 120 €/h pour les consultants par défaut) et les effectifs. Cliquer sur **Démarrer la réunion**. Le tableau affiche le coût, la durée écoulée et le temps collectif (durée × nombre de participants). Pause, reprise et fin de réunion sont disponibles. Les paramètres sont verrouillés pendant la réunion. Le compteur utilise une horloge monotone et reste exact lorsque l’onglet est en arrière-plan. Un rechargement remet la réunion à zéro ; le navigateur demande confirmation pendant une réunion active.

Coût = (taux interne × effectif interne + taux consultant × effectif consultant) × durée en heures. Les pauses sont exclues et l’arrondi monétaire intervient uniquement à l’affichage.

## Tests

`npm test` (Node.js 18 ou plus).

## Publier sur le web

Déployer la racine du dépôt comme site statique sur un hébergement HTTPS, sans commande de compilation. Il contient tous les fichiers nécessaires. Le workflow `.github/workflows/meeting-meter-pages.yml` publie la racine du dépôt sur GitHub Pages. Dans Settings → Pages, sélectionner la source GitHub Actions. La publication est déclenchée à chaque push sur main ou manuellement depuis Actions. Adresse attendue après un déploiement réussi : https://rauvolt.github.io/TimeMatters/.
