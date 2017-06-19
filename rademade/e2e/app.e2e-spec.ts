import { RademadePage } from './app.po';

describe('rademade App', () => {
  let page: RademadePage;

  beforeEach(() => {
    page = new RademadePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
