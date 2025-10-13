# A/B 테스트 시나리오 문서

## 프로젝트 개요
본 웹 애플리케이션은 설문조사 플랫폼으로, 사용자가 이미지 데이터에 대한 평가를 진행하고 통계를 확인할 수 있는 시스템입니다.

### 핵심 기능
- 사용자 인증 (로그인/회원가입)
- 설문조사 참여 시스템
- 데이터 평가 및 진행률 추적
- 실시간 랭킹 시스템
- 차트 및 통계 분석
- 관리자 기능

---

## A/B 테스트 시나리오

### 1. 로그인 페이지 최적화

#### 테스트 목표
로그인 전환율 개선 및 사용자 경험 향상

#### 가설
- **A안 (현재)**: 기본적인 로그인 폼
- **B안**: 소셜 로그인 옵션 추가 + 개선된 UX

#### 성공 지표
- 로그인 완료율
- 회원가입 전환율
- 페이지 이탈률
- 첫 로그인까지 소요 시간

#### 테스트 설계
```javascript
// 현재 버전 (Control - A)
<Form onSubmit={this.handleSubmit}>
  <Input type="text" name="email" placeholder="아이디를 입력해주세요." />
  <Input type="password" name="password" placeholder="비밀번호를 입력해주세요." />
  <Button type="submit">시작하기</Button>
</Form>

// 개선 버전 (Variant - B)
<Form onSubmit={this.handleSubmit}>
  <SocialLoginContainer>
    <GoogleLoginButton>Google로 시작하기</GoogleLoginButton>
    <KakaoLoginButton>카카오로 시작하기</KakaoLoginButton>
  </SocialLoginContainer>
  <Divider>또는</Divider>
  <Input type="text" name="email" placeholder="이메일 또는 아이디" />
  <Input type="password" name="password" placeholder="비밀번호" />
  <RememberMeCheckbox>로그인 상태 유지</RememberMeCheckbox>
  <Button type="submit">로그인</Button>
</Form>
```

#### 구현 방법
1. React Feature Flag를 사용한 트래픽 분할 (50:50)
2. Google Analytics와 연동하여 이벤트 추적
3. 2주간 테스트 진행

---

### 2. 설문조사 카드 디자인

#### 테스트 목표
설문조사 참여율 증대 및 클릭률 향상

#### 가설
- **A안 (현재)**: 수평형 카드 레이아웃
- **B안**: 수직형 카드 + 미리보기 이미지 확대

#### 성공 지표
- 설문조사 클릭률 (CTR)
- 설문조사 완료율
- 페이지 체류 시간
- 스크롤 깊이

#### 테스트 설계
```javascript
// A안: 현재 수평형 레이아웃
<SurveyItem>
  <LazyImage src={item.imageUrl} width="80px" height="80px" />
  <SurveyContent>
    <strong>{item.country} > {item.category} > {item.title}</strong>
    <ProgressBar value={item.progress} />
    <ProgressText>{answered} / {total} ({percent}%)</ProgressText>
  </SurveyContent>
  <ContinueButton>이어서 진행하기</ContinueButton>
</SurveyItem>

// B안: 수직형 카드 레이아웃
<VerticalSurveyCard>
  <LargePreviewImage src={item.imageUrl} />
  <CardContent>
    <CategoryBadge>{item.category}</CategoryBadge>
    <SurveyTitle>{item.title}</SurveyTitle>
    <CountryTag>{item.country}</CountryTag>
    <ProgressSection>
      <CircularProgress value={percent} />
      <ProgressLabel>{percent}% 완료</ProgressLabel>
    </ProgressSection>
    <ActionButton variant={percent >= 100 ? "completed" : "continue"}>
      {percent >= 100 ? "결과 보기" : "시작하기"}
    </ActionButton>
  </CardContent>
</VerticalSurveyCard>
```

---

### 3. 메인 페이지 랭킹 섹션

#### 테스트 목표
사용자 참여 동기 부여 및 gamification 효과 증대

#### 가설
- **A안 (현재)**: 단순한 순위 목록
- **B안**: 인터랙티브 리더보드 + 개인 성과 하이라이트

#### 성공 지표
- 설문조사 참여율 증가
- 일일 활성 사용자 수
- 평균 세션 시간
- 리텐션 비율

