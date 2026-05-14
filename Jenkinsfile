pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = "malinda699" 
        APP_NAME = "attendance-system"
        DOCKER_HUB_CREDS = 'docker-hub-credentials'
    }

    stages {
        stage('Checkout') {
            steps {  
                checkout scm
            }
        }

        // --- BACKEND STAGES ---
        stage('Build Backend') {
            steps {
                script {
                    echo "--- Building Backend Image ---"
                    sh "docker build -t ${DOCKER_HUB_USER}/${APP_NAME}-backend:latest ./backend"
                }
            }
        }

        stage('Push Backend to Docker Hub') {
            steps {
                script {
                    echo "--- Pushing Backend to Docker Hub ---"
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}", passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                        sh "docker push ${DOCKER_HUB_USER}/${APP_NAME}-backend:latest"
                    }
                }
            }
        }

        // --- FRONTEND STAGES ---
        stage('Build Frontend') {
            steps {
                script {
                    echo "--- Building Frontend Image ---"
                    sh "docker build -t ${DOCKER_HUB_USER}/${APP_NAME}-frontend:latest ./frontend"
                }
            }
        }

        stage('Push Frontend to Docker Hub') {
            steps {
                script {
                    echo "--- Pushing Frontend to Docker Hub ---"
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}", passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        sh "docker push ${DOCKER_HUB_USER}/${APP_NAME}-frontend:latest"
                    }
                }
            }
        }

        // --- DEPLOYMENT STAGE ---
        stage('Deploy to EC2') {
            steps {
                script {
                    echo "--- Deploying Both Services to EC2 ---"
                    sh "docker-compose down || true"
                    sh "docker-compose pull"
                    sh "docker-compose up -d"
                }
            }
        }
    }

    post {
        success {
            echo "Successfully built and deployed both Backend and Frontend!"
        }
        failure {
            echo "Pipeline failed. Check the logs for errors."
        }
    }
}