import { Selector } from 'testcafe';

class AddProblemPage {
  constructor() {
    this.pageId = '#add-problem-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async addProblem(testController, title, category, description) {
    await this.isDisplayed(testController);
    await testController.typeText('#title-form', title);
    await testController.typeText('#category-form', category);
    await testController.typeText('#desc-form', description);
    await testController.click('#problem-form-submit');
  }
}

export const addProblemPage = new AddProblemPage();