#### 테스트 설계
```javascript
// A안: 현재 버전
<RankingList>
  {totalRanking.map((user) => (
    <RankingItem key={user.username}>
      <span className="rank">{getRankIndicator(user.rank)}</span>
      <span className="name">{user.username}</span>
      <span className="count">{user.responseCount}회</span>
    </RankingItem>
  ))}
</RankingList>

// B안: 개선된 리더보드
<InteractiveLeaderboard>
  <MyRankCard>
    <MyRankBadge>나의 순위: #{userRank}</MyRankBadge>
    <MyProgress>
      <ProgressToNextRank value={progressToNext} />
      <span>{nextRankGap}회 더 참여하면 순위 상승!</span>
    </MyProgress>
  </MyRankCard>

  <TopThreeShowcase>
    {topThree.map((user, index) => (
      <TopUserCard rank={index + 1}>
        <Crown className={getRankClass(index)} />
        <Avatar src={user.avatar} />
        <Username>{user.username}</Username>
        <Score>{user.responseCount}회</Score>
        <Achievement>{user.recentAchievement}</Achievement>
      </TopUserCard>
    ))}
  </TopThreeShowcase>

  <FullRankingToggle onClick={toggleFullRanking}>
    {showFullRanking ? "접기" : "전체 순위 보기"}
  </FullRankingToggle>
</InteractiveLeaderboard>
```

---

### 4. 설문조사 진행 중 인터페이스

#### 테스트 목표
설문조사 완료율 향상 및 중도 이탈률 감소

#### 가설
- **A안 (현재)**: 기본적인 진행 표시
- **B안**: 동적 피드백 + 진행률 시각화 강화

#### 성공 지표
- 설문조사 완료율
- 평균 완료 시간
- 중도 이탈률
- 사용자 만족도

#### 테스트 설계
```javascript
// A안: 현재 진행률 바
<ProgressBar value={progress} max={1} />
<ProgressText>{answered} / {total} ({percent}%)</ProgressText>

// B안: 향상된 진행 인터페이스
<EnhancedProgressSection>
  <AnimatedProgressBar>
    <ProgressFill
      width={`${percent}%`}
      animate={true}
    />
    <ProgressMilestones>
      {milestones.map(milestone => (
        <Milestone
          key={milestone.id}
          completed={answered >= milestone.count}
          icon={milestone.icon}
        />
      ))}
    </ProgressMilestones>
  </AnimatedProgressBar>

  <ProgressFeedback>
    <CompletionMessage>
      {getMotivationalMessage(percent)}
    </CompletionMessage>
    <EstimatedTime>
      예상 남은 시간: {estimatedTimeRemaining}분
    </EstimatedTime>
  </ProgressFeedback>

  <QuickActions>
    <SaveProgressButton>진행상황 저장</SaveProgressButton>
    <SkipButton disabled={!canSkip}>건너뛰기</SkipButton>
  </QuickActions>
</EnhancedProgressSection>
```

---

### 5. 차트 페이지 필터링 시스템

#### 테스트 목표
데이터 검색 효율성 및 사용자 만족도 향상

#### 가설
- **A안 (현재)**: 텍스트 검색 + 카테고리 필터
- **B안**: 스마트 필터 + 자동완성 + 태그 시스템

#### 성공 지표
- 검색 사용률
- 필터 적용률
- 원하는 데이터 찾기까지의 시간
- 페이지 체류 시간

#### 테스트 설계
```javascript
// A안: 현재 검색 시스템
<SearchInput
  type="text"
  placeholder="검색어를 입력하세요..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

// B안: 스마트 검색 시스템
<SmartSearchContainer>
  <AutocompleteSearch
    placeholder="설문조사, 카테고리, 국가명으로 검색..."
    value={searchQuery}
    onChange={setSearchQuery}
    suggestions={searchSuggestions}
    onSuggestionSelect={handleSuggestionSelect}
    showRecent={true}
    maxSuggestions={8}
  />

  <FilterTags>
    <CategoryFilter
      options={availableCategories}
      selected={selectedCategories}
      onChange={setSelectedCategories}
    />
    <CountryFilter
      options={availableCountries}
      selected={selectedCountries}
      onChange={setSelectedCountries}
    />
    <ProgressFilter
      options={['미시작', '진행중', '완료']}
      selected={progressFilter}
      onChange={setProgressFilter}
    />
  </FilterTags>

  <ActiveFilters>
    {activeFilters.map(filter => (
      <FilterChip
        key={filter.id}
        label={filter.label}
        onRemove={() => removeFilter(filter.id)}
      />
    ))}
    {activeFilters.length > 0 && (
      <ClearAllButton onClick={clearAllFilters}>
        모든 필터 지우기
      </ClearAllButton>
    )}
  </ActiveFilters>
</SmartSearchContainer>
```

