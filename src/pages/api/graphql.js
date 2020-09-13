/**
 * Proxy to the PIM api to not reveal the access tokens
 * to the current logged in user
 */

export default async (req, res) => {
  const data = await fetch('https://pim.crystallize.com/graphql', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'X-Crystallize-Access-Token-Id': process.env.CRYSTALLIZE_ACCESS_TOKEN_ID,
      'X-Crystallize-Access-Token-Secret':
        process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET
    },
    body: req.body
  }).then((r) => r.json());

  res.json(data);
};
