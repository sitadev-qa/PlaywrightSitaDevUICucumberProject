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

  async openNationalitiesFromAdmin() {
    await this.page.getByRole('link', { name: 'Admin', exact: true }).click();
    await this.page.getByRole('heading', { name: 'Admin', exact: true }).waitFor();
    await this.page.getByRole('link', { name: 'Nationalities' }).click();
    await this.page.getByRole('heading', { name: 'Nationalities', exact: true }).waitFor();
  } 

  async expectUserListed(username) {
    await this.field('Username').locator('input').fill(username);
    await this.page.getByRole('button', { name: 'Search', exact: true }).click();
    await this.page.locator('.oxd-table-row').filter({ hasText: username }).waitFor();
  }

  async createNationality(nationality) {
    await this.page.getByRole('button', { name: /Add/ }).click();
    await this.page.getByRole('heading', { name: 'Add Nationality', exact: true }).waitFor();
    await this.field('Name').locator('input').fill(nationality);
    await this.page.getByRole('button', { name: 'Save', exact: true }).click();
  }

  async expectNationalityListed(nationality) {
    const nationalityRow = this.page.locator('.oxd-table-row').filter({ hasText: nationality });
    await this.page.locator('.oxd-table-row').nth(1).waitFor();

    const pageCount = await this.page.locator('.oxd-pagination-page-item--page').count();
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
      const selectedPage = this.page.locator('.oxd-pagination-page-item--page-selected');
      if (await selectedPage.innerText() !== String(pageNumber)) {
        const firstRowText = await this.page.locator('.oxd-table-row').nth(1).innerText();
        await this.page.getByRole('button', { name: String(pageNumber), exact: true }).click();
        await this.page.waitForFunction(({ number, previousFirstRow }) => {
          const selected = document.querySelector('.oxd-pagination-page-item--page-selected');
          const rows = document.querySelectorAll('.oxd-table-row');
          return selected?.textContent.trim() === String(number)
            && rows.length > 1
            && rows[1].textContent.trim() !== previousFirstRow;
        }, { number: pageNumber, previousFirstRow: firstRowText });
      }

      if (await nationalityRow.count()) {
        await nationalityRow.waitFor();
        return;
      }
    }

    throw new Error(`Nationality "${nationality}" was not found in the Nationalities list`);
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
