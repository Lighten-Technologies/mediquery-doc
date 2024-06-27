---
outline: deep
---

# MediQuery API

MediQuery API 문서입니다.

## How to use

좌측에 있는 모듈별 매뉴에서 모듈 버전을 선택하신 후, 해당 모듈의 API 문서를 확인하실 수 있습니다.

TODO 테그가 붙은 문서는 아직 작성이 되지 않은 문서 입니다.

## MediQuery 구조

데이터베이스와 API 서버 그리고 클라이언트로 구성됨

데이터베이스는 mongoDB를 사용하며, API 서버는 Node.js(fastify)로 구성되어 있음

API 서버는 기존적으로 RESTful API를 따르며, 사용자는 개발 중에는 HTTP 요청, 학교로부터 도메인 및 https인증서를 부여 받은 이후로 부터는 https을 통해 데이터를 요청할 수 있음

## TODO List
