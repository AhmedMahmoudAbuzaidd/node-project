pipeline {
    agent any
    stages {
        stage('preparation') {
            steps {
                git branch: 'main', url: 'https://github.com/AhmedMahmoudAbuzaidd/node-project.git'
            }
        }
        stage('CI') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                    sh '''
                    docker build . -t engahmedabuzaid/node:V1
                    echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USERNAME --password-stdin
                    docker push engahmedabuzaid/node:V1
                    '''
                }
            }
        }
        stage('CD') {
            steps {
                sh '''
                docker run -d --name redis redis
                docker run -d -p 9090:8080 --name node --link redis:redis engahmedabuzaid/node:V1
                '''
            }
        }
    }
}
