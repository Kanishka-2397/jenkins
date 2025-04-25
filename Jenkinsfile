pipeline {
    agent any

    environment {
        IMAGE_NAME = 'kanishka9723/myapp1'
        IMAGE_TAG = 'latest'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/kanishka9723/project.git'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% ."
                }
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    bat '''
                        echo %PASSWORD% | docker login -u %USERNAME% --password-stdin
                        docker push %IMAGE_NAME%:%IMAGE_TAG%
                    '''
                }
            }
        }

        stage('Update Image in YAML & Deploy to Minikube') {
            steps {
                script {
                    bat """
                        powershell -Command "(Get-Content k8s\\deployment.yaml) -replace 'kanishka9723/myapp1:.*', '${IMAGE_NAME}:${IMAGE_TAG}' | Set-Content k8s\\deployment.yaml"
                        kubectl apply -f k8s\\deployment.yaml
                        kubectl apply -f k8s\\service.yaml
                        kubectl apply -f k8s\\mysql-deploy.yaml
                        kubectl apply -f k8s\\mysql-service.yaml
                        kubectl apply -f k8s\\mysql-client.yaml
                        kubectl apply -f k8s\\node-deploy.yaml
                        kubectl apply -f k8s\\node-service.yaml
                        kubectl rollout status deployment/your-deployment-name
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment to Minikube successful!'
        }
        failure {
            echo '❌ Deployment failed. Please check the logs.'
        }
    }
}
