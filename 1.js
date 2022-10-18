import { chromium } from 'k6/x/browser';
import exec from 'k6/execution';

export default function () {
  const browser = chromium.launch({
    headless: true,
    slowMo: '500ms',
  });

  const context = browser.newContext();
  const page = context.newPage();
  page.goto('https://grafana.com/');
  page.screenshot({ path:"screenshot_"+(exec.vu.idInTest-1)+".png" });

  page.close();
  browser.close();
}
