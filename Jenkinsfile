pipeline {
    environment {
        RELEASE_NAME = "release.${BUILD_ID}.tar.gz"
    }

    agent {
        node {
            label 'agent1'
        }
    }

    options {
        // Only keep the 10 most recent builds
        buildDiscarder(logRotator(numToKeepStr:'10'))
    }

    stages {        
        stage('Build'){
            steps {            
                sh "yarn install"
                sh "yarn build"
            }
        }

        stage('Test'){
            steps {            
                sh "pwd"
                sh "cd build"
                sh "ls -la"                
                sh "http-server -p 9000 . > /dev/null 2>&1 &"
                sh "sleep 5"
                sh "curl -I http://localhost:9000/index.html"
                sh "yarn test --detectOpenHandles"
                sh "echo done!!!"        
            }

            post {
                success {
                    // publish html
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'output/coverage/jest',
                        reportFiles: 'index.html',
                        reportName: 'Test Report'
                    ]
                }
            }            
        }

        stage('Package'){
            steps {                
                sh "pwd"
                sh "ls -la"
                sh "tar -czvf ${RELEASE_NAME} -C build/ ."
            }

            post {
                success {
                    // Archive the built artifacts
                    archiveArtifacts artifacts: "${RELEASE_NAME}", fingerprint: true
                }
            }            
        }        
    }

    post {
        always {
            echo "Build completed!!"
        }
    }    
}
