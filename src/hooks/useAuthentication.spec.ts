import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useAuthentication } from './useAuthentication';

describe('useAuthentication', () => {
  test('should render hook correctly', () => {
    const { result } = renderHook(() => useAuthentication());

    expect(result.current.isAuthenticated).toBe(false);
  });

  test('should change isAuthenticated when call login', async () => {
    const { result } = renderHook(() => useAuthentication());

    act(() => {
      result.current.actions.login();
    });

    expect(result.current.isAuthenticated).toBe(true);
  });

  test('should change isAuthenticated when call logout', async () => {
    const { result } = renderHook(() => useAuthentication());

    act(() => {
      result.current.actions.login();
    });

    expect(result.current.isAuthenticated).toBe(true);

    act(() => {
      result.current.actions.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
  });
});
