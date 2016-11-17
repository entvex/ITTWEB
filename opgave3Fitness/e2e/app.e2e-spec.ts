import { Opgave3FitnessPage } from './app.po';

describe('opgave3-fitness App', function() {
  let page: Opgave3FitnessPage;

  beforeEach(() => {
    page = new Opgave3FitnessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
