import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userprofilePage } from './userprofile.page';
import { problemPage } from './problem.page';
import { adminProblemPage } from './adminproblem.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const adminCred = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test user profile page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoUserProfilePage(testController);
  await userprofilePage.isDisplayed(testController);
});

test('Test user problem page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoProblemPage(testController);
  await problemPage.isDisplayed(testController);
});

test('Test admin user profile page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCred.username, adminCred.password);
  await navBar.isLoggedIn(testController, adminCred.username);
  await navBar.gotoUserProfilePage(testController);
  await userprofilePage.isDisplayed(testController);
});

test('Test admin problem page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCred.username, adminCred.password);
  await navBar.isLoggedIn(testController, adminCred.username);
  await navBar.gotoAdminProblemPage(testController);
  await adminProblemPage.isDisplayed(testController);
});
