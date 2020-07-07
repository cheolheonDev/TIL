---
title: gatsby로 제작한 블로그 배포하기 
---

## 목차 
1. 배경
2. 깃헙에 비밀번호 없이 접속하기 (ssh 사용법) 
3. 다른 레포에 github page 배포하기 

### 1. 배경 
gatsby로 깨작깨작 열심히 개발블로그를 만들었고 
이를 깃헙 페이지로 배포하려고 하는 중이었다. 

생각없이 블로그를 그대로 따라서 배포했더니 
현제 래포의 마스터 브랜치를 배포용 파일들이 덮어버리는 일이 일어나고 말았다. 
(gh-page의 기본작동이 그런것이었다..)

소스 관리와 배포용 레포를 분리하고 싶어서 방법을 찾다가 관련해서 
배우게 된 내용들을 정리해 보았다. 

> - 깃헙에 비밀번호 없이 접속하기 위한 ssh사용법
> - 다른 레포에 배포하도록 하는 gh-pages의 옵션 

### 2. 깃헙에 비밀번호 없이 접속하기 (SSH 사용법)

맥의 경우 기본적으로 ssh key파일들은 아래 디렉터리에 저장되어 있다. 

> ```shell
> ~/.ssh
>```
  
다음 명령어로 key를 생성하는데 이메일은 깃계정에 등록된 이메일로 하자 

key의 비밀번호를 또설정할 수 있게 되어 있는데 없이 하는것이 편하다.  

> ```shell
>    ssh-keygen -t rsa -b 4096 -C "my-email@example.com"
>```   

생성된 파일중에서 .pub로 끝나는 파일의 값을 
git > profile > settings > ssh and gps keys 메뉴에서 
설정해 준다. (값 내용을 복사해서 넣게끔 되어있다.)
 
실수로 ssh key를 생성할때 비밀번호를 등록해주었다면 다음 명령어로 없애줄 수 있다.
> ```shell
>  ssh-keygen -p
> ```

ssh key가 있어도 안되는 경우, 
내 경우에는 SSH-AGENT에 키를 등록하니 해결이 되었다. 
  
> ssh-agent 의 동작 확인
> ```shell
> eval "$(ssh-agent -s)"
> ```

>  ssh-agent 에 key 등록하기 
> ```shell
> ssh-add ~/.ssh/id_rsa
> ```
 

출처 1  -  [ssh 생성 및 github 저장소 저장하기 - JOOTC 블로그 ](https://jootc.com/p/201905122827)

출처 2 - [Git (7) Github 비밀번호 입력 없이 pull/push 하기(github ssh key 설정)](https://goddaehee.tistory.com/254)


### 3. 다른 레포에 github page 배포하기 


#### 요약
>

배포할때 개인 사이트 또는 특정 레포의 프로젝트 사이트 두 종류를 다른 방법으로 하게 된다. 

개인 사이트는 [사용자명].github.io 로 레포를 만들어야 되고 
package.json에 다음처럼 명령어를 입력해준다. 

> ```shell
>"scripts": { 
>    "deploy": "gatsby build && gh-pages -d public -b master"
>}
> ```

만약, 소스레포와 배포레포가 다르다면
다음 부분에서 계정부분만 잘 변경해서 package.json을 작성해주면 된다. 
이걸 그대로 실행하기 위해서 ssh설정을 잘 해줄 필요가 있다. 

> ```shell
>{
>    "scripts": {
>        "deploy": "gatsby build && gh-pages -d public -r git@github.com:soharu/soharu.github.io.git -b master"
>  }
>}
> ```

배포 끝..

출처 1. [GatsbyJS 개발 환경 셋팅부터 GitHub Pages 배포까지 (musma 블로그)](https://musma.github.io/2019/08/09/gatsby-js.html)

(배포하려고 할때 시작점이 되어준 고마운 블로그)

출처 2. [Github Pages로 블로그 배포하기](https://soharu.github.io/posts/2019-09-18-Deploying-to-GitHub-Pages/)

(어쩌다가 배포 레포와 소스 레포를 분리하신 분이고 딱 내가 필요한 과정을 
그대로 진행한 블로그)
