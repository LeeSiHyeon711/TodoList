# TODO 리스트 프로젝트
> **Spring Boot & React 기반의 할 일 관리 웹 앱**

> CRUD 기능과 검색, 우선순위 필터링을 지원합니다.

### 진행상황
- 2025-02-19 : USECASE, ERD 및 전체 프로젝트 구상
- 2025-02-20 : Spring boot 백엔드 API 1차 테스트 완료
- 2025-02-21 : React 프론트엔드 1차 구성 완료

## 주요 기능
- TODO 조회 / 추가 / 수정 / 삭제
- TODO 검색 기능 ( 키워드 검색 )
- TODO 우선 순위 설정 ( 중요도 필터링 )
- 생성 / 수정 시간 자동 기록

## 기술 스택
- Backend : Spring Boot, JPA, MySQL
- Frontend : React

## 실행 방법
- 현재 ddl옵션 : update
- MySQL 스키마 생성 ( todoapp )
- application.properties 파일에서 Data Base(JPA + MySQL settiing) 주석 부분 수정 후 실행 ( 사용자명, 비밀번호 등 )
- **백엔드 실행** : cd todoapp; ./gradlew bootRun;
- **프론트엔드 실행** : cd frontend; npm start;

## API 명세
- TODO 전체 목록 조회 : (GET) /api/todos
- 특정 TODO 조회 : (GET) /api/todos/{id}
- TODO 추가 : (POST) /api/todos
- TODO 수정 : (PUT) /api/todos/{id}
- TODO 삭제 : (DELETE) /api/todos/{id}

## POSTMAN 사용 시 입력 예시
**(POST) http://localhost:8080/api/todos**
```json
{
    "title":"MyTODO",
}
```
**(PUT) http://localhost:8080/api/todos/{id}**
```json
{
    "id":{id},
    "title":"Update TODO",
    "status":true,
    "mostImportant":true
}
```
