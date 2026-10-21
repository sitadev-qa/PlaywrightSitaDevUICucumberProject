const { Given, Then, When } = require('@cucumber/cucumber');
const LoginPage = require('../pages/LoginPage');
const UserManagementPage = require('../pages/UserManagementPage');

Given('I am logged in as the administrator', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.open();
  await loginPage.login(
    process.env.ORANGEHRM_USERNAME || 'Admin',
    process.env.ORANGEHRM_PASSWORD || 'admin123'
  );
  await loginPage.waitForDashboard();
});

When('I navigate to Admin and open User Management', async function () {
  this.userManagementPage = new UserManagementPage(this.page);
  await this.userManagementPage.openFromAdmin();
});

When('I create a new enabled administrator user', async function () {
  this.createdUsername = `qa_user_${Date.now()}`;
  const password = process.env.NEW_USER_PASSWORD || 'OrangeHrmTest@2026';
  await this.userManagementPage.createEnabledAdministrator({
    username: this.createdUsername,
    password
  });
});

Then('the new user should appear in User Management', async function () {
  await this.userManagementPage.expectUserListed(this.createdUsername);
});
