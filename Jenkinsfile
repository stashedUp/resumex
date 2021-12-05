#!/usr/bin/env groovy
import groovy.json.JsonOutput

def image_tag = "1.0.${env.BUILD_ID}"
def repoName = 'modules'
def groupName = 'resumex'
def docker_image = "resumexfeapp_app"
def docker_image_name = "resumexfeapp_app_1"
//nonprod image
def np_docker_image = "resumexfeapp_nonprodapp"

// we create two sets of images because we cannot dynamically change the backend urls during runtime
//prod 
def app_image_tag_name = "resumex-fe-image"
def image_name = 'quay.io/kepler/resumex-fe'
def app_image_name = 'quay.io/kepler/resumex-fe'

//nonprod
def np_app_image_tag_name = "resumex-fe-nonprd-image"
def np_image_name = 'quay.io/kepler/resumex-fe-nonprod'
def np_app_image_name = 'quay.io/kepler/resumex-fe-nonprod'


echo env.BRANCH_NAME 

node() {
  catchError {
    withCredentials([[$class: 'FileBinding', credentialsId: 'JENKINS_QUAY', variable: 'QUAY_CREDS']]) {
      currentBuild.displayName="${image_name}:${image_tag}"
      stage('Build') {
          properties([
            [$class: 'BuildDiscarderProperty', 
              strategy: [$class: 'LogRotator', artifactNumToKeepStr: '5',  numToKeepStr: '5']
            ],
            pipelineTriggers([
              [$class: "BitBucketTrigger"]//,
              //[$class: "SCMTrigger"]
            ])
          ]);
          // withEnv(["PATH+ACTIVATOR=${tool 'docker'}"]) {
          disableConcurrentBuilds()
          deleteDir()
          checkout([
          $class: 'GitSCM',
          branches: [[name: '*/release']],
          doGenerateSubmoduleConfigurations: false,
          //extensions: [[$class: 'CleanCheckout'], [$class: 'WipeWorkspace']],
          //extensions: [[$class: 'BitbucketPull']],
          submoduleCfg: [],
          poll: true,
          userRemoteConfigs: [[
            credentialsId: 'BITBUCKET_ADMIN',
            url: 'https://UmeshVeerasingam@bitbucket.org/keplersbox/resumex-fe.git'
          ]]])
	      sh """
        #!/bin/bash -l

        mkdir .docker
        cat ${QUAY_CREDS} > .docker/config.json

        # make sure old containers are gone
        /usr/local/bin/docker-compose -f docker-compose.yml down

         # build the system
        export APP_VERSION=${image_tag} ;/usr/local/bin/docker-compose -f docker-compose.yml build --no-cache
        """
        //}
      }

      stage('Test') {
	      sh """
        #!/bin/bash -l

        # start web app
        /usr/local/bin/docker-compose -f docker-compose.yml up -d app

        # validate web status healthy
        IS_HEALTHY=1

        for i in `seq 1 10`; do
          STATUS=`docker inspect --format='{{index .State.Health.Status}}' ${docker_image_name}`
          if [ \${STATUS} = "healthy" ]; then
            IS_HEALTHY=0
            break
          else
            sleep 5
          fi
        done

        if [ \${IS_HEALTHY} -eq 0 ]; then
          echo "Tests passed"
        else
          /usr/local/bin/docker-compose -f docker-compose.yml logs
        fi

        exit \${IS_HEALTHY}
      """
      }
      stage('Publish') {
	      sh """
        #!/bin/bash -l

        # tag image app [PROD IMAGE]
        docker tag ${docker_image} ${app_image_name}:${image_tag}
        docker tag ${docker_image} ${app_image_name}:latest

         # image push [PROD IMAGE]
        echo "image push [PROD IMAGE]"
        docker --config=.docker/ push ${app_image_name}:${image_tag}
        docker --config=.docker/ push ${app_image_name}:latest

        # tag image app [NONPROD IMAGE]
        docker tag ${np_docker_image} ${np_app_image_name}:${image_tag}
        docker tag ${np_docker_image} ${np_app_image_name}:latest

         # image push [NONPROD IMAGE]
         echo "image push [NONPROD IMAGE]"
        docker --config=.docker/ push ${np_app_image_name}:${image_tag}
        docker --config=.docker/ push ${np_app_image_name}:latest

        #stop docker container daemons
        /usr/local/bin/docker-compose -f docker-compose.yml down
        """
      }
      stage('Trigger RC Job') {
       
          build job: 'resumex/resumex-manifest',
          parameters: [ 
            string(name: 'MANIFEST_TYPE', value: "container"),
            string(name: 'MANIFEST_KEY', value: "${np_app_image_tag_name}"),
            string(name: 'MANIFEST_VALUE', value: "${np_app_image_name}:${image_tag}")
          ], 
          wait: true

          build job: 'resumex/resumex-manifest',
          parameters: [ 
            string(name: 'MANIFEST_TYPE', value: "container"),
            string(name: 'MANIFEST_KEY', value: "${app_image_tag_name}"),
            string(name: 'MANIFEST_VALUE', value: "${app_image_name}:${image_tag}")
          ], 
          wait: false
      }
    }
  }
}
