const errors = require('../../src/middlewares/errors');

class ForbiddenError extends Error {
  constructor(...args) {
    super(...args);
    this.status = 403;
  }
}

describe('Error middleware', () => {
  it('Show error 500 by default', async () => {
    const ctx = {};
    const next = jest.fn(() => {
      throw new Error('Oops');
    });

    await errors()(ctx, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(ctx.status).toEqual(500);
    expect(ctx.body).toEqual({ message: 'Oops' });
  });

  it('Show custom error', async () => {
    const ctx = {
      status: null,
    };
    const next = jest.fn(() => {
      throw new ForbiddenError('Forbidden');
    });

    await errors()(ctx, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(ctx.status).toEqual(403);
    expect(ctx.body).toEqual({ message: 'Forbidden' });
  });
});
