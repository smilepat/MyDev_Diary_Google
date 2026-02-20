# 2026-02-20 작업 일지: 디스크 정리 및 폴더 구조화

## 작업 요약
- C: 드라이브 정리 및 공간 확보
- Downloads 폴더를 D: 드라이브로 이동
- D: 드라이브 폴더 구조화 및 중복 파일 정리

## 상세 내용

### 1. C: 드라이브 정리
- **초기 상태**: ~30 GB 여유 공간 (223 GB 중)
- **임시 파일 정리**: Temp, Chrome Cache, Internet Cache 삭제
- **휴지통 비우기**: 약 4.7 GB 확보
- **총 확보**: 5.6 GB → 35.4 GB 여유

### 2. Downloads 폴더 이동
- **이전 위치**: C:\Users\user\Downloads
- **새 위치**: D:\Downloads
- **이동된 파일**: 109개 (5.4 GB)
- **레지스트리 업데이트**: Shell Folders 경로 변경
- **결과**: C: 드라이브 추가 공간 확보 (~39 GB 여유)

### 3. Windows 디스크 정리 도구 실행
- cleanmgr /d C: 실행
- 시스템 파일 정리 안내

### 4. Dropbox 설정
- Dropbox 앱 설치 페이지 안내
- D:\Dropbox 폴더로 동기화 설정
- 현재 상태: 실행 중, 5116개 파일 동기화됨

### 5. D: 드라이브 폴더 정리
#### Old 폴더로 이동 (2022년 이전 파일)
- **이동된 폴더**: 12개 (7.9 GB)
  - Corpus-Vocabulary (4.9 GB)
  - HTML5 SMARTree Workbook (2.0 GB)
  - For태블릿컨텐츠, Kiddie English, KNU논문 등
- **폴더 수 감소**: 58개 → 47개

#### 중복 파일 정리 (동영상)
- **검사 방법**: MD5 해시 비교 (1MB 이상 파일)
- **발견된 중복**: 2,988개 세트 (7.51 GB 절약 가능)
- **삭제된 파일**: 28개 동영상 파일
- **확보된 공간**: 3.88 GB

### 6. D: 드라이브 카테고리 분석
제안된 카테고리 구조:
| 카테고리 | 설명 |
|----------|------|
| Projects | 개발 프로젝트 (git, 코드) |
| Cloud | Dropbox, mydrive, Downloads |
| Education | 교육자료, 코퍼스, DB |
| Documents | 업무문서, 발표자료 |
| Programs | Program Files (유지) |
| Old | 오래된/미사용 파일 |

## 결과
- **C: 드라이브**: 30 GB → 39 GB 여유 공간
- **D: 드라이브**: 58개 → 47개 폴더, 3.88 GB 중복 제거
- **구조화**: Old 폴더 생성, 카테고리 분석 완료

## 사용된 스크립트
- `C:\temp\check_disk.ps1` - 디스크 용량 확인
- `C:\temp\clean_temp.ps1` - 임시 파일 정리
- `C:\temp\move_downloads.ps1` - Downloads 폴더 이동
- `C:\temp\move_to_old.ps1` - Old 폴더로 이동
- `C:\temp\find_duplicates.ps1` - 중복 파일 검색
- `C:\temp\analyze_categories.ps1` - 폴더 카테고리 분석

## 다음 할 일
- [ ] D: 드라이브 카테고리 폴더 생성 및 정리
- [ ] 문서 중복 파일 정리 (.pdf, .pptx 등)
- [ ] 1 AA NOTEBOOK 폴더 (105 GB) 별도 정리
- [ ] mydrive와 Dropbox 중복 파일 확인
