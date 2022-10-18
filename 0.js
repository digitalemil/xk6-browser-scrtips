import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch({
    headless: true,
    slowMo: '500ms',
  });

  const context = browser.newContext();
  const page = context.newPage();
  page.goto('https://grafana.com');
  page.screenshot({ path: `screenshot.png` });

  page.close();
  browser.close();
}