pipeline {
    agent any

    environment {
        NODEJS_HOME = "${tool 'NodeJS'}" // Ensure NodeJS is configured in Jenkins
        APP_DIR = '/var/www/mave-cms'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    credentialsId: 'github-token',
                    url: 'https://github.com/atiqisrak/mave-cms.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        // stage('Run Tests') {
        //     steps {
        //         sh 'npm test'
        //     }
        // }

        stage('Deploy') {
            steps {
                sshagent(['ssh-deploy-key']) {
                    sh """
                        ssh atiqisrak@167.71.201.117 'cd ${APP_DIR} && git pull origin master && npm install && npm run build && pm2 reload all'
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Congratulations Atiq Israk! Mave CMS has been deployed Successfully!'
        }
        failure {
            echo 'Oops!!! Deployment Failed! Let us try again.'
        }
    }
}