---

### 6. 모바일 반응형 네비게이션

#### 테스트 목표
모바일 사용자 경험 개선 및 네비게이션 효율성 증대

#### 가설
- **A안 (현재)**: 햄버거 메뉴
- **B안**: 하단 탭 네비게이션 + 제스처 기반 이동

#### 성공 지표
- 모바일 페이지 전환률
- 평균 세션 시간 (모바일)
- 네비게이션 사용률
- 사용자 만족도 점수

#### 테스트 설계
```javascript
// A안: 현재 햄버거 메뉴 (데스크톱 중심)
<MobileHeader>
  <HamburgerButton onClick={toggleMenu}>☰</HamburgerButton>
  <Logo />
  <SlideoutMenu isOpen={menuOpen}>
    <MenuItem to="/mainpage">홈</MenuItem>
    <MenuItem to="/survey">설문조사</MenuItem>
    <MenuItem to="/chart">차트</MenuItem>
    <MenuItem to="/mypage">마이페이지</MenuItem>
  </SlideoutMenu>
</MobileHeader>

// B안: 하단 탭 네비게이션
<MobileLayout>
  <MainContent>
    {/* 페이지 컨텐츠 */}
  </MainContent>

  <BottomNavigation>
    <NavTab
      to="/mainpage"
      icon="🏠"
      label="홈"
      active={currentPath === '/mainpage'}
    />
    <NavTab
      to="/survey"
      icon="📝"
      label="설문조사"
      badge={ongoingSurveyCount}
      active={currentPath === '/survey'}
    />
    <NavTab
      to="/chart"
      icon="📊"
      label="차트"
      active={currentPath === '/chart'}
    />
    <NavTab
      to="/mypage"
      icon="👤"
      label="마이페이지"
      active={currentPath === '/mypage'}
    />
  </BottomNavigation>

  <SwipeGestureHandler
    onSwipeLeft={navigateToNext}
    onSwipeRight={navigateToPrevious}
  />
</MobileLayout>
```

---

### 7. 설문조사 완료 시 리워드 시스템

#### 테스트 목표
사용자 재참여율 증대 및 완료율 향상

#### 가설
- **A안 (현재)**: 단순 완료 메시지
- **B안**: 게임화된 리워드 + 공유 기능

#### 성공 지표
- 설문조사 완료율
- 재참여율
- 소셜 공유율
- 사용자 리텐션

#### 테스트 설계
```javascript
// A안: 현재 완료 처리
const handleSurveyComplete = () => {
  alert("설문조사가 완료되었습니다!");
  navigate("/survey");
};

// B안: 게임화된 완료 경험
<CompletionCelebration>
  <AnimatedBadge>🎉 완료!</AnimatedBadge>

  <RewardSection>
    <XpGained>+{earnedXp} XP 획득!</XpGained>
    <BadgeEarned src={earnedBadge} alt="새로운 배지" />
    <RankProgress>
      다음 등급까지 {xpToNextRank}XP
      <ProgressBar value={rankProgress} />
    </RankProgress>
  </RewardSection>

  <AchievementUnlocked show={hasNewAchievement}>
    <AchievementBadge>{newAchievement}</AchievementBadge>
    <AchievementTitle>새로운 업적 달성!</AchievementTitle>
  </AchievementUnlocked>

  <SocialShare>
    <ShareMessage>
      "{surveyTitle}" 설문조사를 완료했어요! 🎯
    </ShareMessage>
    <ShareButtons>
      <TwitterShare onClick={shareToTwitter}>Twitter</TwitterShare>
      <FacebookShare onClick={shareToFacebook}>Facebook</FacebookShare>
      <KakaoShare onClick={shareToKakao}>카카오톡</KakaoShare>
    </ShareButtons>
  </SocialShare>

  <NextActions>
    <RecommendedSurvey>
      <h4>이런 설문조사는 어때요?</h4>
      <SurveyCard {...recommendedSurvey} />
    </RecommendedSurvey>
    <ContinueButton onClick={() => navigate("/survey")}>
      더 많은 설문조사 보기
    </ContinueButton>
  </NextActions>
</CompletionCelebration>
```

