import { ResumexFePage } from './app.po';

describe('resumex-fe App', () => {
  let page: ResumexFePage;

  beforeEach(() => {
    page = new ResumexFePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
