const { chromium } = require('playwright');

async function runE2ETest() {
    console.log('🚀 Starting E2E Test for Street Tour Project');
    
    // 브라우저 실행
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000 // 1초 딜레이로 시각적 확인 가능
    });
    
    const context = await browser.newContext({
        permissions: ['geolocation', 'camera'],
        geolocation: { latitude: 37.5665, longitude: 126.9780 } // 서울 시청
    });
    
    const page = await context.newPage();
    
    try {
        console.log('📱 Navigating to localhost:3000');
        await page.goto('http://localhost:3000');
        await page.waitForTimeout(2000);
        
        // 페이지 제목 확인
        const title = await page.title();
        console.log('📄 Page Title:', title);
        
        // 스크린샷 캐처
        await page.screenshot({ path: 'test-results/01-homepage.png', fullPage: true });
        console.log('📸 Homepage screenshot saved');
        
        // 콘솔 에러 수집 시작
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
                console.log('❌ Console Error:', msg.text());
            }
        });
        
        // 네트워크 에러 수집
        const networkErrors = [];
        page.on('response', response => {
            if (response.status() >= 400) {
                networkErrors.push(`${response.status()} ${response.url()}`);
                console.log('🌐 Network Error:', response.status(), response.url());
            }
        });
        
        // 탭 네비게이션 테스트
        console.log('🔄 Testing tab navigation');
        
        // 탐험 탭 클릭
        await page.click('text=탐험');
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'test-results/02-exploration.png', fullPage: true });
        console.log('📸 Exploration tab screenshot saved');
        
        // 지도 기능 테스트
        console.log('🗺️ Testing map functionality');
        const mapElement = await page.$('.feature-display-box');
        if (mapElement) {
            console.log('✅ Map container found');
        } else {
            console.log('❌ Map container not found');
        }
        
        // QR 탭 클릭 테스트
        console.log('📱 Testing QR scanner tab');
        await page.click('text=QR');
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'test-results/03-qr-scanner.png', fullPage: true });
        console.log('📸 QR Scanner screenshot saved');
        
        // 보물 탭 테스트
        console.log('💎 Testing treasure tab');
        await page.click('text=보물');
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'test-results/04-treasure.png', fullPage: true });
        console.log('📸 Treasure tab screenshot saved');
        
        // 커뮤니티 탭 테스트
        console.log('👥 Testing community tab');
        await page.click('text=커뮤니티');
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'test-results/05-community.png', fullPage: true });
        console.log('📸 Community tab screenshot saved');
        
        // 다시 스토리 탭으로
        await page.click('text=스토리');
        await page.waitForTimeout(1000);
        
        // 결과 요약
        console.log('\n📊 Test Results Summary:');
        console.log('Console Errors:', consoleErrors.length);
        consoleErrors.forEach((error, index) => {
            console.log(`  ${index + 1}. ${error}`);
        });
        
        console.log('Network Errors:', networkErrors.length);
        networkErrors.forEach((error, index) => {
            console.log(`  ${index + 1}. ${error}`);
        });
        
        // 테스트 결과를 파일로 저장
        const testResults = {
            timestamp: new Date().toISOString(),
            pageTitle: title,
            consoleErrors: consoleErrors,
            networkErrors: networkErrors,
            testsCompleted: ['homepage', 'exploration', 'qr-scanner', 'treasure', 'community'],
            status: consoleErrors.length === 0 && networkErrors.length === 0 ? 'PASS' : 'FAIL'
        };
        
        require('fs').writeFileSync('test-results/test-report.json', JSON.stringify(testResults, null, 2));
        console.log('📝 Test report saved to test-results/test-report.json');
        
    } catch (error) {
        console.error('💥 Test failed:', error);
    } finally {
        await browser.close();
        console.log('🏁 E2E Test completed');
    }
}

// 테스트 실행
runE2ETest().catch(console.error);