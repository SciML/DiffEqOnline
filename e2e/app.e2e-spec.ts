import { JuliaApiDemoPage } from './app.po';

describe('julia-api-demo App', function() {
  let page: JuliaApiDemoPage;

  beforeEach(() => {
    page = new JuliaApiDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
