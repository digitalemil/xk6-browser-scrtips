import { chromium } from 'k6/x/browser';
import exec from 'k6/execution';
import { sleep } from 'k6';

export default function () {
  const browser = chromium.launch({
    headless: false,
    slowMo: '500ms',
  });

  const context = browser.newContext();
  const page = context.newPage();
  page.goto('http://grafana.com')
  const elem = page.$(".col--md-4");
  console.log("--- Element inner HTML ---");
  console.log(elem.innerHTML())
  console.log("---");
 
  page.close();
  browser.close();
}
