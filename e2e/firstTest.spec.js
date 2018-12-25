describe('Main page tests', () => {

  beforeEach(async () => {
    await device.reloadReactNative();
    await expect(element(by.id('MainPage'))).toBeVisible();
    await element(by.id('Tue')).tap();
    await element(by.id('AddTask')).tap();
    await element(by.id('CreateTask.TextInput')).typeText('New Task Text');
    await element(by.id('OnDone')).tap();
  });

  it('should create a new task', async () => {
    await expect(element(by.text('New Task Text'))).toBeVisible();
  });

  //These tests depend upon local time of the device
  //I don't know how to fix this. They would fail once per week
  it('should hide that task when switching to a different day', async () => {
    await element(by.id('Mon')).tap();
    await expect(element(by.text('New Task Text'))).toBeNotVisible();
    await element(by.id('Tue')).tap();
    await expect(element(by.text('New Task Text'))).toBeVisible();
  });

});

