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
  page.waitForLoadState();

  let selector= "[id='menu__login-link']";
  page.waitForSelector(selector);
  let elem = page.$(selector);
  elem.click();
  page.waitForNavigation();
  sleep(2);
  
  selector= "[name='login']";
  page.waitForSelector(selector);
  elem=page.$(selector)
  
  elem.type("user1@digitalemil.de");
  selector= "[id='submit']";
  elem=page.$(selector)
  elem.click();
  page.waitForSelector('[aria-label="Password"]');
 
  elem=page.$('[aria-label="Password"]')
  elem.type(__ENV.PASSWORD);
  page.waitForSelector('[aria-label="Sign In"]');
 
  elem=page.$('[aria-label="Sign In"]')
  elem.click();
  page.waitForNavigation();
  sleep(2);

  page.screenshot({ path:"signin.png" });
 
  page.close();
  browser.close();
}
