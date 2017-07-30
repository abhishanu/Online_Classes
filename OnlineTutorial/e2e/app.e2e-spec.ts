import { OnlineTutorialPage } from './app.po';

describe('online-tutorial App', () => {
  let page: OnlineTutorialPage;

  beforeEach(() => {
    page = new OnlineTutorialPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
