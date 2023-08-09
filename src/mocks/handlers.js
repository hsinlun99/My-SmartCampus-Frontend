import { graphql } from 'msw';

export const handlers = [
  
  graphql.query('GetTagInfo', (req, res, ctx) => {
    return res(
      ctx.data({
        tagInfo: {
            message: 'from msw!!',
            info: 'test infor!'
        }
      })
    )

  }),

]