---

## 테스트 구현 가이드

### 1. Feature Flag 시스템 구축

```javascript
// utils/featureFlags.js
export const FeatureFlags = {
  ENHANCED_LOGIN: 'enhanced_login',
  VERTICAL_SURVEY_CARDS: 'vertical_survey_cards',
  INTERACTIVE_LEADERBOARD: 'interactive_leaderboard',
  ENHANCED_PROGRESS: 'enhanced_progress',
  SMART_SEARCH: 'smart_search',
  BOTTOM_NAVIGATION: 'bottom_navigation',
  GAMIFIED_COMPLETION: 'gamified_completion'
};

export const isFeatureEnabled = (flagName, userId) => {
  // A/B 테스트 로직: 사용자 ID 기반 분할
  const hash = userId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  return Math.abs(hash) % 100 < 50; // 50% 트래픽
};

// 사용 예시
const SurveyComponent = () => {
  const userId = localStorage.getItem('user_id');
  const useVerticalCards = isFeatureEnabled(
    FeatureFlags.VERTICAL_SURVEY_CARDS,
    userId
  );

  return useVerticalCards ? <VerticalSurveyCard /> : <HorizontalSurveyCard />;
};
```

### 2. 분석 이벤트 추적

```javascript
// utils/analytics.js
export const trackEvent = (eventName, properties, variant = null) => {
  // Google Analytics 4
  gtag('event', eventName, {
    ...properties,
    ab_variant: variant,
    user_id: localStorage.getItem('user_id'),
    timestamp: new Date().toISOString()
  });

  // 추가 분석 도구 (Mixpanel, Amplitude 등)
  if (window.mixpanel) {
    window.mixpanel.track(eventName, {
      ...properties,
      ab_variant: variant
    });
  }
};

// 사용 예시
const handleSurveyClick = (surveyId) => {
  const variant = isFeatureEnabled(FeatureFlags.VERTICAL_SURVEY_CARDS, userId)
    ? 'vertical_cards' : 'horizontal_cards';

  trackEvent('survey_card_click', {
    survey_id: surveyId,
    card_position: index,
    user_type: userType
  }, variant);

  navigate(`/survey/${surveyId}`);
};
```

### 3. 통계적 유의성 검증

```javascript
// utils/statistics.js
export const calculateStatistics = (controlData, variantData) => {
  const controlRate = controlData.successes / controlData.samples;
  const variantRate = variantData.successes / variantData.samples;

  // Z-test for proportions
  const pooledRate = (controlData.successes + variantData.successes) /
                     (controlData.samples + variantData.samples);

  const standardError = Math.sqrt(
    pooledRate * (1 - pooledRate) *
    (1/controlData.samples + 1/variantData.samples)
  );

  const zScore = (variantRate - controlRate) / standardError;
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));

  return {
    controlRate,
    variantRate,
    lift: ((variantRate - controlRate) / controlRate) * 100,
    pValue,
    significantAtP05: pValue < 0.05,
    confidenceInterval: calculateConfidenceInterval(variantRate, controlRate, standardError)
  };
};
```

## 테스트 실행 계획

### Phase 1: 기본 인프라 구축 (1주)
- Feature Flag 시스템 구현
- 분석 이벤트 설정
- A/B 테스트 대시보드 구축

### Phase 2: 우선순위 테스트 실행 (2-3주)
1. 로그인 페이지 최적화
2. 설문조사 카드 디자인
3. 메인 페이지 랭킹 섹션

### Phase 3: 사용자 경험 개선 (3-4주)
4. 설문조사 진행 인터페이스
5. 차트 페이지 필터링
6. 모바일 네비게이션

### Phase 4: 참여 증대 기능 (2주)
7. 리워드 시스템 테스트

### 성공 기준
- 통계적 유의성: p-value < 0.05
- 최소 개선률: 5% 이상
- 최소 샘플 크기: 각 그룹당 1,000명 이상
- 테스트 기간: 최소 2주 (계절성 고려)

### 리스크 관리
- 성능 저하 방지를 위한 로딩 시간 모니터링
- 오류율 증가 시 즉시 롤백 계획
- 사용자 피드백 수집 채널 운영
- 정기적인 데이터 품질 검증

---

*본 문서는 사용자 경험 개선과 비즈니스 목표 달성을 위한 데이터 기반 의사결정을 지원하기 위해 작성되었습니다.*