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

        stage('lint') {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs') {
                    sh 'npm run lint'
                }
            }
        }

        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs') {
                    sh 'npm run build:ping-ui'
                    sh 'npm run build-storybook'
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
        stage('Deploy Storybook') {
            steps{
                nodejs(nodeJSInstallationName: 'nodejs') {
                    script {
                        SERVER = 'pinglink-ui.keyssoft.xyz';
                        TMP_DEST = '/app/tmp/pinglink-ui'
                        DEST = '/app/pinglink-ui'
                        FUNCTIONAL_USER = 'dsp_adm'

                        env.LATEST_VERSION = sh(script: "git describe --tags --abbrev=0", returnStdout: true).trim()
                    }
                    withCredentials([usernamePassword(credentialsId: 'pinglink-deployer', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
                        sh "sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@${SERVER} sudo rm -rf ${TMP_DEST}"
                        sh "sshpass -p '${PASSWORD}' scp -o StrictHostKeyChecking=no  -r ./storybook-static ${USERNAME}@${SERVER}:${TMP_DEST}"
                        sh "sshpass -p '${PASSWORD}' scp -o StrictHostKeyChecking=no scripts/deploy_docs.sh ${USERNAME}@${SERVER}:/tmp/deploy_doc_${BUILD_NUMBER}.sh"
                        sh "sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@${SERVER} sudo chmod +x /tmp/deploy_doc_${BUILD_NUMBER}.sh"
                        sh "sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@${SERVER} sudo /tmp/deploy_doc_${BUILD_NUMBER}.sh ${TMP_DEST} ${DEST} ${env.LATEST_VERSION} ${FUNCTIONAL_USER}"
                        sh "sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@${SERVER} sudo rm /tmp/deploy_doc_${BUILD_NUMBER}.sh"
                    }
                }
            }
        }
        stage('Deploy server') {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs') {
                    withCredentials([usernamePassword(credentialsId: 'pinglink-deployer', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
                        sh "sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@pinglink-ui.keyssoft.xyz rm -rf pinglink-server"
                        sh "sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@pinglink-ui.keyssoft.xyz git clone https://github.com/JoshuaKeys/pinglink-server.git"
                        sh "sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@pinglink-ui.keyssoft.xyz which node && node -v && which pm2 && ls -ltr /usr/bin  && cd pinglink-server && npm install"
                        // sh "sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@pinglink-ui.keyssoft.xyz pm2 start pinglink-server/index.js"
                    }
                }

            }
        }
    }
}