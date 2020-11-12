---
title: gatsby로 제작한 블로그 배포하기 (2) 
---

### 1. 배경 

(1)에서는 레포를 로컬로 받아서 배포하는데까지였고
BIR, TIL레포의 변경에 맞춰 자동으로 블로그가 배포되도록 하는 방법을 찾다가
깃헙 액션을 사용하게 되었다.

깃헙 액션에서는 자신이 속한 레포지토리에 push등의 이벤트를 감시하다가
발생할 경우 다른 레포지토리에 액션을 트리거링하도록 할 수 있다. 

이와 관련한 깊은 이해는 없는 듯하지만 일단 시도는 성공했기 때문에 
진행하며 배운것을 정리해 보았다. 

> - github action 
> - github 권한 관리 
> - 다른 레포지토리로 액션을 트리거하기   

### 2. github action 

깃헙 액션은 깃헙에서 제공해주는 CI/CD도구이다.  
깃헙 액션에 대한 자세한 사항은 여기 블로그 글을 참고하면 좋을 것 같다. 
기본적으로 용어들이 workflow 나 action등등이 CI와 관련한 용어들인거 같고, 이 부분은
역시 이쪽에 관심이 많은 분이 작성해주신 글이 훨씬 좋을 것이다.  
[Github Action 빠르게 시작하기](https://jonnung.dev/devops/2020/01/31/github_action_getting_started/)  
  
어쨋건 내가 이해한 단순버젼으로 설명하고 넘어가자면, 
내가 관심이 있는 이벤트에 workflow를 실행하도록 할 수 있고 
workflow는 깃헙에서 미니 서버 인스턴스를 생성하고 세팅해줘서 실행이 된다. 
workflow는 여러개의 action으로 구성이 된다. action은 직접 만들거나 github마켓 플레이스에서
가져다 쓸 수 있는데 
  
내가 이번 작업을 하면서 가져다 쓴 action들은 다음과 같다.  
  
- webfactory/ssh-agent@v0.2.0
- actions/checkout@v2.3.1
- JamesIves/github-pages-deploy-action@3.5.7  
  
이름에서 알 수 있듯이 각 액션들은 ssh를 설정하고,
깃헙에서 코드를 체크아웃하고, github-page에 디폴로이 하는 액션을 수행하는 일을 한다.
이런 기능들을 하나하나 직접 개발해야 되지 않아서 다행이다.  


그래서 devlog 레포에 달아놓은 workflow는 다음과 같다. 

```shell
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the master branch
on:
  push:
    branches: [ deploy ]  
  repository_dispatch:
    types:
      - deploy

jobs:
# A workflow run is made up of one or more jobs that can run sequentially or in parallel
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Install SSH Client 🔑
        uses: webfactory/ssh-agent@v0.2.0
        with:
              ssh-private-key: ${{ secrets.DEPLOY_GATSBY_SECRET }}

      - name: Checkout 🛎️
        uses: actions/checkout@v2.3.1 # If you're using actions/checkout@v2 you must set persist-credentials to false in most cases for the deployment to work correctly.
        with:
          persist-credentials: false

      - name: Install and Build 🔧 # This example project is built using npm and outputs the result to the 'build' folder. Replace with the commands required to build your project, or remove this step entirely if your site is pre-built.
        run: |
          npm install
          npm run build
      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@3.5.7
        with:
          SSH: true
          REPOSITORY_NAME : devcheolheon/devcheolheon.github.io 
          BRANCH: master # The branch the action should deploy to.
          FOLDER: public # The folder the action should deploy.
```  
  
on 밑에 부분에서 deploy 브랜치에 push와 deploy라는 액션을 기다리고 있다는 것을 알 수 있다. 
또한 ssh의 private key를 설정해주고 있는데 이는 devcheolheon.github.io 이 레포지토리에 
push를 해줄 수 있는 권한을 가진 키다. 

### 2. github 권한관리  

github에서 배경에서 설명한 것과 같은 일을 하기 위해서는 코드보다 github에서의 어떤 
권한을 관리하는 방법에 대해서 좀 알아야 할 필요가 있었다.  

- 특정 레포에 push하는 권한 

github-page에서 빌드된 코드를 레포에 올리기위해서 특정 레포에 push해야 하는데 
이때 특정 레포에 대한 deploy 권한이 있어야 한다. 

deploy 권한은 특정 레포에 Deploy key를 세팅함으로서 부여할 수 있다. 
특정 레포에 Settings > Deploy key에 내가 생성한 ssh key의 public key를 더해놓는다면
해당 public key에 대응하는 private key를 지닌 사용자가 deploy할 수 있다.  
[ deploy키 관련한 github 매뉴얼 ](https://developer.github.com/v3/guides/managing-deploy-keys/)  

위에서 devlog 레포의 workflow는 devcheolheon.github.io라는 레포에 배포를 하려고 시도한다. 
devcheolheon.github.io레포의 deploy key에 내 public key가 있어야 하고 
배포를 시도한 devlog 레포의 workflow는 그에 대응되는 private key가 있어야 한다. 


```shell
              ssh-private-key: ${{ secrets.DEPLOY_GATSBY_SECRET }}
```

workflow에서 ssh를 설정하는 부분에 다음과 같이 미리 설정해놓은 private key를 가져오는 코드가 있다.
private key를 workflow에서 활용하기 위해 secrets라는 깃헙의 세팅을 활용할 수 있다.  
이것은 workflow를 실행한 devlog 레포에 설정해 주어야 한다.  
[ secrets 변수 세팅과 관련한 github 매뉴얼 ](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets)  


### 3. 다른 레포지토리로 액션을 트리거하기 

workflow는 다른 레포지토리에서 어떤 액션이 발생하게 끔 할 수 있다. 

```shell
  repository_dispatch:
    types:
      - deploy
```

위의 워크플로우에서 이 부분인데 다른 레포지토리에서 'deploy'라는 액션을 현재 레포로 
디스패치할 수 있다. 

다른 레포지토리에서 'deploy' 액션을 현재 레포로 디스패치하는 부분은 다음과 같다. 

```shell
    name: CI

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the master branch
on:
  push:
    branches: [ deploy ]
 
# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build-gatsby-blog:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
    # Runs a single command using the runners shell
    - name: dispatch to deploy
      run: |
        curl -XPOST -u "${{ secrets.PAT_USERNAME}}:${{secrets.PAT_TOKEN}}" -H "Accept: application/vnd.github.everest-preview+json" -H "Content-Type: application/json" https://api.github.com/repos/devcheolheon/devlog/dispatches --data '{"event_type": "deploy"}'


```    
[ 깃헙에서 Personal access tokens를 설정하기 ](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)
을 참고했다.  

디스패치를 하기 위해서는 Personal access tokens가 필요하다  

```shell
    curl -XPOST -u "${{ secrets.PAT_USERNAME}}:${{secrets.PAT_TOKEN}}" 
``` 
이 부분에서 username 은 깃헙 계정으로 그리고 token에는 Personal access tokens를 생성해서 
사용해야 한다. 

[ 깃헙에서 Personal access tokens를 설정하기 ](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)  

이것을 매뉴얼대로 그대로 따라하면 된다.  


### 출처

- [ 깃헙 액션으로 다른 레포지토리에 액션 트리거링하기 ](https://github.community/t/triggering-by-other-repository/16163)
- [ deploy키 관련한 github 매뉴얼 ](https://developer.github.com/v3/guides/managing-deploy-keys/)
- [ secrets 변수 세팅과 관련한 github 매뉴얼 ](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets)
- [ 깃헙에서 Personal access tokens를 설정하기 ](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)  