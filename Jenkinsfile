pipeline {
    agent any
    stages {
        stage('Build'){
            steps {            
                sh "yarn install"
                sh "yarn build"
            }
        }

        stage('TestingTools'){
            steps {            
                sh "yarn add jest jest-cli puppeteer faker"
            }
        }

        stage('HttpTests'){
            steps {            
                sh "pwd"
                sh "mkdir screenshots"
                sh "cd build"                
                sh "http-server -p 9000. > /dev/null 2>&1 &"
                sh "sleep 5"
                sh "curl -s -I http://localhost:9000/"
                sh "yarn test --detectOpenHandles"
                sh "echo done!!!"        
            }
        }

        stage('Package'){
            steps {            
                sh "pwd"
                sh "ls -la"
                sh "tar -czvf release.tar.gz -C build/ ."
            }
        }        
    }

    post {
        always {
            archiveArtifacts artifacts: 'release.tar.gz', fingerprint: true
            archiveArtifacts artifacts: './screenshots/*.png', fingerprint: true            
            publishHTML (target: [
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'output/coverage/jest',
                reportFiles: 'index.html',
                reportName: 'Test Report'
            ])
            cleanWs()
        }
    }    
}