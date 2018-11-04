#!groovy

@Library("building-blocks") _
import com.usabilla.docker.DockerContainer

env.OVERRIDE_SLACK_CHANNEL = "#dev-deploy"

def helmImage = "644152709166.dkr.ecr.eu-west-1.amazonaws.com/infra/helm"
def analysisAppDockerRepository = "644152709166.dkr.ecr.eu-west-1.amazonaws.com/usabilla/analysis-app"
def analysisAppTaggedDockerImage = null
def stagingBucket = "usabilla-static-assets-staging/analysis-app"
def productionBucket = "usabilla-static-assets-production/analysis-app"
def assetsUrlStaging = "https://static-staging.usabilla.com/analysis-app"
def assetsUrlProduction = "https://static.usabilla.com/analysis-app"

usabillaBuild {
  node {
    stage("checkout") {
      checkout scm

      sh "git clean -df"
      stash includes: "helm/analysis-app/**", name: "helm-chart"
    }

    stage("configure") {
      analysisAppTaggedDockerImage = "${analysisAppDockerRepository}:${BUILD_NUMBER}"
    }

    stage("test") {
      def testContainer = new DockerContainer("jenkins", "yarn/runner-node8")

      testContainer.run {
        withCredentials([string(credentialsId: "npm_token", variable: "NPM_TOKEN")]) {
          sh "echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' >> .npmrc"
          sh "yarn install"
        }

        sh "yarn lint"
        sh "CI=true yarn test"
      }
    }

    stage("build") {
      def container = new DockerContainer("jenkins", "yarn/runner-node8")

      container.run {
        withCredentials([string(credentialsId: "npm_token", variable: "NPM_TOKEN")]) {
          sh "rm -rf node_modules"
          sh "echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' >> .npmrc"
          sh "yarn install"
        }

        sh "yarn build"
      }
    }

    stage("build and push image") {
      sh "docker build -t ${analysisAppTaggedDockerImage} ."
      sh "docker push ${analysisAppTaggedDockerImage}"
    }

    stage("package chart") {
      dir("helm/analysis-app") {
        def helmContainer = new DockerContainer(null, "${helmImage}")

        helmContainer.env("AWS_REGION", "eu-west-1").run {
          // add the usabilla private helm repo
          sh "helm repo add usabilla s3://usabilla-helm-repo"
          sh "helm lint"
          sh "mkdir -p dist/${BUILD_NUMBER}"
          sh "helm package . --destination dist/${BUILD_NUMBER} --version ${BUILD_NUMBER}"
          sh "helm s3 push dist/${BUILD_NUMBER}/*.tgz usabilla"
          sh "helm s3 reindex usabilla"
          sh "rm -rf dist/"
        }
      }
    }

    stage("deploy staging") {
      def version = sh(returnStdout: true, script: "git describe --tags").trim()

      uploadSourceMaps(version, assetsUrlStaging)
      uploadStaticFiles(stagingBucket)

      deployChart("staging", version, assetsUrlStaging)
    }
  }

  stage("deploy production") {
    milestone 1
    input "Deployed to staging, promote to production?"
    milestone 2

    node {
      def version = sh(returnStdout: true, script: "git describe --tags").trim()
      def newVersion = getNewVersion(version)
      if (!newVersion) {
        error "could not determine new version number: ${version}"
      }
      def changelog = sh(returnStdout: true, script: "git log --no-merges --pretty=\"* %ad - %s [%h]\" --date=short `git describe --tags --abbrev=0`..HEAD")
      sh "git tag -a ${newVersion} -m '${newVersion}\n\n\n${changelog}'"

      uploadSourceMaps(newVersion, assetsUrlProduction)
      uploadStaticFiles(productionBucket)

      deployChart("production", newVersion, assetsUrlProduction)

      sshagent(['746a93b3-11be-4c81-8f44-c2c33b9fe0ef']) {
        sh "git push --tags"
      }
    }
  }
}

def uploadSourceMaps(release, assetsUrl) {
  withCredentials([string(credentialsId: "sentry_token", variable: "SENTRY_AUTH_TOKEN")]) {
    sh "./scripts/upload-source-maps.sh ${release} ${assetsUrl}"
  }
}

def uploadStaticFiles(bucket) {
  sh "./scripts/upload-static-files.sh ${bucket}"
}

def deployChart(environment, version, assetsUrl) {
  unstash "helm-chart"

  echo "Deploying version ${version} to ${environment}"

  dir("helm/analysis-app") {
    def ubopsContainer = new DockerContainer("jenkins", "ubops/runner")

    ubopsContainer.run {
      withCredentials([usernamePassword(
        credentialsId: "ops-jenkins-credentials",
        passwordVariable: "JENKINS_TOKEN",
        usernameVariable: "JENKINS_USER"
      )]) {
        sh "ubops deploy ${environment} --values values-${environment}.yaml usabilla/analysis-app analysis-app --version ${BUILD_NUMBER} --set env.config.RELEASE=${version},image.tag=${BUILD_NUMBER},assetsUrl=${assetsUrl}"
      }
    }
  }

  echo "Version ${version} deployed to ${environment}"
}

@NonCPS
def getNewVersion(oldVersion) {
  def versionMatch = (oldVersion =~ /^[v|r](\d+)/)
  if (!versionMatch) {
    return null
  }
  def newVersionNumber = Integer.parseInt(versionMatch[0][1]) + 1
  def newVersion = "r${newVersionNumber}"
}
