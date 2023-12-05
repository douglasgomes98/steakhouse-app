import { describe, expect, test } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuthentication } from './useAuthentication';

describe('useAuthentication', () => {
  test('should render hook correctly', () => {
    const { result } = renderHook(() => useAuthentication());

    expect(result.current.isAuthenticated).toBe(false);
  });

  test('should change isAuthenticated when call login', async () => {
    const { result } = renderHook(() => useAuthentication());

    result.current.actions.login();

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });
  });

  test('should change isAuthenticated when call logout', async () => {
    const { result } = renderHook(() => useAuthentication());

    result.current.actions.login();

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });

    result.current.actions.logout();

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});
