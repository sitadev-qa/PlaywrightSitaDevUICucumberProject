class UserManagementPage {
  constructor(page) {
    this.page = page;
  }

  async openFromAdmin() {
    await this.page.getByRole('link', { name: 'Admin', exact: true }).click();
    await this.page.getByRole('heading', { name: 'Admin', exact: true }).waitFor();
    await this.page.getByRole('heading', { name: /User Management/ }).waitFor();
    await this.page.getByRole('button', { name: 'Search', exact: true }).waitFor();
  }

  async createEnabledAdministrator({ username, password }) {
    await this.page.getByRole('button', { name: /Add/ }).click();
    await this.page.getByRole('heading', { name: 'Add User', exact: true }).waitFor();

    await this.selectField('User Role', 'Admin');
    await this.page.getByPlaceholder('Type for hints...').fill('Peter');
    await this.page.getByRole('option', { name: 'Peter Mac Anderson', exact: true }).click();
    await this.selectField('Status', 'Enabled');

    await this.field('Username').locator('input').fill(username);
    const passwordFields = this.page.locator('input[type="password"]');
    await passwordFields.nth(0).fill(password);
    await passwordFields.nth(1).fill(password);
    await this.page.getByRole('button', { name: 'Save', exact: true }).click();
  }

  async expectUserListed(username) {
    await this.field('Username').locator('input').fill(username);
    await this.page.getByRole('button', { name: 'Search', exact: true }).click();
    await this.page.locator('.oxd-table-row').filter({ hasText: username }).waitFor();
  }

  field(label) {
    return this.page.locator('.oxd-input-group').filter({
      has: this.page.getByText(label, { exact: true })
    });
  }

  async selectField(label, value) {
    await this.field(label).locator('.oxd-select-text').click();
    await this.page.getByRole('option', { name: value, exact: true }).click();
  }
}

module.exports = UserManagementPage;
