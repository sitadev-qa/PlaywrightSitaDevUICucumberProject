class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    const baseUrl = process.env.ORANGEHRM_BASE_URL || 'https://opensource-demo.orangehrmlive.com';
    await this.page.goto(`${baseUrl.replace(/\/$/, '')}/web/index.php/auth/login`);
  }

  async login(username, password) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login', exact: true }).click();
  }

  async waitForDashboard() {
    await this.page.getByRole('heading', { name: 'Dashboard', exact: true }).waitFor();
  }
}

module.exports = LoginPage;
