import { AbpZeroTemplatePage } from './app.po';

describe('abp-zero-template App', function() {
  let page: AbpZeroTemplatePage;

  beforeEach(() => {
    page = new AbpZeroTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
