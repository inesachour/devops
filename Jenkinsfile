pipeline {
    agent any
     tools {
         nodejs "nodejs"
         terraform "terraform"
     }
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/inesachour/devops.git'
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    sh 'cd server && npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    sh 'cd client && npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'cd server && npm test'
                }
            }
        }

        stage('Dockerize') {
            steps {
                // Build and push backend Docker image
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub_credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'cd server && docker build -t backend-image .'
                        sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD docker.io"
                        sh 'docker tag backend-image inesachour/backend-image:latest'
                        sh 'docker push inesachour/backend-image:latest'  
                    }
                    
                }
                // Build and push frontend Docker image
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub_credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'cd client && docker build -t frontend-image .'
                        sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD docker.io"
                        sh 'docker tag frontend-image inesachour/frontend-image:latest'
                        sh 'docker push inesachour/frontend-image:latest'
                    }
                
                    
                }
            }
        }
        
        stage('Terraform') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'azure_credentials',passwordVariable: 'AZURE_CLIENT_SECRET', usernameVariable: 'AZURE_CLIENT_ID')]) {
                            sh 'az login -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET'
                            sh 'terraform plan'
                            sh 'terraform apply --auto-approve tfplan'
                        }
                }
            }
        }

        /*stage('Deploy') {
            steps {
                // Étape pour déployer les conteneurs sur Kubernetes
                script {
                    //sh 'kubectl apply -f kubernetes/deployment-backend.yaml'
                    //sh 'kubectl apply -f kubernetes/deployment-frontend.yaml'
                }
            }
        }*/
    }
}
