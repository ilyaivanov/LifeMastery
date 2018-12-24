describe('Navigation tests', () => {

  beforeEach(async () => {
    await device.reloadReactNative();
    await expect(element(by.id('MainPage'))).toBeVisible();
    await element(by.id('AddTask')).tap();
    await element(by.id('CreateTask.TextInput')).typeText('New Task Text');
    await element(by.id('OnDone')).tap();
  });

  it('should create a new task', async () => {
    await expect(element(by.text('New Task Text'))).toBeVisible();
  });

  it('should create a new task', async () => {
    await element(by.id('Mon')).tap();
    await expect(element(by.text('Monday Task Description 1'))).toBeVisible();
    await element(by.id('Tue')).tap();
    await expect(element(by.text('New Task Text'))).toBeVisible();
  });

});

