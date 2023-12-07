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
        
        /*stage('Login to Azure with AzureServicePrincipal') {
            steps {
                script {
                    withCredentials([azureServicePrincipal(credentialsId: 'azure_service_principal', passwordVariable: 'AZURE_CLIENT_SECRET', usernameVariable: 'AZURE_CLIENT_ID')]) {
                            sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
                            sh 'az account set -s $AZURE_SUBSCRIPTION_ID'
                            sh 'terraform init'

                    }
                }
            }
        }*/
        
        stage('Terraform') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'azure_credentials',passwordVariable: 'AZURE_CLIENT_SECRET', usernameVariable: 'AZURE_CLIENT_ID')]) {
                            sh 'az login -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET'
                            sh 'terraform init'
                            sh 'terraform plan'
                            sh 'terraform apply --auto-approve'
                        }
                }
            }
        }
        
        

        stage('Deploy to Kubernetes - Backend') {
            steps {
                script {
                    withCredentials([azureServicePrincipal(credentialsId: 'azure_service_principal', passwordVariable: 'AZURE_CLIENT_SECRET', usernameVariable: 'AZURE_CLIENT_ID')]) {
                        //sh 'az aks install-cli'
                        sh 'az aks get-credentials --resource-group "devops_project_rg" --name "terraform-aks" --overwrite-existing'
                        sh 'kubectl apply -f backend-deployment.yaml'
                        sh 'kubectl apply -f backend-service.yaml'

                    }
                }
            }
        }
        
        stage('Deploy to Kubernetes - Frontend') {
            steps {
                script {
                    withCredentials([azureServicePrincipal(credentialsId: 'azure_service_principal', passwordVariable: 'AZURE_CLIENT_SECRET', usernameVariable: 'AZURE_CLIENT_ID')]) {
                        //sh 'az aks install-cli'
                        sh 'az aks get-credentials --resource-group "devops_project_rg" --name "terraform-aks" --overwrite-existing'
                        sh 'kubectl delete service frontend && kubectl delete deployment frontend'
                        sh 'kubectl apply -f frontend-deployment.yaml'
                        sh 'kubectl apply -f frontend-service.yaml'
                    }
                }
            }
        }
    }
}
