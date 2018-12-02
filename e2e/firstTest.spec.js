describe('Navigation tests', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have a title a first screen', async () => {
    await expect(element(by.id('PageTitle'))).toHaveText('First Screen');
  });


  describe('when going to the next page ', () => {
    beforeEach(async () => {
      await element(by.id('GoNext')).tap();
    });

    it('should navigate to a second page', async () => {
      await expect(element(by.id('PageTitle'))).toHaveText('Second Screen');
    });


    describe('when going back', () => {
      beforeEach(async () => {
        await element(by.id('GoBack')).tap();
      });

      it('should navigate to a first screen', async () => {
        await expect(element(by.id('PageTitle'))).toHaveText('First Screen');
      });
    });
  });
});
