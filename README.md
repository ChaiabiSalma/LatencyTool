## 📜 Description
Ce projet est une application interactive qui permet de mesurer la latence réseau entre une adresse IP donnée et le serveur, tout en affichant les résultats sous différentes formes visuelles telles que des graphiques et une carte.
## 📚 *Table des Matières*

- [🛠 Architecture Logicielle](#-architecture-logicielle)  
- [🐳 Docker](#-docker)
- [🎯 Fonctionnalités](#-focntionnalités)
- [🎨 Frontend](#-frontend)  
- [💻 Backend](#-backend)  
- [🎥 Démonstration Vidéo](#-démonstration-vidéo)  
 

## 🛠️ Architecture Logicielle

![WhatsApp Image 2025-01-01 à 12 24 37_6b778eda](https://github.com/user-attachments/assets/6858f9e0-4466-4d2e-8ce6-410dae0f9c9b)

- **Frontend** : React.js, React Chart.js.
- **Backend** : Node.js, Spring Boot.
- **Bibliothèques** :
  - Chart.js pour les graphiques.

## 🐳 *Docker*
### *docker-compose.yml :*
```yaml

 
services:
  mysql:
    image: mysql:8.0
    container_name: mysql-container
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: latency_tool
    ports:
      - "3306:3306"
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 20s
      timeout: 10s
      retries: 5
    networks:
      - custom_network

  backend:
    build:
      context: ./latency-tool
    container_name: backend-container
    ports:
      - "8085:8085"
    depends_on:
      - mysql
    entrypoint: [ "sh", "-c", "until nc -z mysql 3306; do echo 'Waiting for MySQL...'; sleep 2; done; java -jar app.jar" ]
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/latency_tool
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: root
      SPRING_DATASOURCE_DRIVER_CLASS_NAME: com.mysql.cj.jdbc.Driver
      SPRING_JPA_HIBERNATE_DDL_AUTO: update
      SPRING_JPA_SHOW_SQL: "true"
      SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT: org.hibernate.dialect.MySQLDialect
      SPRING_SECURITY_CSRF_ENABLED: "true"
      SPRING_DATASOURCE_HIKARI_MAXIMUM_POOL_SIZE: 10
      SPRING_DATASOURCE_HIKARI_MINIMUM_IDLE: 5
      SPRING_DATASOURCE_HIKARI_IDLE_TIMEOUT: 30000
      SPRING_DATASOURCE_HIKARI_MAX_LIFETIME: 1800000
    networks:
      - custom_network

  frontend:
    build:
      context: C:/Users/HP/Downloads/latency-tool/latency-tool-frontend
      dockerfile: Dockerfile
    container_name: frontend-container
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - custom_network

  phpmyadmin:
    image: phpmyadmin/phpmyadmin:5.1
    container_name: phpmyadmin-container
    environment:
      PMA_HOST: mysql
      PMA_PORT: 3306
      MYSQL_ROOT_PASSWORD: root
    ports:
      - "8080:80"
    networks:
      - custom_network

networks:
  custom_network:
    driver: bridge

```

### ⚠️ REMARQUE 
*chemin des fichiers Docker :*
   - Après avoir ouvert le projet sur votre machine, il est nécessaire de modifier le chemin du fichier docker en backend et en frontend dans le fichier docker-compose.yml en fonction de l'endroit où vous avez placé le projet et le fils docker.
     
## 🎯 Fonctionnalités
- Mesure de latence pour une adresse IP.
- Visualisation des résultats avec :
  - Graphique en barres.
  - Graphique en secteurs (camembert).
  - Carte interactive pour localiser les adresses IP.
- Validation des adresses IP avant la mesure.

## 🎨 Frontend

### Technologies Used

- Angular
- HTML
- CSS
- TS

## Frontend Projet Structure

*LatencyForm :* permet à l'utilisateur d'entrer une adresse IP, de soumettre une requête pour mesurer la latence vers cette IP, et d'afficher les résultats dans la même interface.

*LatencyResults :* permet à l'utilisateur de saisir une adresse IP, d'envoyer cette IP à une API pour mesurer la latence, puis d'afficher la latence mesurée et les recommandations associées.

*TargetList :* fournit une interface simple et fonctionnelle pour récupérer et afficher les cibles à partir de l'API. Il s'assure que les données sont récupérées de manière asynchrone et sont affichées proprement, tout en gérant les états locaux dans React.


## 🖥 Backend
### Technologies Used

- Spring Boot
- MySQL

### Backend Project Structure
 
 The backend code follows a modular and organized structure, leveraging the power of Spring Boot for building a robust and scalable application.

### 1. Config

  - *WebConfig:* la configuration de la sécurité de notre application Spring Boot.
  
### 2. Controller

 - *LatencyController :* Il permet à un utilisateur (ou à une autre application) de mesurer la latence d'une cible réseau spécifiée par une adresse IP.
 
 - *RecommendationController* : Elle analyse les résultats de latence et fournir des conseils sur la façon d'améliorer le réseau ou d'optimiser les performances.
 
 - *TargetController :* construite pour gérer les cibles dans votre application, permettant de récupérer, créer, supprimer et consulter des cibles via des requêtes HTTP RESTful.
 
### 3. Model

  - *Target :* représente une cible (un serveur ou une machine) à partir de laquelle vous mesurez la latence. Chaque cible a un nom d'hôte (hostname) et une adresse IP (ipAddress).

  - *LatencyResult :* représente un résultat de mesure de latence pour une cible spécifique.
  
  - *User :* utilisée pour stocker les informations des utilisateurs dans la base de données.
  
### 4. Repository

  - *TargetRepository :* permet d'effectuer des opérations CRUD sur la table Target en base de données. Elle inclut une méthode findByIpAddress qui permet de récupérer une cible en fonction de son adresse IP.
  
  - *LatencyResultRepository :* une interface qui étend JpaRepository, ce qui lui permet d'interagir facilement avec la base de données pour effectuer des opérations CRUD sur l'entité LatencyResult.
  
  - *UserRepository :* permet de récupérer un utilisateur par son nom d'utilisateur grâce à la méthode findByUsername.
  
### 5. Service

  - *LatencyService :* un service Spring qui contient la logique métier pour mesurer la latence d'une cible (identifiée par son adresse IP) et enregistrer le résultat de cette mesure dans la base de données.
  
  - *RecommandationService :* génère des recommandations qui sont ensuite envoyées par le contrôleur (RecommendationController) via une API REST.
  
  - *CustomUserDetailsService :* implémente UserDetailsService et est responsable de la conversion des données utilisateur en un format que Spring Security peut utiliser pour l'authentification et l'autorisation

### Dependencies

1. *Spring Data JPA:*
   - But : Simplifie l'accès aux données via JPA dans Spring Boot.
2. MySQL Connector/J:
   - But : Pilote JDBC pour se connecter à une base de données MySQL.

xml
```sh
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>

```
## Getting Started

Voici les étapes pour configurer et exécuter votre projet en local :

### Prerequisites:

1. *Git:*
   - Assurez-vous que Git est installé. Sinon, téléchargez-le et installez-le depuis git-scm.com.
     
2. *XAMPP:*
   - Installez XAMPP depuis [apachefriends.org](https://www.apachefriends.org/).
   - Démarrez les serveurs Apache et MySQL dans XAMPP.
   - Assurez-vous que MySQL utilise le port 3306.

3. *Node Version Manager (NVM):*
   - Installez NVM depuis [github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm).
   - Utilisez NVM pour installer Node.js version 14.11.0 : nvm install 14.11.0.
  
  ### Backend Setup:

1. *Clonez le projet :*
   bash
   git clone <repository_url>
   cd <project_folder>
   

2. *Installez les dépendances Backend*
   - Ouvrez un terminal dans le dossier du projet backend.
   - Exécutez les commandes suivantes :
     bash
     mvn clean install
     

3. *Exécutez le Backend :*
   - Démarrez vos serveurs Apache et MySQL dans XAMPP.
   - Lancez l'application Spring Boot. La base de données et les entités seront créées automatiquement.
   - Vérifiez que le backend fonctionne en visitant [http://localhost:8000](http://localhost:8000) in your browser.
### Frontend Setup:

1. *Installez Node.js et Angular ::*
   - Ouvrez un nouveau terminal pour le projet frontend.
   - Assurez-vous que NVM utilise Node.js version 14.11.0.
   - Installez Angular CLI globalement : npm install -g @angular/cli.

2. *Installez les dépendances Frontend :*
   - Exécutez les commandes suivantes dans le dossier du projet frontend :
     bash
     npm install
     

   - Si vous rencontrez des erreurs pendant l'installation, utilisez cette commande :
     bash
     npm install --save --legacy-peer-deps
     

3. *Exécutez le Frontend :*
   - Après l'installation des dépendances, lancez le serveur de développement Angular :
     bash
     ng serve
     

   - Accédez au frontend à [http://localhost:3000](http://localhost:3000) dans votre navigateur.

Votre projet full-stack devrait maintenant être opérationnel localement. Si vous rencontrez des problèmes pendant l'installation, consultez les logs de la console pour des messages d'erreur et assurez-vous que toutes les dépendances et prérequis sont correctement installés.

# Video Demonstration


https://github.com/user-attachments/assets/498eceee-6b63-4fd3-9fe0-362dd2ffa26b



