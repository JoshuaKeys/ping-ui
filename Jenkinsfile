pipeline {
    agent any

    environment {
        GIT_AUTHOR_NAME = 'Joshua Avwerosuoghene Oguma'
        GIT_AUTHOR_EMAIL = 'joshua.oguma@outlook.com'
        NPM_TOKEN = credentials('NPM_TOKEN')
        GH_TOKEN = credentials('GH_TOKEN')
    }

    triggers{
        pollSCM('*/1 * * * *')
    }

    stages {
        stage('Install Deps') {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs') {
                    sh 'npm run build:ping-ui'
                }
            }
        }
        
        stage('Publish NPM Library') {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs') {
                    sh 'npm run semantic-release'
                }
            }
        }
    }
}