import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login', () => {
  test('valid user can log in', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('locked out user sees an error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });

  test('user tries to login without password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', '');
    await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
  });
  
  test('user tries to login without username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });
});