# 📒 승구몬의 카카오페이지 클론 코딩 !

## 📖개요
제가 즐겨 사용하는 카카오페이지를 제 방식으로 만들어보았습니다.<br />
유저단의 핵심기능과 , 관리자쪽은 이렇게 만들지 않았을까 ? 생각하면서 만들어보았습니다.<br />
회원가입할때 Novel , Cartoonist로 회원가입시 직접 소설과 , 웹툰을 올려볼 수도 있습니다!<br />
##🧸 어떤 권한이든 회원 가입시 10코인이 지급됩니다 !<br />
##💻 모든 페이지들은 반응형 웹으로 만들어졌습니다.<br />

## 📖Why NextJs?
카카오페이지같은 IT유통회사(?) 같은경우는 검색 및 마케팅 관련이 중요하다고 생각을 하였습니다.<br />
React보다 비교적 SEO 최적화가 쉽고 SSR쪽도 리액트보다 쉽게 구현가능 하기 때문에 선택하였습니다.<br />



## 💾 Backend
[SeokKao-Page Backend 소스코드](../../../seokkao-page-backend)



## 🔗Front End 링크
https://seokkao-page-frontend.vercel.app/

## 💻Stack
- [X] Typescript
- [X] Next.js
- [X] GraphQL (Apollo Client)
- [X] NextSeo
- [X] Tailwind Css


### ⚛️ NextJS 관련 라이브러리
- [X] NextSeo
- [X] HTMLFlip
- [X] html2Canvas
- [X] React Hook Form
- [X] React DatePicker
- [X] React FontAwesome
- [X] React Chart-2
- [X] React-LazyLoad
...

<hr />
<br />

## 💡 주요 기능
각 유저마다 할 수 있는 권한이 나눠짐
- 🙍 User - 석카오페이지의 작품만 볼 수 있음
- ✏️ Novelist - 석카오페이지에서 소설을 쓸 수 있음
- 🎨 Cartoonist - 석카오페이지에서 웹툰을 올릴 수 있음


### 에피소드 작성후 열람까지(Novel)

   ![order](https://user-images.githubusercontent.com/64651532/142642991-44439e2a-8ff1-49d1-b221-5199a1fbb75b.gif)
   
   
### 모바일버전 (Iphone 6,7,8)
   
   ![order](https://user-images.githubusercontent.com/64651532/142642928-f87db297-0248-443b-a0c8-f465211b2959.gif)


### 공통
- 로그인 / 로그아웃
- 회원 가입
- 작품 구매
- 프로필 업데이트 


### Novelist
- 내가 올린 시리즈의 통계보드
- 에피소드 및 시리즈 생성
- 내가 올린 시리즈 프로필 설정
- Novelist 전용 페이지에서 소설 작성가능

### Cartoonist
- 내가 올린 시리즈의 통계보드
- 에피소드 및 시리즈 생성
- 내가 올린 시리즈 프로필 설정
- Cartoonist 전용 페이지에서 소설 작성가능
<hr />

## 발전 가능한 기능
강의와 개인적으로 추가한 기능 외의 발전 가능한 기능들 목록입니다.<br />


<ul>
   <li>해당 시리즈의 댓글달기</li>
   <li>내가 자주보는 시리즈 즐겨찾기</li>
   <li>이미지의 순서를 드래그 하여 옮길 수 있게 하기</li>
   <li>해당 시리즈의 공지사항</li>
</ul>