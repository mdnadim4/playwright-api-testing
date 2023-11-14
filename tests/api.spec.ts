import { test, expect } from '@playwright/test';

const data = { "name": "morpheus", "job": "leader" }
const update = { "name": "morpheus", "job": "zion resident" }

test.describe('Verify API Testing', () => {

  test('Create a New User by API Request', async ({ request }) => {

    const postRes = await request.post('/api/users', { data })

    expect(postRes.ok()).toBeTruthy();
    expect(postRes.status()).toEqual(201)
    expect(postRes.statusText()).toEqual("Created")
    expect(postRes.json()).toEqual(data)

  });

  test('Get All Users by API Request', async ({ request }) => {

    const getRes = await request.get('/api/users?page=2')
    const body = getRes.json();

    expect(getRes.status).toEqual(200)
    expect(body).toContain(data)

  });

  test('Update an User list by API Request', async ({ request }) => {
    const updateRes = await request.patch('/api/users/2', { data: update })
    const body = await updateRes.json();

    expect(updateRes.status).toEqual(200)
    expect(body.name).toEqual('morpheus')
    expect(body.job).toEqual('zion resident')

  });

  test('Delete an User by API Request', async ({ request }) => {

    const deleteRes = await request.delete('/api/users/2')

    expect(deleteRes.status).toEqual(204)

  });

})

