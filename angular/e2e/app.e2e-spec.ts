import { AbpProjectNameTemplatePage } from './app.po';

describe('AbpProjectName App', function() {
  let page: AbpProjectNameTemplatePage;

  beforeEach(() => {
    page = new AbpProjectNameTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
