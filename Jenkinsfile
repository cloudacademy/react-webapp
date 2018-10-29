def CONTAINER_NAME="jenkins-pipeline"
def CONTAINER_TAG="latest"
def DOCKER_HUB_USER="hakdogan"
def HTTP_PORT="8090"

node {

    stage('Checkout') {
        checkout scm
    }

    stage('Install'){
        sh "yarn install"
    }

    stage('Build'){
        sh "yarn install"
        sh "yarn build"
    }

    stage('TestingTools'){
        sh "yarn add jest jest-cli puppeteer faker"
    }

    stage('HttpServer'){
        sh '''
            cd build
            http-server -p 9000. > /dev/null 2>&1 &
        '''
    }

    stage('Tests'){
        sh "curl -I http://localhost:9000/"
        sh "yarn test --detectOpenHandles"
        sh "echo done!!!"
    }
    
}

def imagePrune(containerName){
    try {
        sh "docker image prune -f"
        sh "docker stop $containerName"
    } catch(error){}
}

def imageBuild(containerName, tag){
    sh "docker build -t $containerName:$tag  -t $containerName --pull --no-cache ."
    echo "Image build complete"
}

def pushToImage(containerName, tag, dockerUser, dockerPassword){
    sh "docker login -u $dockerUser -p $dockerPassword"
    sh "docker tag $containerName:$tag $dockerUser/$containerName:$tag"
    sh "docker push $dockerUser/$containerName:$tag"
    echo "Image push complete"
}

def runApp(containerName, tag, dockerHubUser, httpPort){
    sh "docker pull $dockerHubUser/$containerName"
    sh "docker run -d --rm -p $httpPort:$httpPort --name $containerName $dockerHubUser/$containerName:$tag"
    echo "Application started on port: ${httpPort} (http)"
}